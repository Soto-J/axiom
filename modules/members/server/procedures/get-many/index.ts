import { protectedProcedure } from "@/lib/trpc/init";

import { db } from "@/lib/db";
import { user as userTable } from "@/lib/db/schema";

export const getManyProcedure = protectedProcedure.query(async () => {
  return await db.select().from(userTable);
});
