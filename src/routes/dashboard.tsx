import { createFileRoute } from "@tanstack/react-router";
import { Button } from "~/components/ui/button";
import { signOut } from "~/utils/auth-client";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Hello "/dashboard"!
      <Button onClick={() => signOut()}>Sign out</Button>
    </div>
  );
}
