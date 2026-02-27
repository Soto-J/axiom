import "dotenv/config";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import env from "@/lib/env";

const connectionString = env.SUPABASE_DATABASE_URL;
if (!connectionString) throw new Error("Missing SUPABASE_DATABASE_URL");

export const client = postgres(connectionString, {
  prepare: false,
});

export const db = drizzle(client);
