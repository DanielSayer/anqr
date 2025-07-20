import { auth } from "~/utils/auth";

export const isAuthenticated = async (req: Request) => {
  const session = await auth.api.getSession({ headers: req.headers });

  if (!session) {
    return null;
  }

  return session.user;
};
