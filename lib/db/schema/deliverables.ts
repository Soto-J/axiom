import { pgTable, text, integer, index } from "drizzle-orm/pg-core";
import { timestamps } from "./helpers";

export const deliverableTable = pgTable(
  "deliverables",
  {
    id: text("id").primaryKey(),
    siteId: text("site_id").notNull(),

    // Which of the 18 DELIVERABLES checklist items this photo covers (0-based index)
    checklistIndex: integer("checklist_index").notNull(),

    // Supabase Storage pointer (don’t store signed URLs)
    bucket: text("bucket").notNull().default("images"),
    path: text("path").notNull(),

    // File metadata
    fileName: text("file_name").notNull(), // original upload name
    mimeType: text("mime_type").notNull(), // "image/jpeg", "image/png"
    size: integer("size").notNull(), // bytes — useful for quotas

    // Review workflow
    status: text("status").notNull().default("pending"), // pending | approved | rejected

    // Site code of the submitting tech (no user auth for techs)
    uploadedBy: text("uploaded_by").notNull(),
    ...timestamps,
  },
  (t) => [
    index("deliverables_site_id_idx").on(t.siteId),
    index("deliverables_uploaded_by_idx").on(t.uploadedBy),
    index("deliverables_checklist_index_idx").on(t.checklistIndex),
  ],
);
