import type { Config } from "drizzle-kit";
import invariant from "tiny-invariant";
import * as dotenv from "dotenv";
dotenv.config();

invariant(process.env.DATABASE_URL, "DATABASE_URL is required");
const connectionString = process.env["DATABASE_URL"];

export default {
  schema: "./app/db/schema.ts",
  out: "./drizzle",
  driver: "mysql2",
  strict: true,
  dbCredentials: {
    connectionString,
  },
} satisfies Config;
