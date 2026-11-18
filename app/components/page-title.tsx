import { cn } from "@library";
import type { ReactNode } from "react";

export function PageTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={cn(
        "text-3xl font-bold tracking-tight text-neutral-950 lg:text-4xl",
        className,
      )}
    >
      {children}
    </h1>
  );
}
