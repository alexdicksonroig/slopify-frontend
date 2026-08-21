export type ProductOptionValue = {
  id: number;
  label: string;
};

export type ProductOption = {
  id: number;
  label: string;
  possibleValues: ProductOptionValue[];
};

export type VariantListItem = {
  id: number;
  productId: number;
  unitAmount: number | null;
  currency: string | null;
  thumbnailUrl: string | null;
};

export type Variant = {
  id: number;
  productId: number;
  unitAmount: number | null;
  currency: string | null;
  thumbnailUrl: string | null;
  selections: Array<{
    option: ProductOption;
    value: ProductOptionValue;
  }>;
};
