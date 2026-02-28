import { protectedProcedure } from "@/lib/trpc/init";

export const getManyProcedure = protectedProcedure.query(({ ctx, input }) => {
  // TODO
  return;
});
