import { pgTable, text, integer, index } from "drizzle-orm/pg-core";
import { timestamps } from "./helpers";

export const deliverableTable = pgTable(
  "deliverables",
  {
    id: text("id").primaryKey(),
    siteId: text("site_id").notNull(),

    // Supabase Storage pointer (don’t store signed URLs)
    bucket: text("bucket").notNull().default("deliverables"),
    path: text("path").notNull(),

    // File metadata
    fileName: text("file_name").notNull(), // original upload name
    mimeType: text("mime_type").notNull(), // "image/jpeg", "image/png"
    size: integer("size").notNull(), // bytes — useful for quotas

    // Review workflow (optional — add if managers approve/reject photos)
    status: text("status").notNull().default("pending"), // pending | approved | rejected

    // Who submitted it
    uploadedBy: text("uploaded_by").notNull(), // userId of the tech
    ...timestamps,
  },
  (t) => [
    index("deliverables_site_id_idx").on(t.siteId),
    index("deliverables_uploaded_by_idx").on(t.uploadedBy),
  ],
);
