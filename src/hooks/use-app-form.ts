import { createFormHook } from "@tanstack/react-form";
import { Input } from "~/components/form-fields";
import { fieldContext, formContext } from "./form-context";

export const { useAppForm } = createFormHook({
  fieldComponents: {
    Input,
  },
  formComponents: {},
  fieldContext,
  formContext,
});
