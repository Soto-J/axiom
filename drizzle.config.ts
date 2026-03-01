import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import env from "./lib/env";

export default defineConfig({
  out: "./drizzle",
  schema: "./lib/db/schema",
  dialect: "postgresql",
  dbCredentials: {
    url: env.SUPABASE_DATABASE_URL,
  },
  tablesFilter: ["!_*"],
  schemaFilter: ["public"],
});
