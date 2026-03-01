import { createTRPCRouter } from "@/lib/trpc/init";

import { getOneProcedure } from "./get-one";
import { getManyProcedure } from "./get-many";
import { deleteProcedure } from "./delete";

export const membersRouter = createTRPCRouter({
  getOne: getOneProcedure,
  getMany: getManyProcedure,
  delete: deleteProcedure,
});
