import { useTranslate } from "@app/i18n";
import { Button, Card, Icon } from "@library";
import { useEffect, useState } from "react";

const COOKIE_CONSENT_KEY = "cookie-consent";

type CookieConsent = "accepted" | "rejected";

export function CookieBanner() {
  const t = useTranslate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(localStorage.getItem(COOKIE_CONSENT_KEY) === null);
  }, []);

  const handleConsent = (consent: CookieConsent) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, consent);
    setOpen(false);
  };

  if (!open) return null;

  return (
    <Card
      role="region"
      aria-label={t("cookie-banner.label")}
      className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-2xl items-center gap-4 rounded-b-none border-b-0 p-4 text-center sm:p-6"
    >
      <div className="flex w-full items-center gap-3 sm:w-auto sm:gap-4">
        <Icon icon="cookie" size="lg" />
        <div className="grid flex-1 grid-cols-2 gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={() => handleConsent("rejected")}
          >
            {t("cookie-banner.reject")}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => handleConsent("accepted")}
          >
            {t("cookie-banner.accept")}
          </Button>
        </div>
      </div>
      <p className="max-w-xl text-xs text-muted-foreground sm:text-sm">
        {t("cookie-banner.description")}
      </p>
    </Card>
  );
}
