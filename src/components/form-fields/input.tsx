import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
} from "../form";
import { Input as InputPrimitive } from "../ui/input";
import type { FormFieldProps } from "./types";

type InputProps = Omit<
  React.ComponentProps<typeof InputPrimitive>,
  "value" | "onChange" | "onBlur"
>;

export function Input({
  label,
  labelProps,
  ...props
}: FormFieldProps & InputProps) {
  const { field } = useFormField<string>();
  return (
    <FormItem>
      <FormLabel {...labelProps}>{label}</FormLabel>
      <FormControl>
        <InputPrimitive
          {...props}
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
          onBlur={field.handleBlur}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}
