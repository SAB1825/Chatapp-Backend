import { createServer } from "http"
import { CreateApp } from "./app"
import { env } from "@/config/env"
import { logger } from "./utils/logger"

const main = async () => {
    try {
        const app = CreateApp()
        const server = createServer(app)

        const port = env.AUTH_SERVICE_PORT

        server.listen(port, () => {
            logger.info({ port }, "Auth-Service is running")
        })
    } catch (error) {
        logger.error({error}, "Failed to start Auth-Service")
        process.exit(1)
    }
}

main()