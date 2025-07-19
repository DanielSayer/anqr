import { createFormHook } from "@tanstack/react-form";
import type {
  FormAsyncValidateOrFn,
  FormOptions,
  FormValidateOrFn,
  StandardSchemaV1,
} from "@tanstack/react-form";
import { fieldContext, formContext } from "./form-context";
import { Input } from "~/components/form-fields";

const { useAppForm: useTanstackAppForm } = createFormHook({
  fieldComponents: {
    Input,
  },
  formComponents: {},
  fieldContext,
  formContext,
});

export const useAppForm = <
  TFormData,
  TOnMount extends undefined | FormValidateOrFn<TFormData>,
  TOnChange extends undefined | StandardSchemaV1<TFormData>,
  TOnChangeAsync extends undefined | FormAsyncValidateOrFn<TFormData>,
  TOnBlur extends undefined | FormValidateOrFn<TFormData>,
  TOnBlurAsync extends undefined | FormAsyncValidateOrFn<TFormData>,
  TOnSubmit extends undefined | FormValidateOrFn<TFormData>,
  TOnSubmitAsync extends undefined | FormAsyncValidateOrFn<TFormData>,
  TOnServer extends undefined | FormAsyncValidateOrFn<TFormData>,
  TSubmitMeta,
>({
  schema,
  ...props
}: Omit<
  FormOptions<
    TFormData,
    TOnMount,
    TOnChange,
    TOnChangeAsync,
    TOnBlur,
    TOnBlurAsync,
    TOnSubmit,
    TOnSubmitAsync,
    TOnServer,
    TSubmitMeta
  >,
  "validators" | "onSubmit"
> & {
  schema: TOnChange;
}) => {
  return useTanstackAppForm({ ...props, validators: { onChange: schema } });
};
