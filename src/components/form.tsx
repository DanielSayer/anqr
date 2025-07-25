import { Slot } from "@radix-ui/react-slot";
import { useStore } from "@tanstack/react-form";
import type { ArkError } from "arktype";
import { createContext, use, useId } from "react";
import { useFieldContext } from "~/hooks/form-context";
import { cn } from "~/lib/utils";
import { ErrorMessage } from "./error-message";
import { Label } from "./ui/label";

type FormItemContextValue = {
  id: string;
};

const FormItemContext = createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);

const useFormField = <T,>() => {
  const field = useFieldContext<T>();
  const item = use(FormItemContext);
  const errors = useStore(
    field.store,
    (state) => state.meta.errors as ArkError[],
  );

  if (!item) {
    throw new Error("useFormField should be used within a FormItem.");
  }

  const { id } = item;
  return {
    id,
    formDescriptionId: `${id}-form-description`,
    formMessageId: `${id}-form-message`,
    isError: IsError(
      field.form.state.submissionAttempts > 0,
      errors.length,
      field.state.meta.isBlurred,
    ),
    errors,
    field,
  };
};

function FormItem({ className, ...props }: React.ComponentProps<"div">) {
  const id = useId();
  return (
    <FormItemContext.Provider value={{ id }}>
      <div className={cn("grid gap-1", className)} {...props} />
    </FormItemContext.Provider>
  );
}

function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  const { isError, id } = useFormField();

  return (
    <Label
      data-slot="form-label"
      data-error={!!isError}
      className={cn("data-[error=true]:text-destructive", className)}
      htmlFor={id}
      {...props}
    />
  );
}

function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
  const { isError, id, formDescriptionId, formMessageId } = useFormField();

  return (
    <Slot
      data-slot="form-control"
      id={id}
      aria-describedby={
        !isError
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={isError}
      {...props}
    />
  );
}

function FormDescription({ className, ...props }: React.ComponentProps<"p">) {
  const { formDescriptionId } = useFormField();

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function FormMessage({
  className,
  children,
  ...props
}: React.ComponentProps<"p">) {
  const { isError, errors } = useFormField();

  if (!isError) {
    return (
      <p className={cn("min-h-2", className)} {...props}>
        {children}
      </p>
    );
  }

  return (
    <>
      {errors.map((e) => {
        return (
          <ErrorMessage
            className={className}
            key={typeof e === "string" ? e : e.message}
          >
            {typeof e === "string" ? e : e.message}
          </ErrorMessage>
        );
      })}
    </>
  );
}

export {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
};

function IsError(
  hasSubmitted: boolean,
  errorCount: number,
  isBlurred: boolean,
) {
  if (hasSubmitted && errorCount > 0) {
    return true;
  }

  return isBlurred && errorCount > 0;
}
