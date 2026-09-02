import { useTranslate } from "@app/i18n";
import { Button, Icon } from "@library";
import { useLocation, useNavigate } from "react-router";

export function BackButton() {
  const t = useTranslate();
  const location = useLocation();
  const navigate = useNavigate();
  const isVisible = location.pathname !== "/";

  return (
    <div
      aria-hidden={!isVisible}
      className={`back-button ${isVisible ? "back-button--visible" : ""}`}
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
