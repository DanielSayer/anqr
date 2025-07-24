import { createServerFn } from "@tanstack/react-start";
import { isAuthenticated } from "../middleware";

export const getUser = createServerFn({ method: "GET" })
  .middleware([isAuthenticated])
  .handler(async ({ context }) => {
    return context;
  });
