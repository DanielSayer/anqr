import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";
import { getHeaders, getWebRequest } from "@tanstack/react-start/server";
import { auth } from "~/utils/auth";
import { getSession } from "~/utils/auth-client";

export const ensureAuthenticated = createMiddleware({
  type: "function",
}).server(async ({ next }) => {
  const request = getWebRequest();

  if (!request?.headers) {
    throw redirect({ to: "/", search: { redirect: request.url } });
  }

  const session = await auth.api.getSession({ headers: request.headers });

  if (!session) {
    throw redirect({ to: "/", search: { redirect: request.url } });
  }

  return next({
    context: { userId: session.user.id },
  });
});

export const isAuthenticated = createMiddleware({
  type: "function",
}).server(async ({ next }) => {
  const { data: session } = await getSession({
    fetchOptions: {
      headers: getHeaders() as HeadersInit,
    },
  });

  const user = session?.user
    ? { id: session.user.id, name: session.user.name }
    : null;

  return await next({
    context: { user },
  });
});
