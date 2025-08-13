import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import users from "./user.model";

const urls = pgTable("urls", {
  id: uuid("id").primaryKey().defaultRandom(),
  destinationUrl: text("destination_url").notNull(),
  shortUrl: text("short_url").notNull(),
  comments: text("comments"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  userId: uuid("user_id").references(() => users.id),
});

export default urls;
