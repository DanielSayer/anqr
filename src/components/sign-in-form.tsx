import { useStore } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { type } from "arktype";
import { useAppForm } from "~/hooks/use-app-form";
import { signIn } from "~/utils/auth-client";
import { AnimatedCompleteButton } from "./check-button";
import { useState } from "react";
import { Button } from "./ui/button";
import { useSignIn } from "~/hooks/use-sign-in";

const SignInSchema = type({
  email: type("string.email").configure({ message: "Must be a valid email" }),
  password: "string",
});

type Credentials = type.infer<typeof SignInSchema>;

function SignInForm() {
  const navigate = useNavigate();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isUsingPasskey, setIsUsingPasskey] = useState(true);
  const toggle = () => setIsUsingPasskey(!isUsingPasskey);
  const { mutateAsync, isPending } = useSignIn();

  const form = useAppForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onChange: SignInSchema,
      onSubmitAsync: async ({ value }) => {
        const data = await mutateAsync({
          email: value.email,
          password: value.password,
          isUsingPasskey,
        });

        if (data?.message) {
          return {
            fields: {
              password: data.message,
            },
          };
        }
      },
    },
    onSubmit: async () => {
      setIsSignedIn(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate({ to: "/dashboard", from: "/sign-in" });
    },
  });

  return (
    <form
      className="grid gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <form.AppField name="email">
        {(field) => (
          <field.Input
            label="Email"
            placeholder="m@example.com"
            type="email"
            autoComplete="email"
          />
        )}
      </form.AppField>
      {!isUsingPasskey && (
        <form.AppField name="password">
          {(field) => (
            <field.Input
              label="Password"
              type="password"
              autoComplete="current-password"
              placeholder="Password"
            />
          )}
        </form.AppField>
      )}

      <AnimatedCompleteButton
        isLoading={isPending}
        type="submit"
        loadingText="Signing in..."
        completeText="Done!"
        isComplete={isSignedIn}
      >
        Sign in
      </AnimatedCompleteButton>
      <Button onClick={() => toggle()} type="button" variant="ghost" size="sm">
        {isUsingPasskey ? "Sign in with password" : "Sign in with passkey"}
      </Button>
    </form>
  );
}

export { SignInForm };
