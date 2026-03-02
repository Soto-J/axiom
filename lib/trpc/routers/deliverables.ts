import { z } from "zod";
import { eq, asc } from "drizzle-orm";

import {
  createTRPCRouter,
  baseProcedure,
  protectedProcedure,
} from "@/lib/trpc/init";
import { db } from "@/lib/db";
import { deliverableTable } from "@/lib/db/schema";

export const deliverablesRouter = createTRPCRouter({
  // Fetch all uploads for a given site code, ordered by checklist position
  getBySiteCode: baseProcedure
    .input(z.object({ siteCode: z.string().min(1) }))
    .query(({ input }) =>
      db
        .select()
        .from(deliverableTable)
        .where(eq(deliverableTable.siteId, input.siteCode))
        .orderBy(asc(deliverableTable.checklistIndex)),
    ),

  // Fetch all deliverables (manager review page) — optionally filter by status
  getAll: protectedProcedure
    .input(
      z.object({
        status: z.enum(["pending", "approved", "rejected"]).optional(),
      }),
    )
    .query(({ input }) =>
      db
        .select()
        .from(deliverableTable)
        .where(
          input.status ? eq(deliverableTable.status, input.status) : undefined,
        )
        .orderBy(asc(deliverableTable.createdAt)),
    ),

  // Approve or reject a deliverable upload
  review: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.enum(["approved", "rejected"]),
      }),
    )
    .mutation(({ input }) =>
      db
        .update(deliverableTable)
        .set({ status: input.status })
        .where(eq(deliverableTable.id, input.id))
        .returning(),
    ),
});
