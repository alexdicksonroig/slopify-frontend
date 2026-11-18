import { PageTitle } from "@app/components/page-title";
import { useTranslate } from "@app/i18n";
import { Button } from "@library";
import { useNavigate } from "react-router";

export default function NotFound() {
  const t = useTranslate();
  const navigate = useNavigate();

  return (
    <div className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center p-page-gap text-center">
      <p className="text-7xl font-bold tracking-[-0.05em] text-neutral-950 lg:text-8xl">
        404
      </p>
      <PageTitle className="mt-4">{t("error.not-found-title")}</PageTitle>
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
