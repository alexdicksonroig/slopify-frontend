import clsx from "clsx";

const Card = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={clsx(
      "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
      className,
    )}
    {...props}
  />
);

const CardHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={clsx("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
);

const CardTitle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={clsx("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
);

const CardDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={clsx("text-sm text-muted-foreground", className)}
    {...props}
  />
);

const CardContent = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={clsx("p-6 pt-0", className)} {...props} />
);

const CardFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={clsx("flex items-center p-6 pt-0", className)} {...props} />
);

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
