import { useTranslate } from "@app/i18n";
import { Button, Debounce, Icon, Input } from "@library";
import { useMemo, useRef, useState } from "react";
import { Form, useSearchParams, useSubmit } from "react-router";

type SearchFormProps = {
  onClose: () => void;
};

export function SearchForm({ onClose }: SearchFormProps) {
  const t = useTranslate();
  const submit = useSubmit();
  const [searchParams] = useSearchParams();
  const preservedParams = [...searchParams].filter(([key]) => key !== "q");
  const [value, setValue] = useState(searchParams.get("q") ?? "");
  const inputRef = useRef<HTMLInputElement>(null);
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
      className="relative"
    >
      {preservedParams.map(([key, value]) => (
        <input key={key} type="hidden" name={key} value={value} />
      ))}
      <Input
        ref={inputRef}
        type="search"
        name="q"
        value={value}
        onChange={(event) => {
          setValue(event.currentTarget.value);
          search(event.currentTarget);
        }}
        onKeyDown={(event) => event.key === "Escape" && onClose()}
        autoFocus
        maxLength={100}
        placeholder={`${t("header.search")}...`}
        aria-label={t("header.search")}
        className="h-auto border-0 pr-10 pl-0 text-base lg:text-xl [&::-webkit-search-cancel-button]:appearance-none"
      />
      {value && (
        <Button
          type="button"
          onClick={() => {
            setValue("");
            inputRef.current?.focus();
            if (inputRef.current) search(inputRef.current);
          }}
          variant="ghost"
          size="icon"
          className="absolute top-1/2 right-0 -translate-y-1/2"
        >
          <Icon icon="x" size="sm" />
          <span className="sr-only">{t("header.clear-search")}</span>
        </Button>
      )}
    </Form>
  );
}
