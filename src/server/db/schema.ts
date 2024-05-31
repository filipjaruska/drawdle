// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `drawdle_${name}`);

export const images = createTable(
  "image",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    url: varchar("url", { length: 1024 }).notNull(),

    userId: varchar("userId", { length: 256 }).notNull(),

    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);
export const submissions = createTable(
  "submission",
  {
    id: serial("id").primaryKey(),
    description: varchar("url", { length: 1024 }),

    userId: varchar("userId", { length: 256 }).notNull(),
    userName: varchar("userName", { length: 256 }).notNull(),
    imageId: varchar("imageId", { length: 256 }).notNull(),

    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (submission) => ({
    userIdIndex: index("user_id_idx").on(submission.userId),
    imageIdIndex: index("image_id_idx").on(submission.imageId),
  }),
);
export const draweek = createTable("draweek", {
  id: serial("id").primaryKey(),
  topic: varchar("topic", { length: 256 }).notNull(),
  submissionIds: varchar("submissionIds", { length: 256 }).array(),

  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }),
});
