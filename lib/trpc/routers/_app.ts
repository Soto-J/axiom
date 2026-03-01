import { membersRouter } from "@/modules/members/server/procedures";
import { createTRPCRouter } from "../init";

export const appRouter = createTRPCRouter({
  membersRouter,
});

export type AppRouter = typeof appRouter;
