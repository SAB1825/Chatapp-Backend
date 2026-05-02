import { createServer } from "http";
import { CreateApp } from "./app";
import { env } from "@/config/env";
import { logger } from "@/utils/logger";

const main = async () => {
  try {
    const app = CreateApp();
    const server = createServer(app);

    const port = env.GATEWAY_SERVICE_PORT;

    server.listen(port, () => {
      logger.info({ port }, "Gateway-Service is running");
    });

    const shutdown = () => {
      logger.info("Gateway-Service is shutting down");

      Promise.all([])
        .catch((error: unknown) => {
          logger.error({ error }, "Error during shutdown Gateway-Service");
        })
        .finally(() => {
          server.close(() => process.exit(0));
        });
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (error) {
    logger.error({ error }, "Failed to start Gateway-Service");
    process.exit(1);
  }
};

main();
