import { drizzle } from "drizzle-orm/node-postgres";
import PG from "pg";
import { env } from "~/env";
import * as schema from "./schema";

const pool = new PG.Pool({ connectionString: env.DATABASE_URL });
const db = drizzle(pool, { schema });

export { db, pool };
