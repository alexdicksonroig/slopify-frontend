import { LanguageSelect } from "@app/components/language-select";
import { useTranslate } from "@app/i18n";
import { Button, Dialog } from "@library";
import { useEffect, useId, useState } from "react";

const AGE_VERIFICATION_SEEN_KEY = "age-verification-seen";

export function AgeVerificationDialog() {
  const t = useTranslate();
  const titleId = useId();
  const descriptionId = useId();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(localStorage.getItem(AGE_VERIFICATION_SEEN_KEY) !== "true");
  }, []);

  const handleEnter = () => {
    localStorage.setItem(AGE_VERIFICATION_SEEN_KEY, "true");
    setOpen(false);
  };

  const handleExit = () => {
    window.location.replace("https://www.google.com");
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      overlayBlur
      className="items-center gap-6 text-center"
    >
      <div className="flex flex-col items-center gap-2">
        <img
          src="/assets/roig-parals-logo-dark.png"
          alt=""
          className="mb-4 h-12 w-auto"
        />
        <h2
          id={titleId}
          className="text-xl font-semibold tracking-wide uppercase sm:text-xl"
        >
          {t("age-verification.title")}
        </h2>
        <p
          id={descriptionId}
          className="text-sm text-muted-foreground sm:text-base"
        >
          {t("age-verification.question")}
        </p>
      </div>
      <div className="flex w-full flex-col gap-6">
        <div className="grid grid-cols-2 gap-4">
          <Button type="button" variant="outline" onClick={handleExit}>
            {t("age-verification.no")}
          </Button>
          <Button type="button" variant="secondary" onClick={handleEnter}>
            {t("age-verification.yes")}
          </Button>
        </div>
        <LanguageSelect className="self-center" />
      </div>
    </Dialog>
  );
}
