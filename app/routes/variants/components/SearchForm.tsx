import { useTranslate } from "@app/i18n";
import { Debounce, Input } from "@library";
import { useMemo } from "react";
import { Form, useSearchParams, useSubmit } from "react-router";

type SearchFormProps = {
  onClose: () => void;
};

export function SearchForm({ onClose }: SearchFormProps) {
  const t = useTranslate();
  const submit = useSubmit();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const preservedParams = [...searchParams].filter(([key]) => key !== "q");
  const search = useMemo(
    () =>
      Debounce((input: HTMLInputElement) => {
        if (input.value.length > 0 && input.value.length < 3) return;
        submit(input.form, { replace: true });
      }, 400),
    [submit],
  );

  return (
    <Form
      method="get"
      action="/"
      role="search"
      onSubmit={() =>
        document.activeElement instanceof HTMLElement &&
        document.activeElement.blur()
      }
    >
      {preservedParams.map(([key, value]) => (
        <input key={key} type="hidden" name={key} value={value} />
      ))}
      <Input
        type="search"
        name="q"
        defaultValue={query}
        onChange={(event) => search(event.currentTarget)}
        onKeyDown={(event) => event.key === "Escape" && onClose()}
        autoFocus
        maxLength={100}
        placeholder={`${t("header.search")}...`}
        aria-label={t("header.search")}
        className="h-auto border-0 pl-0 text-lg lg:text-2xl"
      />
    </Form>
  );
}
