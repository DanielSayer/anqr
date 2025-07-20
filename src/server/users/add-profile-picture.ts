import { eq } from "drizzle-orm";
import { db } from "~/db";
import { user } from "~/db/auth-schema";
import { ok } from "../result";

export const updateProfilePicture = async (
  imageUrl: string,
  userId: string
) => {
  await db.update(user).set({ image: imageUrl }).where(eq(user.id, userId));

  return ok(void 0);
};
