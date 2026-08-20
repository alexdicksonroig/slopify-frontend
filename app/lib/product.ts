export type ProductOptionValue = {
  id: number;
  label: string;
};

export type ProductOption = {
  id: number;
  label: string;
  possibleValues: ProductOptionValue[];
};

export type ProductVariant = {
  id: number;
  productId: number;
  unitAmount: number;
  currency: string;
  selections: Array<{
    option: ProductOption;
    value: ProductOptionValue;
  }>;
};
