import { useMutation } from "@tanstack/react-query";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { Shield, Smartphone, Sparkles, Zap } from "lucide-react";
import { useRef, useState } from "react";
import { FingerprintIcon } from "~/components/animate-ui/icons/fingerprint";
import { AnimatedCheckIcon } from "~/components/animated-icons";
import { Confetti, ConfettiRef } from "~/components/magicui/confetti";
import { ShimmerButton } from "~/components/magicui/shimmer-button";
import { Spinner } from "~/components/spinner";
import { Alert, AlertDescription } from "~/components/ui/alert";
import { buttonVariants } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { getUser } from "~/server/users/get-user";
import { passkey } from "~/utils/auth-client";

export const Route = createFileRoute("/(auth)/passkey")({
  component: RouteComponent,
  beforeLoad: async () => {
    return await getUser();
  },
  loader: async ({ context }) => {
    if (!context.user) {
      throw redirect({ to: "/sign-in" });
    }

    return context.user;
  },
});

function RouteComponent() {
  const confettiRef = useRef<ConfettiRef>(null);
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () => {
      const result = await passkey.addPasskey({ name: "anqr" });
      if (result?.error) {
        throw result.error;
      }
    },
    onSuccess: () => {
      setIsSetupComplete(true);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  if (isSetupComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <Confetti
          ref={confettiRef}
          className="absolute left-0 top-0 z-0 size-full"
        />
        <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <AnimatedCheckIcon isChecked className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              🎉 You're all set!
            </CardTitle>
            <CardDescription className="text-gray-600">
              Your passkey has been successfully created. You can now sign in
              securely with just a touch or glance!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link
              to="/dashboard"
              className={buttonVariants({
                variant: "default",
                className: "w-full z-10",
              })}
            >
              Continue to Dashboard
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg shadow-xl border-0 bg-background/80 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
            <FingerprintIcon
              animateOnHover
              animation="default-2"
              className="w-8 h-8 text-white"
            />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
              Secure Your Account
              <Sparkles className="w-5 h-5 text-yellow-500" />
            </CardTitle>
            <CardDescription className="text-muted-foreground text-base">
              Add a passkey for the fastest, most secure way to sign in
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <Alert className="border-blue-200 bg-blue-50">
            <Shield className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              Passkeys are more secure than passwords and work with your
              fingerprint, face, or device PIN
            </AlertDescription>
          </Alert>

          <div className="grid gap-4">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Zap className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">
                  Lightning Fast
                </h3>
                <p className="text-gray-600 text-sm">
                  Sign in instantly with just a touch or glance
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Shield className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">
                  Ultra Secure
                </h3>
                <p className="text-gray-600 text-sm">
                  Impossible to phish or steal, unlike passwords
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Smartphone className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">
                  Works Everywhere
                </h3>
                <p className="text-gray-600 text-sm">
                  Use on all your devices - phone, laptop, tablet
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <ShimmerButton
              className="w-full hover:scale-[1.01]"
              disabled={isPending}
              onClick={() => mutateAsync()}
            >
              {isPending ? (
                <div className="flex items-center gap-2">
                  <Spinner />
                  Setting up your passkey...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <FingerprintIcon
                    animateOnHover
                    animation="default-2"
                    className="w-5 h-5"
                  />
                  Add Passkey Now
                </div>
              )}
            </ShimmerButton>

            <Link
              className={buttonVariants({
                variant: "ghost",
                className: "w-full text-muted-foreground",
              })}
              to="/dashboard"
            >
              Skip for now (not recommended)
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
