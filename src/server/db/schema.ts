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

    userId: varchar("user_id", { length: 256 }).notNull(),

    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }),
  },
  (image) => ({
    nameIndex: index("drawdle_image_name_idx").on(image.name),
    userIdIndex: index("drawdle_image_user_id_idx").on(image.userId),
  }),
);

export const submissions = createTable(
  "submission",
  {
    id: serial("id").primaryKey(),
    description: varchar("description", { length: 1024 }),

    userId: varchar("user_id", { length: 256 }).notNull(),
    userName: varchar("user_name", { length: 256 }).notNull(),
    imageId: varchar("image_id", { length: 256 }).notNull(),
    imageUrl: varchar("image_url", { length: 1024 }).notNull(),
    draweekId: varchar("draweek_id", { length: 256 }).notNull(),

    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (submission) => ({
    userIdIndex: index("drawdle_submission_user_id_idx").on(submission.userId),
    imageIdIndex: index("drawdle_submission_image_id_idx").on(
      submission.imageId,
    ),
    draweekIdIndex: index("drawdle_submission_draweek_id_idx").on(
      submission.draweekId,
    ),
    foreignKeys: [
      { columns: [submission.userId], references: [images.userId] },
      { columns: [submission.imageId], references: [images.id] },
      { columns: [submission.imageUrl], references: [images.url] },
      { columns: [submission.draweekId], references: [draweeks.id] },
    ],
  }),
);

export const draweeks = createTable(
  "draweek",
  {
    id: serial("id").primaryKey(),
    topic: varchar("topic", { length: 256 }).notNull(),

    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (draweek) => ({
    topicIndex: index("drawdle_draweek_topic_idx").on(draweek.topic),
  }),
);
