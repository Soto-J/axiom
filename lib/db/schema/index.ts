export * from "./auth";

import { pgTable, text } from "drizzle-orm/pg-core";

export const deliverablesTable = pgTable("deliverables", {
  id: text("id").primaryKey(),
});
