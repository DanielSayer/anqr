import { createAuthClient } from "better-auth/react";
import { passkeyClient } from "better-auth/client/plugins";

export const { signIn, signUp, passkey, useSession, getSession, signOut } =
  createAuthClient({
    plugins: [passkeyClient()],
  });
