import type { FormLabel } from "../form";

type FormFieldProps = {
  label: string;
  labelProps?: Omit<React.ComponentProps<typeof FormLabel>, "children">;
};

export type { FormFieldProps };
