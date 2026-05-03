import { createServer } from "http";
import { CreateApp } from "./app";
import { env } from "@/config/env";
import { logger } from "./utils/logger";
import { closeDb, connectToDB } from "@/db/sequelize";
import { initModels } from "./models";
import { closePublisher, initPublisher } from "@/messaging/event-publishing";

const main = async () => {
  try {
    await connectToDB();
    await initModels();
    await initPublisher();

    const app = CreateApp();
    const server = createServer(app);

    const port = env.AUTH_SERVICE_PORT;

    server.listen(port, () => {
      logger.info({ port }, "Auth-Service is running");
    });

    const shutdown = () => {
      logger.info("Auth-Service is shutting down");

      Promise.all([closeDb(), closePublisher()])
        .catch((error: unknown) => {
          logger.error({ error }, "Error during shutdown Auth-Service");
        })
        .finally(() => {
          server.close(() => process.exit(0));
        });
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (error) {
    logger.error({ error }, "Failed to start Auth-Service");
    process.exit(1);
  }
};

main();
