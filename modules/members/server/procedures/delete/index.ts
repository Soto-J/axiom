import { protectedProcedure } from "@/lib/trpc/init";

export const deleteProcedure = protectedProcedure.query(({ ctx, input }) => {
  // TODO
  return;
});
