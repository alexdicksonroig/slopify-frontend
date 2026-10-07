import type { Language } from "@app/i18n";

type StoreConfig = {
  name: string;
  logoUrl: string;
  defaultLanguage: Language;
  locale: string;
  currency: string;
  freeShippingThresholdInCents: number;
  ageVerification: boolean;
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  socialLinks: { label: string; url: string }[];
};

export const storeConfig: StoreConfig = {
  name: "Roig Parals",
  logoUrl: "/assets/roig-parals-logo-dark.png",
  defaultLanguage: "ca-ES",
  locale: "es-ES",
  currency: "EUR",
  freeShippingThresholdInCents: 3000,
  ageVerification: true,
  contact: {
    email: "info@example.com",
    phone: "+34 91 123 4567",
    address: "Calle Gran Vía 28, 28013 Madrid, Spain",
  },
  socialLinks: [
    { label: "Facebook", url: "https://www.facebook.com" },
    { label: "Twitter", url: "https://x.com" },
    { label: "Instagram", url: "https://www.instagram.com" },
  ],
};
