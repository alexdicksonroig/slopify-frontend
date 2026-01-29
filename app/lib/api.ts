import fixtures from "@app/data/fixtures.json";

const baseOrigin = "https://slopify-backend-763213450884.us-east1.run.app/";

// Use environment variable to toggle mock data (saves GCP credits)
// Set VITE_USE_MOCK_DATA=true in .env to enable mock mode
const USE_MOCK_DATA = (import.meta as unknown as { env: Record<string, string> }).env.VITE_USE_MOCK_DATA === "true";

// Endpoints that have real backend implementations
const REAL_ENDPOINTS = ["products/"];

export const get = async (
  path: string,
  params?: Record<string, string>,
  onError = console.error,
) => {
  const isRealEndpoint = REAL_ENDPOINTS.some(ep => path === ep || path.startsWith(ep));

  if (USE_MOCK_DATA || !isRealEndpoint) {
    return handleMockGet(path);
  }

  const url = new URL(baseOrigin);
  url.pathname = path;

  if (params) {
    url.search = new URLSearchParams(params).toString();
  }

  return fetch(url, { method: "GET" })
    .then((result) => {
      if (!result.ok) {
        throw new Error(
          `${result.status} GET request failed: ${result.statusText
          }. URL: ${url.toString()}`,
          { cause: result },
        );
      }
      return result.json();
    })
    .catch(onError);
};

export const post = async (
  path: string,
  body?: Record<string, unknown>,
  onError = console.error,
) => {
  if (USE_MOCK_DATA) {
    return handleMockPost(path);
  }

  const url = new URL(baseOrigin);
  url.pathname = path;

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((result) => {
      if (!result.ok) {
        throw new Error(
          `${result.status} POST request failed: ${result.statusText
          }. URL: ${url.toString()}`,
          { cause: result },
        );
      }
      return result.json();
    })
    .catch((error) => {
      onError(error);
      return null;
    });
};

type FixtureKey = keyof typeof fixtures;

// Route mock GET requests to fixture data
function handleMockGet(path: string) {
  // Handle products/:id by looking up in products/ array
  if (path.startsWith("products/") && path !== "products/") {
    const id = parseInt(path.split("/")[1] ?? "0", 10);
    const products = fixtures["products/"] as { id: number }[];
    const product = products.find(p => p.id === id);
    return product ? { ...product, ...fixtures["product-detail"] } : null;
  }

  // Direct lookup
  if (path in fixtures) {
    return fixtures[path as FixtureKey];
  }

  console.warn(`Mock API: No fixture for GET "${path}"`);
  return null;
}

// Route mock POST requests
function handleMockPost(path: string) {
  if (path === "create-checkout-session") {
    console.warn("Mock mode: checkout session creation skipped");
    return null;
  }

  console.warn(`Mock API: No fixture for POST "${path}"`);
  return null;
}
