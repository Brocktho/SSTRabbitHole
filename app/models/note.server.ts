import { and, eq } from "drizzle-orm";
import { ulid } from "ulid";
import { drizzle } from "~/db.server";
import { note } from "~/db/schema";

export function getNote({ id, userId }: { id: string; userId: string }) {
  return drizzle.query.note.findFirst({
    where: and(eq(note.id, id), eq(note.userId, userId)),
  });
}

export function getNoteListItems({ userId }: { userId: string }) {
  return drizzle.query.note.findMany({
    where: eq(note.userId, userId),
  });
}
export function createNote({
  body,
  title,
  userId,
}: {
  body: string;
  title: string;
  userId: string;
}) {
  const id = ulid();
  return drizzle
    .insert(note)
    .values({
      id,
      userId,
      body,
      title,
    })
    .then(() => {
      return id;
    });
}

export function deleteNote({ id, userId }: { id: string; userId: string }) {
  return drizzle
    .delete(note)
    .where(and(eq(note.userId, userId), eq(note.id, id)));
}
