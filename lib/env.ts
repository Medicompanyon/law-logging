import { z } from "zod";

const serverEnvSchema = z.object({
  DATABASE_URL: z.string().url().startsWith("postgresql://"),
  DATABASE_SSL: z.enum(["true", "false"]).default("false"),
  APP_URL: z.string().url(),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

export function parseServerEnv(input: NodeJS.ProcessEnv): ServerEnv {
  const result = serverEnvSchema.safeParse(input);
  if (!result.success) {
    const names = result.error.issues
      .map((issue) => issue.path.join("."))
      .filter(Boolean)
      .join(", ");
    throw new Error(`Invalid server environment variables: ${names}`);
  }
  return result.data;
}

export function getServerEnv(): ServerEnv {
  return parseServerEnv(process.env);
}
