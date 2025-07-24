import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "~/components/ui/button";
import { signOut } from "~/utils/auth-client";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  return (
    <div>
      Hello "/dashboard"!
      <Button
        onClick={() => {
          signOut();
          navigate({ to: "/sign-in" });
        }}
      >
        Sign out
      </Button>
    </div>
  );
}
