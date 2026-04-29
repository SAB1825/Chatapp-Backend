import "dotenv/config";

import { CreatEnv, z } from "@chatapp/shared";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  AUTH_SERVICE_PORT: z.coerce.number().int().min(0).max(65_535).default(4000),
  AUTH_DB_URL: z.url(),
  JWT_SECRET: z.string().min(10),
  JWT_EXPIRES_IN: z.string().default("1d"),
  JWT_REFRESH_SECRET: z.string().min(32),
  JWT_REFRESH_EXPIRES_IN: z.string().default("30d"),
});

type EnvType = z.infer<typeof envSchema>;

export const env: EnvType = CreatEnv(envSchema, {
  serviceName: "auth-service",
});

export type Env = typeof env;
