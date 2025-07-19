import { createAuthClient } from "better-auth/react";
import { passkeyClient } from "better-auth/client/plugins";

export const { signIn, signUp, useSession } = createAuthClient({
  plugins: [passkeyClient()],
});
