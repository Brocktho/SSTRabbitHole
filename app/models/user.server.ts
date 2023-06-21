import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import invariant from "tiny-invariant";
import { drizzle } from "~/db.server";
import { password, user } from "~/db/schema";

export async function getUserById(id: string) {
  return drizzle.query.user.findFirst({
    where: eq(user.id, id),
  });
}

export async function getUserByEmail(email: string) {
  return drizzle.query.user.findFirst({
    where: eq(user.email, email),
  });
}

export async function createUser(email: string, pass: string) {
  const hashedPassword = await bcrypt.hash(pass, 10);

  const created_user = await drizzle
    .insert(user)
    .values({
      email,
    })
    .then(() => {
      return drizzle.query.user.findFirst({
        where: eq(user.email, email),
      });
    });

  invariant(created_user, "User was not created");

  return drizzle
    .insert(password)
    .values({
      hash: hashedPassword,
      userId: created_user.id,
    })
    .then(() => {
      return created_user;
    });
}

export async function deleteUserByEmail(email: string) {
  return drizzle.delete(user).where(eq(user.email, email));
}

export async function verifyLogin(email: string, password: string) {
  const userWithPassword = await drizzle.query.user.findFirst({
    where: eq(user.email, email),
    with: {
      password: true,
    },
  });

  if (!userWithPassword || !userWithPassword.password) {
    return null;
  }

  const isValid = await bcrypt.compare(
    password,
    userWithPassword.password.hash || ""
  );

  if (!isValid) {
    return null;
  }

  const { password: _password, ...userWithoutPassword } = userWithPassword;

  return userWithoutPassword;
}
