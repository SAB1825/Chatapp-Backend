import "dotenv/config";

import { CreatEnv, z } from "@chatapp/shared";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  GATEWAY_SERVICE_PORT: z.coerce
    .number()
    .int()
    .min(0)
    .max(65_535)
    .default(4000),
  AUTH_SERVICE_URL: z.url(),
  INTERNAL_API_TOKEN: z.string(),
});

type EnvType = z.infer<typeof envSchema>;

export const env: EnvType = CreatEnv(envSchema, {
  serviceName: "gateway-service",
});

export type Env = typeof env;
