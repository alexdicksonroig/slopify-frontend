import { AgeVerificationDialog } from "@app/components/age-verification-dialog";
import { LanguageProvider, useTranslate } from "@app/i18n";
import { CartProvider } from "@app/lib/context/cart.context";
import { LoadingCircle } from "@library";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ca"
      className="has-[.drawer-open]:h-svh has-[.drawer-open]:overflow-hidden"
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <LanguageProvider>
          <CartProvider>{children}</CartProvider>
        </LanguageProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
export function HydrateFallback() {
  const t = useTranslate();

  return (
    <output
      aria-label={t("app.loading")}
      className="flex min-h-screen items-center justify-center bg-white dark:bg-gray-950"
    >
      <LoadingCircle size="lg" className="text-gray-900 dark:text-white" />
    </output>
  );
}

export default function App() {
  return (
    <>
      <Outlet />
      <AgeVerificationDialog />
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const t = useTranslate();
  let message = t("error.oops");
  let details = t("error.unexpected");
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : t("error.generic");
    details =
      error.status === 404 ? t("error.not-found") : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="container mx-auto p-4 pt-16">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
