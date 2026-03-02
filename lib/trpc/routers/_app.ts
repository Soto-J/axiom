import { createTRPCRouter } from "@/lib/trpc/init";

import { deliverablesRouter } from "./deliverables";
import { membersRouter } from "@/modules/members/server/procedures";
import { reviewRouter } from "@/modules/review/server/procedures";
import { homeRouter } from "@/modules/home/server/procedures";

export const appRouter = createTRPCRouter({
  deliverables: deliverablesRouter,
  members: membersRouter,
  review: reviewRouter,
  home: homeRouter,
});

export type AppRouter = typeof appRouter;
