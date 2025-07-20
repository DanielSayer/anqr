import { createEnv } from "@t3-oss/env-core";
import { type } from "arktype";

export const env = createEnv({
  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    BETTER_AUTH_SECRET: type("string").atLeastLength(1),
    BETTER_AUTH_URL: type("string.url"),
    DATABASE_URL: type("string.url"),
    RP_ID: type("string").atLeastLength(1),
  },
  /*
   * Environment variables available on the client (and server).
   *
   * 💡 You'll get type errors if these are not prefixed with PUBLIC_.
   */
  clientPrefix: "PUBLIC_",
  client: {},
  /*
   * Specify what values should be validated by your schemas above.
   */
  runtimeEnv: process.env,
});
