import { useTranslate } from "@app/i18n";
import { Button, Dialog } from "@library";
import { useId, useState } from "react";

export function AgeVerificationDialog() {
  const t = useTranslate();
  const titleId = useId();
  const [open, setOpen] = useState(true);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      bottomOnMobile={false}
      className="w-[calc(100%-2rem)] gap-6 p-6 shadow-none sm:w-[350px]"
    >
      <h2 id={titleId} className="text-center text-xl font-semibold">
        {t("age-verification.question")}
      </h2>
      <div className="grid grid-cols-2 gap-3">
        <Button type="button" variant="outline">
          {t("age-verification.no")}
        </Button>
        <Button type="button" onClick={() => setOpen(false)}>
          {t("age-verification.yes")}
        </Button>
      </div>
    </Dialog>
  );
}
