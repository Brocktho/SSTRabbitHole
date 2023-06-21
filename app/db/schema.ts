import { relations, sql } from "drizzle-orm";
import { z } from "zod";
import {
  index,
  mysqlTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";
import crypto from "crypto";
import { createInsertSchema } from "drizzle-zod";

export function DefaultId(value: unknown) {
  if (!value) {
    return crypto.randomUUID();
  }
  if (typeof value === "string") {
    return value;
  }
  throw new Error("Invalid value for DefaultId");
}

export type User = {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export const user = mysqlTable(
  "User",
  {
    id: varchar("id", { length: 191 })
      .primaryKey()
      .default(sql`(uuid())`),
    email: varchar("email", { length: 191 }),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
  },
  (user) => ({
    emailIndex: uniqueIndex("email_idx").on(user.email),
  })
);

export const CreateUserModel = createInsertSchema(user).extend({
  password: z.string().min(8),
});

export const userRelations = relations(user, ({ one, many }) => ({
  password: one(password, {
    fields: [user.id],
    references: [password.userId],
  }),
  notes: many(note),
}));

export const password = mysqlTable(
  "Password",
  {
    hash: varchar("hash", { length: 191 }),
    userId: varchar("userId", { length: 191 })
      .primaryKey()
      .references(() => user.id),
  },
  (password) => ({
    userIdIndex: uniqueIndex("user_id_idx").on(password.userId),
  })
);

export const note = mysqlTable(
  "Note",
  {
    id: varchar("id", { length: 191 })
      .primaryKey()
      .default(sql`(uuid())`),
    title: varchar("title", { length: 191 }).notNull(),
    body: text("body").notNull(),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
    userId: varchar("userId", { length: 191 }).references(() => user.id),
  },
  (note) => ({
    userIdIndex: index("user_id_idx").on(note.userId),
  })
);

export const CreateNoteModel = createInsertSchema(note);

export const noteOneRelations = relations(note, ({ one }) => ({
  user: one(user, {
    fields: [note.userId],
    references: [user.id],
  }),
}));
