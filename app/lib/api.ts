const baseOrigin = "http://localhost:8000";

export const get = async (
	path: string,
	params?: Record<string, string>,
	onError = console.error,
) => {
	const url = new URL(baseOrigin);
	url.pathname = path;

	if (params) {
		url.search = new URLSearchParams(params).toString();
	}

	return fetch(url, { method: "GET" })
		.then((result) => {
			if (!result.ok) {
				throw new Error(
					`${result.status} GET request failed: ${
						result.statusText
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
					`${result.status} POST request failed: ${
						result.statusText
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
