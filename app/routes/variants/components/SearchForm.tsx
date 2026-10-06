import { useTranslate } from "@app/i18n";
import { Button, Icon, Input } from "@library";
import { Form, useSearchParams } from "react-router";

type SearchFormProps = {
  onClose: () => void;
};

export function SearchForm({ onClose }: SearchFormProps) {
  const t = useTranslate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const preservedParams = [...searchParams].filter(([key]) => key !== "q");

  return (
    <Form
      method="get"
      action="/"
      role="search"
      onSubmit={() =>
        document.activeElement instanceof HTMLElement &&
        document.activeElement.blur()
      }
      className="relative"
    >
      {preservedParams.map(([key, value]) => (
        <input key={key} type="hidden" name={key} value={value} />
      ))}
      <Input
        key={query}
        type="search"
        name="q"
        defaultValue={query}
        onKeyDown={(event) => event.key === "Escape" && onClose()}
        autoFocus
        maxLength={100}
        placeholder={`${t("header.search")}...`}
        aria-label={t("header.search")}
        className="h-auto border-0 pr-10 pl-0 text-lg lg:text-2xl [&::-webkit-search-cancel-button]:appearance-none"
      />
      <Button
        type="button"
        onClick={onClose}
        variant="ghost"
        size="icon"
        className="absolute top-1/2 right-0 -translate-y-1/2"
      >
        <Icon icon="x" size="sm" />
        <span className="sr-only">{t("header.close-search")}</span>
      </Button>
    </Form>
  );
}
