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
      bottomOnMobile={false}
      className="p-5"
    >
      <img
        src="/assets/roig-parals-logo-dark.png"
        alt=""
        className="mx-auto h-10 w-auto"
      />
      <h2
        id={titleId}
        className="text-center text-lg lg:text-2xl font-semibold tracking-wide uppercase"
      >
        {t("age-verification.title")}
      </h2>
      <p
        id={descriptionId}
        className="text-center text-sm lg:text-lg leading-relaxed text-muted-foreground"
      >
        {t("age-verification.question")}
      </p>
      <div className="grid grid-cols-2 gap-3">
        <Button type="button" variant="outline" onClick={handleExit}>
          {t("age-verification.no")}
        </Button>
        <Button type="button" onClick={handleEnter}>
          {t("age-verification.yes")}
        </Button>
      </div>
      <LanguageSelect className="self-center" />
    </Dialog>
  );
}
