import { passkeyClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const { signIn, signUp, passkey, useSession, getSession, signOut } =
  createAuthClient({
    plugins: [passkeyClient()],
  });
