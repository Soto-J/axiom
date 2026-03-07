import { timestamps } from "./helpers";

import {
  pgTable,
  text,
  integer,
  timestamp,
  pgEnum,
  boolean,
} from "drizzle-orm/pg-core";

export const siteTypeEnum = pgEnum("site_type", ["McDonalds", "Burger King"]);
export const rackSizeTypeEnum = pgEnum("rack_size", ["77", "82"]);

export const siteTable = pgTable("site", {
  id: text("id").primaryKey().notNull(),

  installDateTime: timestamp("install_date_time").notNull(),
  siteType: siteTypeEnum("site_type").notNull(),
  sitePhoneNumber: text("site_phone_number").notNull(),
  siteStreet: text("site_street").notNull(),
  siteZipCode: text("site_zip_code").notNull(),

  siteNotes: text("site_notes"),
  rackSize: rackSizeTypeEnum("rack_size").default("77"),

  techName: text("tech_name").notNull(),
  techPhoneNumber: text("tech_phone_number").notNull(),
  helperTechName: text("helper_tech_name"),
  helperTechPhoneNumber: text("helper_tech_phone_number"),

  techArrivedAt: timestamp("tech_arrived_at"),
  techDepartedAt: timestamp("tech_departed_at"),
  closeoutCode: integer("closeout_code"),
  completed: boolean("completed").default(false),

  abortReason: text("abort_reason"),
  ...timestamps,
});
