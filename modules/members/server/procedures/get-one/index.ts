import { protectedProcedure } from "@/lib/trpc/init";
import { GetOneInputSchema } from "./types/schema";

export const getOneProcedure = protectedProcedure
  .input(GetOneInputSchema)
  .query(({ ctx, input }) => {
    // TODO
    return;
  });
