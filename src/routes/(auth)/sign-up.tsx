import { createFileRoute, Link } from "@tanstack/react-router";
import { SignUpForm } from "~/components/sign-up-form";
import { buttonVariants } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export const Route = createFileRoute("/(auth)/sign-up")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-full flex">
      <div className="min-h-screen bg-muted flex-1"></div>
      <div className="flex-1 grid place-items-center bg-background">
        <div>
          <Card className="max-w-md">
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">Sign Up</CardTitle>
              <CardDescription className="text-xs md:text-sm">
                Enter your information to create an account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SignUpForm />
            </CardContent>
            <CardFooter>
              <div className="flex justify-center w-full border-t py-4">
                <p className="text-center text-xs text-muted-foreground">
                  Secured by <span className="text-primary">better-auth.</span>
                </p>
              </div>
            </CardFooter>
          </Card>

          <p className="text-center mt-4 text-sm text-neutral-600 dark:text-neutral-400">
            Already have an account?{" "}
            <Link to="/sign-in" className={buttonVariants({ variant: "link" })}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
