import { relations } from "drizzle-orm";
import { z } from "zod";
import {
  binary,
  boolean,
  index,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { ulid } from "ulid";

export const ULID = z.string().max(26).default(ulid());

export type User = {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export const user = mysqlTable(
  "User",
  {
    id: binary("id", { length: 26 }).primaryKey(),
    email: varchar("email", { length: 255 }).notNull(),
    avatar: varchar("avatar", { length: 255 }).notNull().default("N/A"),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
  },
  (user) => ({
    emailIndex: uniqueIndex("email_idx").on(user.email),
  })
);

export const CreateUserModel = createInsertSchema(user).extend({
  id: ULID,
  password: z.string().min(8),
});

export const userRelations = relations(user, ({ one, many }) => ({
  password: one(password, {
    fields: [user.id],
    references: [password.userId],
  }),
  notes: many(note),
}));

export const settings = mysqlTable("Settings", {
  id: binary("id", { length: 26 }).primaryKey(),
  public: boolean("public").default(false),
  theme: mysqlEnum("theme", ["light", "dark", "system"]).default("system"),
});

export const CreateSettingsModel = createInsertSchema(settings);

export const password = mysqlTable(
  "Password",
  {
    hash: binary("hash", { length: 60 }),
    userId: binary("userId", { length: 26 }).primaryKey(),
  },
  (password) => ({
    userIdIndex: uniqueIndex("user_id_idx").on(password.userId),
  })
);

export const note = mysqlTable(
  "Note",
  {
    id: binary("id", { length: 26 }).primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    body: text("body").notNull(),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
    userId: binary("userId", { length: 26 }),
  },
  (note) => ({
    userIdIndex: index("user_id_idx").on(note.userId),
  })
);

export const CreateNoteModel = createInsertSchema(note).extend({
  id: ULID,
});

export const noteOneRelations = relations(note, ({ one }) => ({
  user: one(user, {
    fields: [note.userId],
    references: [user.id],
  }),
}));
