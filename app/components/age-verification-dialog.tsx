import { useLanguage, useTranslate } from "@app/i18n";
import { Button, Dialog, Select } from "@library";
import { useEffect, useId, useState } from "react";

const AGE_VERIFICATION_SEEN_KEY = "age-verification-seen";

export function AgeVerificationDialog() {
  const t = useTranslate();
  const { language, setLanguage, languageOptions } = useLanguage();
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
      className="w-[calc(100%-2rem)] max-w-[300px] gap-5 p-5 shadow-none sm:w-[350px] sm:max-w-none sm:gap-6 sm:p-6"
    >
      <img
        src="/assets/roig-parals-logo-dark.png"
        alt=""
        className="mx-auto h-10 w-auto"
      />
      <h2
        id={titleId}
        className="text-center text-xl lg:text-3xl font-semibold tracking-wide uppercase"
      >
        {t("age-verification.title")}
      </h2>
      <p
        id={descriptionId}
        className="text-center text-sm lg:text-lg leading-relaxed text-muted-foreground"
      >
        {t("age-verification.question")}
      </p>
      {languageOptions.length > 0 && (
        <div className="flex justify-center">
          <Select
            value={language}
            onChange={setLanguage}
            options={languageOptions}
            placeholder={t("header.language")}
            icon="globe"
            size="sm"
            className="min-w-32"
            aria-label={t("header.language")}
          />
        </div>
      )}
      <div className="grid grid-cols-2 gap-3">
        <Button type="button" variant="outline" onClick={handleExit}>
          {t("age-verification.no")}
        </Button>
        <Button type="button" onClick={handleEnter}>
          {t("age-verification.yes")}
        </Button>
      </div>
    </Dialog>
  );
}
