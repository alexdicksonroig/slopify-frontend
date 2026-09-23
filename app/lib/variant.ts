import type { LocalizedText } from "./localized-text";

export type ProductOptionValue = {
  id: number;
  label: LocalizedText;
};

export type ProductOption = {
  id: number;
  optionId: string;
  label: LocalizedText;
  possibleValues: ProductOptionValue[];
};

export type VariantListItem = {
  id: number;
  productId: number;
  unitAmount: number | null;
  currency: string | null;
  stock: number;
  thumbnailUrl: string | null;
  coverUrl: string | null;
};

export type Variant = {
  id: number;
  productId: number;
  unitAmount: number | null;
  currency: string | null;
  stock: number;
  thumbnailUrl: string | null;
  coverUrl: string | null;
  selections: Array<{
    option: ProductOption;
    value: ProductOptionValue;
  }>;
};
