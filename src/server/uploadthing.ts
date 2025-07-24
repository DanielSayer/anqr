import type { FileRouter } from "uploadthing/server";
import { createUploadthing, UploadThingError } from "uploadthing/server";
import { isAuthenticated } from "./auth";
import { isFailure } from "./result";
import { updateProfilePicture } from "./users/add-profile-picture";

const f = createUploadthing();

export const uploadRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      const user = await isAuthenticated(req);

      if (!user) throw new UploadThingError("Unauthorized");

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const result = await updateProfilePicture(file.ufsUrl, metadata.userId);

      if (isFailure(result)) {
        throw new UploadThingError("Could not update profile picture");
      }

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;
