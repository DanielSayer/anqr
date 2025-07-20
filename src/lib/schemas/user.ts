import { type } from "arktype";
import { Password } from "./password";

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
}).narrow((data, ctx) => {
  if (data.password === data.confirmPassword) {
    return true;
  }

  return ctx.reject({
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
});

export type User = typeof UserSchema.infer;
