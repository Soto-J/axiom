import { pgTable, text, integer, index, timestamp } from "drizzle-orm/pg-core";
import { timestamps } from "./helpers";
import { varchar } from "drizzle-orm/mysql-core";

export const siteTable = pgTable("site", {
  id: text("id").primaryKey(),

  techName: text("tech_name").notNull(),
  helperTechName: text("helper_tech_name"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});
