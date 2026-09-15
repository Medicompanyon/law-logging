import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as schema from "@/lib/db/schema";
import { getServerEnv } from "@/lib/env";

const globalForDatabase = globalThis as unknown as { databasePool?: Pool };

function createPool(): Pool {
  const env = getServerEnv();
  return new Pool({
    connectionString: env.DATABASE_URL,
    max: 10,
    ssl: env.DATABASE_SSL === "true" ? { rejectUnauthorized: true } : false,
  });
}

export const databasePool = globalForDatabase.databasePool ?? createPool();

if (process.env.NODE_ENV !== "production") {
  globalForDatabase.databasePool = databasePool;
}

export const db = drizzle(databasePool, { schema });
