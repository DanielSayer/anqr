import { Spinner } from "./spinner";
import { Button } from "./ui/button";

type LoadingButtonProps = {
  isLoading: boolean;
  loadingText: string;
} & React.ComponentProps<typeof Button>;

function LoadingButton({
  isLoading,
  loadingText,
  disabled,
  children,
  ...props
}: LoadingButtonProps) {
  return (
    <Button {...props} disabled={isLoading || disabled}>
      {isLoading ? (
        <>
          <Spinner />
          {loadingText}
        </>
      ) : (
        children
      )}
    </Button>
  );
}

export { LoadingButton };
