import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Loader2, X } from "lucide-react";
import { type } from "arktype";
import { useAppForm } from "~/hooks/use-app-form";
import { Password } from "~/lib/types";
import { useStore } from "@tanstack/react-form";

const User = type({
  firstName: "string",
  lastName: "string",
  email: "string",
  password: Password,
  confirmPassword: "string",
  image: "File | undefined",
}).narrow((data, ctx) => {
  if (data.password === data.confirmPassword) {
    return true;
  }

  return ctx.reject({
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
});

function SignUpForm() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useAppForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      image: undefined as File | undefined,
    },
    schema: User,
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setFieldValue("image", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    form.setFieldValue("image", undefined);
    setImagePreview(null);
  };

  return (
    <form className="grid gap-2">
      <div className="grid grid-cols-2 gap-4">
        <form.AppField name="firstName">
          {(field) => (
            <field.Input label="First name" placeholder="Max" required />
          )}
        </form.AppField>
        <form.AppField name="lastName">
          {(field) => (
            <field.Input label="Last name" placeholder="Robinson" required />
          )}
        </form.AppField>
      </div>
      <form.AppField name="email">
        {(field) => (
          <field.Input
            label="Email"
            type="email"
            placeholder="m@example.com"
            required
          />
        )}
      </form.AppField>
      <form.AppField name="password">
        {(field) => (
          <field.Input
            label="Password"
            type="password"
            placeholder="Password"
          />
        )}
      </form.AppField>
      <form.AppField name="confirmPassword">
        {(field) => (
          <field.Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm Password"
          />
        )}
      </form.AppField>
      <div className="grid gap-2">
        <Label htmlFor="image">Profile Image (optional)</Label>
        <div className="flex items-end gap-4">
          {imagePreview && (
            <div className="relative w-16 h-16 rounded-sm overflow-hidden">
              <img
                src={imagePreview}
                alt="Profile preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="flex items-center gap-2 w-full">
            {/** TODO: fix USE DROPZONE */}
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full"
            />
            {imagePreview && (
              <Button
                variant="ghost"
                size="icon"
                type="button"
                onClick={handleImageRemove}
              >
                <X />
                <span className="sr-only">Remove image</span>
              </Button>
            )}
          </div>
        </div>
      </div>
      <Button type="submit" className="w-full">
        {false ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          "Create an account"
        )}
      </Button>
    </form>
  );
}

export { SignUpForm };
