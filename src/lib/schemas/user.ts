import { type } from "arktype";
import { Password } from "./password";

export const UserSchema = type({
  firstName: "string",
  lastName: "string",
  email: "string",
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
