import { protectedProcedure } from "@/lib/trpc/init";
import { z } from "zod";

export const getBySiteIdProcedure = protectedProcedure
  .input(z.object({ siteId: z.string() }))
  .query(async ({ ctx, input }) => {
    return;
  });
