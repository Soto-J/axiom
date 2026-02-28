import { protectedProcedure } from "@/lib/trpc/init";

export const getOneProcedure = protectedProcedure.query(({ ctx, input }) => {
  // TODO
  return;
});
