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

    const response = await fetch(new URL("products", apiUrl));
    if (!response.ok) {
      throw new Error(
        `Unable to load products for SSG: ${response.status} ${response.statusText}`,
      );
    }
    const products = (await response.json()) as { id: number }[];

    return [...getStaticPaths(), ...products.map(({ id }) => `/product/${id}`)];
  },
} satisfies Config;
