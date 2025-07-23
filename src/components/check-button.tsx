import React, { ComponentProps, useState } from "react";
import { AnimtatedCheckIcon } from "./animated-icons";
import { LoadingButton } from "./loading-button";

type AnimatedCompleteButtonProps = ComponentProps<typeof LoadingButton> & {
  completeText: string;
  isComplete: boolean;
};

export const AnimatedCompleteButton = ({
  onClick,
  isComplete,
  completeText,
  isLoading,
  disabled,
  children,
  ...props
}: AnimatedCompleteButtonProps) => {
  return (
    <LoadingButton
      isLoading={isLoading}
      disabled={isLoading || disabled || isComplete}
      {...props}
    >
      {isComplete ? (
        <>
          <AnimtatedCheckIcon isChecked />
          {completeText}
        </>
      ) : (
        children
      )}
    </LoadingButton>
  );
};
