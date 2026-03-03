import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import * as dbSchema from "@/lib/db";

import env from "@/lib/env";

export const auth = betterAuth({
  database: drizzleAdapter(dbSchema, {
    provider: "pg",
    schema: { ...dbSchema },
  }),

  socialProviders: {
    // Need permission from axiom
    microsoft: {
      clientId: env.MICROSOFT_CLIENT_ID,
      clientSecret: env.MICROSOFT_CLIENT_SECRET,
      tenantId: "common",
      authority: "https://login.microsoftonline.com", // Authentication authority URL
      prompt: "select_account", // Forces account selection
    },
  },
});
