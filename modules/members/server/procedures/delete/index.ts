import { protectedProcedure } from "@/lib/trpc/init";

import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { user as userTable } from "@/lib/db/schema";

import { deleteUserInputSchema } from "./types/schema";

export const deleteProcedure = protectedProcedure
  .input(deleteUserInputSchema)
  .query(async ({ ctx, input }) => {
    return await db.delete(userTable).where(eq(userTable.id, input.userId));
  });
