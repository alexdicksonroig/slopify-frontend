import type { Config } from "@react-router/dev/config";
import { loadEnv } from "vite";

const env = loadEnv("production", process.cwd(), "");

export default {
  // Generate HTML and route data at build time; no runtime server is required.
  ssr: false,
  async prerender({ getStaticPaths }) {
    const apiUrl = process.env.VITE_API_URL ?? env.VITE_API_URL;
    if (!apiUrl) {
      throw new Error("VITE_API_URL is required to generate product pages");
    }

    const response = await fetch(new URL("variants", apiUrl));
    if (!response.ok) {
      throw new Error(
        `Unable to load variants for SSG: ${response.status} ${response.statusText}`,
      );
    }
    const variants = (await response.json()) as {
      id: number;
      productId: number;
    }[];

    return [
      ...getStaticPaths(),
      ...variants.map(({ id, productId }) => `/product/${productId}/${id}`),
    ];
  },
} satisfies Config;
