import * as Sentry from "@sentry/react-router";
import { StrictMode, startTransition } from "react";
import { hydrateRoot } from "react-dom/client";
import { HydratedRouter } from "react-router/dom";

const tracePropagationTargets: (string | RegExp)[] = [/^\//];

if (import.meta.env.VITE_API_URL) {
  tracePropagationTargets.push(new URL(import.meta.env.VITE_API_URL).origin);
}

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
  release: import.meta.env.VITE_SENTRY_RELEASE,
  integrations: [Sentry.reactRouterTracingIntegration()],
  tracesSampleRate: import.meta.env.PROD ? 0.2 : 1.0,
  tracePropagationTargets,
});

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <HydratedRouter onError={Sentry.sentryOnError} />
    </StrictMode>,
  );
});
