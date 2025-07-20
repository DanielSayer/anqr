import { type } from "arktype";

const Password = type("string")
  .atLeastLength(8)
  .atMostLength(128)
  .configure({
    message: (ctx) =>
      ctx.code === "minLength"
        ? "Password must be at least 8 characters"
        : ctx.code === "maxLength"
          ? "Password must be less than 128 characters"
          : "",
  });

export { Password };
