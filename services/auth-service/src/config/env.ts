import "dotenv/config";

import { CreatEnv, z } from "@chatapp/shared";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  AUTH_SERVICE_PORT: z.coerce.number().int().min(0).max(65_535).default(4000),
  AUTH_DB_URL: z.url(),
  // AUTH_DB_SSL: z.boolean(),
});

type EnvType = z.infer<typeof envSchema>;

export const env: EnvType = CreatEnv(envSchema, {
  serviceName: "auth-service",
});

export type Env = typeof env;
