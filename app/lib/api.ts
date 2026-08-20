// Last commit not reviewed
const env = (
  import.meta as unknown as {
    env: { VITE_API_URL: string };
  }
).env;
const baseOrigin = env.VITE_API_URL;

async function request<T>(
  method: "GET" | "POST",
  path: string,
  params?: Record<string, string>,
  body?: unknown,
): Promise<T> {
  const url = new URL(path, baseOrigin);
  if (params) url.search = new URLSearchParams(params).toString();

  const response = await fetch(url, {
    method,
    headers:
      body === undefined ? undefined : { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as {
      error?: string;
    } | null;
    throw new Error(
      payload?.error ??
        `${response.status} ${method} request failed: ${response.statusText}. URL: ${url.toString()}`,
    );
  }

  return (await response.json()) as T;
}

export const get = <T = unknown>(
  path: string,
  params?: Record<string, string>,
) => request<T>("GET", path, params);

export const post = <T = unknown>(path: string, body?: unknown) =>
  request<T>("POST", path, undefined, body);
