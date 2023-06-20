import {
  mysqlTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";
import crypto from "node:crypto";

export const user = mysqlTable(
  "User",
  {
    id: varchar("id", { length: 191 })
      .primaryKey()
      .default(crypto.randomUUID()),
    email: varchar("email", { length: 191 }),
    createdAt: timestamp("createdAt"),
    updatedAt: timestamp("updatedAt"),
  },
  (user) => ({
    emailIndex: uniqueIndex("email_idx").on(user.email),
  })
);

export const password = mysqlTable("Password", {
  hash: varchar("hash", { length: 191 }),
  userId: varchar("userId", { length: 191 })
    .primaryKey()
    .references(() => user.id),
});

export const note = mysqlTable("Note", {
  id: varchar("id", { length: 191 }).primaryKey().default(crypto.randomUUID()),
  title: varchar("title", { length: 191 }),
  body: text("body"),
  createdAt: timestamp("createdAt"),
  updatedAt: timestamp("updatedAt"),
  userId: varchar("userId", { length: 191 }).references(() => user.id),
});
