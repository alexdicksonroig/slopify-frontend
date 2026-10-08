import { useTranslate } from "@app/i18n";
import { Button } from "@library";
import { useNavigate } from "react-router";

export default function NotFound() {
  const t = useTranslate();
  const navigate = useNavigate();

  return (
    <div className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center text-center">
      <p className="text-7xl font-bold tracking-[-0.05em] text-neutral-950 lg:text-8xl">
        404
      </p>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl">
        {t("error.not-found-title")}
      </h1>
      <p className="mt-3 text-base text-neutral-600">{t("error.not-found")}</p>
      <Button
        variant="default"
        size="xl"
        className="mt-8"
        onClick={() => navigate("/")}
      >
        {t("error.back-home")}
      </Button>
    </div>
  );
}
