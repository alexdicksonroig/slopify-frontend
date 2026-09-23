import type { LocalizedText } from "./localized-text";

export type Product = {
  id: number;
  name: string;
  description: LocalizedText | null;
};
