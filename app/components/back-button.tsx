import { useTranslate } from "@app/i18n";
import { Button, cn, Icon } from "@library";
import { useLocation, useNavigate } from "react-router";

export function BackButton() {
  const t = useTranslate();
  const location = useLocation();
  const navigate = useNavigate();
  const isVisible = location.pathname !== "/";

  return (
    <div
      aria-hidden={!isVisible}
      className={cn(
        "overflow-hidden transition-[width,opacity,transform] duration-300 ease-out motion-reduce:transition-none",
        isVisible
          ? "w-9 translate-x-0 opacity-100"
          : "w-0 -translate-x-3 opacity-0",
      )}
    >
      <Button
        onClick={() => navigate(-1)}
        size="icon"
        tabIndex={isVisible ? 0 : -1}
        type="button"
        variant="ghost"
      >
        <Icon icon="arrow-left" size="lg" />
        <span className="sr-only">{t("header.back")}</span>
      </Button>
    </div>
  );
}
