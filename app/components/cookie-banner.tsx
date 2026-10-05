import { useTranslate } from "@app/i18n";
import { Button, Dialog, Icon } from "@library";
import { useEffect, useId, useState } from "react";

const COOKIE_CONSENT_KEY = "cookie-consent";

type CookieConsent = "accepted" | "rejected";

export function CookieBanner() {
  const t = useTranslate();
  const descriptionId = useId();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(localStorage.getItem(COOKIE_CONSENT_KEY) === null);
  }, []);

  const handleConsent = (consent: CookieConsent) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, consent);
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      role="dialog"
      aria-modal="true"
      aria-label={t("cookie-banner.label")}
      aria-describedby={descriptionId}
      className="items-center gap-4 text-center"
    >
      <div className="flex w-full items-center gap-3 sm:gap-4">
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
      <p
        id={descriptionId}
        className="text-xs text-muted-foreground sm:text-sm"
      >
        {t("cookie-banner.description")}
      </p>
    </Dialog>
  );
}
