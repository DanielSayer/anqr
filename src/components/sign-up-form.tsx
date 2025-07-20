import { Plus, X } from "lucide-react";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { useAppForm } from "~/hooks/use-app-form";
import { UserSchema } from "~/lib/schemas/user";
import { LoadingButton } from "./loading-button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

function SignUpForm() {
  const [image, setImage] = useState<{
    name: string;
    preview: string;
  } | null>(null);

  const form = useAppForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      image: undefined as File | undefined,
    },
    schema: UserSchema,
  });

  const handleImageUpload = (files: File[]) => {
    const file = files[0];
    if (file) {
      form.setFieldValue("image", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage({ name: file.name, preview: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    form.setFieldValue("image", undefined);
    setImage(null);
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
            autoComplete="email"
            required
          />
        )}
      </form.AppField>
      <form.AppField name="password">
        {(field) => (
          <field.Input
            label="Password"
            type="password"
            autoComplete="new-password"
            placeholder="Password"
          />
        )}
      </form.AppField>
      <form.AppField name="confirmPassword">
        {(field) => (
          <field.Input
            label="Confirm Password"
            type="password"
            autoComplete="new-password"
            placeholder="Confirm Password"
          />
        )}
      </form.AppField>
      <div className="grid gap-2">
        <Label htmlFor="image">Profile Image (optional)</Label>
        <div className="flex items-end gap-4">
          {image && (
            <Avatar>
              <AvatarImage src={image.preview} />
              <AvatarFallback>AQ</AvatarFallback>
            </Avatar>
          )}
          <div className="flex items-center gap-2 w-full">
            <Dropzone multiple={false} onDropAccepted={handleImageUpload}>
              {({ getRootProps, getInputProps }) => (
                <div
                  {...getRootProps()}
                  className="flex items-center gap-2 w-full"
                >
                  <div className="w-full flex gap-2 rounded-md items-center border h-9 px-3 cursor-pointer text-sm">
                    <Plus className="size-4 " />
                    {image ? image.name : "Add image"}
                    <input id="image" {...getInputProps()} />
                  </div>
                  {image && (
                    <Button
                      variant="ghost"
                      size="icon"
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleImageRemove();
                      }}
                    >
                      <X />
                      <span className="sr-only">Remove image</span>
                    </Button>
                  )}
                </div>
              )}
            </Dropzone>
          </div>
        </div>
      </div>
      <LoadingButton
        type="submit"
        className="w-full"
        isLoading={true}
        loadingText="Creating account..."
      >
        Create an account
      </LoadingButton>
    </form>
  );
}

export { SignUpForm };
