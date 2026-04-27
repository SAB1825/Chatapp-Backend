import { CreateLogger } from "@chatapp/shared"
import type { Logger } from "@chatapp/shared"

export const logger: Logger = CreateLogger({ name : "auth-service"})