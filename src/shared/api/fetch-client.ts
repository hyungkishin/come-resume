const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || '';

interface FetchOptions extends RequestInit {
  params?: Record<string, string>;
}

async function request<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { params, ...init } = options;

  let url = `${BASE_URL}${endpoint}`;
  if (params) {
    const searchParams = new URLSearchParams(params);
    url += `?${searchParams.toString()}`;
  }

  const res = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}

export const api = {
  get: <T>(url: string, options?: FetchOptions) =>
    request<T>(url, { ...options, method: 'GET' }),
  post: <T>(url: string, body: unknown, options?: FetchOptions) =>
    request<T>(url, { ...options, method: 'POST', body: JSON.stringify(body) }),
  patch: <T>(url: string, body: unknown, options?: FetchOptions) =>
    request<T>(url, { ...options, method: 'PATCH', body: JSON.stringify(body) }),
  delete: <T>(url: string, options?: FetchOptions) =>
    request<T>(url, { ...options, method: 'DELETE' }),
};
