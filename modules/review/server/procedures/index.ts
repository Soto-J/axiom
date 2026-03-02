import { createTRPCRouter } from "@/lib/trpc/init";

import { getBySiteIdProcedure } from "./get-by-site-id";

export const reviewRouter = createTRPCRouter({
  getBySite: getBySiteIdProcedure,
});
