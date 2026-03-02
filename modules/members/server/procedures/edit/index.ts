import { protectedProcedure } from "@/lib/trpc/init";

import { db } from "@/lib/db";
import { user as userTable } from "@/lib/db/schema";

import { editUserInputSchema } from "./types/schema";

export const editProcedure = protectedProcedure
  .input(editUserInputSchema)
  .query(({ ctx, input }) => {
    // TODO
    return;
  });
