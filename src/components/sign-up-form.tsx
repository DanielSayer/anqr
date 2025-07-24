import { useMutation } from "@tanstack/react-query";
import { useDropzone } from "@uploadthing/react";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import {
  generateClientDropzoneAccept,
  generatePermittedFileTypes,
} from "uploadthing/client";
import { useAppForm } from "~/hooks/use-app-form";
import { type User, UserSchema } from "~/lib/schemas/user";
import { signUp } from "~/utils/auth-client";
import { useUploadThing } from "~/utils/uploadthing";
import { FormControl, FormLabel, FormMessage } from "./form";
import { LoadingButton } from "./loading-button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { useNavigate } from "@tanstack/react-router";

function SignUpForm() {
  const navigate = useNavigate();
  const [loadingText, setLoadingText] = useState("Creating account...");
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
    onSubmit: async ({ value }) => {
      await mutateAsync(value);
    },
    validators: {
      onChange: UserSchema,
    },
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
    form.resetField("image");
    setImage(null);
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (user: User) => {
      await signUp.email({
        email: user.email,
        password: user.password,
        name: `${user.firstName} ${user.lastName}`,
      });

      if (user.image) {
        await startUpload([user.image]);
      }
    },
    onSuccess: () => {
      setLoadingText("Account created!");
      navigate({ to: "/passkey", from: "/sign-up" });
    },
  });

  const { startUpload, routeConfig } = useUploadThing("imageUploader", {
    onUploadBegin: () => {
      setLoadingText("Uploading your profile picture...");
    },
  });

  const { getInputProps, getRootProps } = useDropzone({
    multiple: false,
    onDrop: handleImageUpload,
    accept: generateClientDropzoneAccept(
      generatePermittedFileTypes(routeConfig).fileTypes,
    ),
  });

  return (
    <form
      className="grid gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <div className="grid grid-cols-2 gap-4">
        <form.AppField name="firstName">
          {(field) => <field.Input label="First name" placeholder="Max" />}
        </form.AppField>
        <form.AppField name="lastName">
          {(field) => <field.Input label="Last name" placeholder="Robinson" />}
        </form.AppField>
      </div>
      <form.AppField name="email">
        {(field) => (
          <field.Input
            label="Email"
            type="email"
            placeholder="m@example.com"
            autoComplete="email"
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
      <form.AppField name="image">
        {() => (
          <div className="grid gap-2">
            <FormLabel>Profile Image (optional)</FormLabel>
            <div className="flex items-end gap-4">
              {image && (
                <Avatar>
                  <AvatarImage src={image.preview} />
                  <AvatarFallback>AQ</AvatarFallback>
                </Avatar>
              )}
              <div className="flex items-center gap-2 w-full">
                <div
                  {...getRootProps()}
                  className="flex items-center gap-2 w-full"
                >
                  <div className="w-full flex gap-2 rounded-md items-center border h-9 px-3 cursor-pointer text-sm">
                    <Plus className="size-4 " />
                    {image ? image.name : "Add image"}
                    <FormControl>
                      <input
                        id="image"
                        key={image?.name}
                        {...getInputProps()}
                      />
                    </FormControl>
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
              </div>
            </div>
            <FormMessage />
          </div>
        )}
      </form.AppField>
      <LoadingButton
        type="submit"
        className="w-full"
        isLoading={isPending}
        loadingText={loadingText}
      >
        Create an account
      </LoadingButton>
    </form>
  );
}

export { SignUpForm };
