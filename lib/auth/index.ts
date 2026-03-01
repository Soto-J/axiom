import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import * as dbSchema from "@/lib/db";

export const auth = betterAuth({
  database: drizzleAdapter(dbSchema, {
    provider: "pg",
    schema: { ...dbSchema },
  }),
  emailAndPassword: {
    enabled: true,
  },
});
