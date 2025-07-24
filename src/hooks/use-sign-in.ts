import { useMutation } from "@tanstack/react-query";
import { signIn } from "~/utils/auth-client";

type Credentials = {
  email: string;
  password: string;
  isUsingPasskey: boolean;
};

export const useSignIn = () => {
  return useMutation({
    mutationFn: async ({ isUsingPasskey, email, password }: Credentials) => {
      if (isUsingPasskey) {
        return await signInWithPasskey(email);
      } else {
        return await signInWithPassword(email, password);
      }
    },
  });
};

async function signInWithPasskey(email: string) {
  const result = await signIn.passkey({
    email: email,
  });

  if (result?.error) {
    return { message: result.error.message };
  }
}

async function signInWithPassword(email: string, password: string) {
  const result = await signIn.email({
    email: email,
    password: password,
  });

  if (result?.error) {
    return { message: result.error.message };
  }
}
