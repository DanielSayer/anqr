import { type } from "arktype";
import { Password } from "./misc";

const MAX_FILE_SIZE = 4 * 1024 * 1024;

export const UserSchema = type({
  firstName: type("string")
    .atLeastLength(1)
    .configure({ message: "First name is required" }),
  lastName: type("string")
    .atLeastLength(1)
    .configure({ message: "Last name is required" }),
  email: type("string.email").configure({ message: "Must be a valid email" }),
  password: Password,
  confirmPassword: "string",
  image: "File | undefined",
})
  .narrow((data, ctx) => {
    console.log(data.password);
    if (data.password === data.confirmPassword) {
      return true;
    }

    return ctx.reject({
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });
  })
  .narrow(({ image }, ctx) => {
    if (image?.size && image.size > MAX_FILE_SIZE) {
      return ctx.reject({
        message: "Profile picture must be less than 4MB",
        path: ["image"],
      });
    }

    return true;
  });

export type User = typeof UserSchema.infer;
