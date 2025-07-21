import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";

export const Route = createFileRoute("/(auth)/_auth")({
  component: LayoutComponent,
});

function LayoutComponent() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <div className="w-full min-h-screen bg-muted"></div>
      <motion.div
        key={location.pathname}
        initial={{ x: location.pathname === "/sign-up" ? "-50%" : "50%" }}
        animate={{ x: 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 35,
        }}
        className="w-full absolute z-1 top-0 left-0"
        style={{ willChange: "transform" }}
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
}
