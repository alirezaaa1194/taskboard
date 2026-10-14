import { appApis } from "@/data/api";

const API_BASE = "/api/v1";

const AUTH_ENDPOINTS: string[] = [appApis.auth.login, appApis.auth.refresh, appApis.auth.logout];

export interface ApiError {
  status: number;
  message: string;
  body: unknown;
  isAuthError: boolean;
}

interface ClientCallOptions {
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  body?: unknown;
  query?: Record<string, string | number | undefined>;
  headers?: Record<string, string>;
}

export async function ClientCall<T>(path: string, options: ClientCallOptions = {}): Promise<T> {
  const { method = "GET", body, query, headers } = options;

  const search = query
    ? "?" +
      new URLSearchParams(
        Object.entries(query)
          .filter(([, v]) => v !== undefined && v !== null)
          .map(([k, v]) => [k, String(v)]),
      ).toString()
    : "";

  const res = await fetch(`${API_BASE}${path}${search}`, {
    method,
    credentials: "include",
    headers: {
      "content-type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const isAuthEndpoint = AUTH_ENDPOINTS.some((p) => path.startsWith(p));
    const error: ApiError = {
      status: res.status,
      message: (data as any)?.message ?? "خطای ناشناخته",
      body: data,
      isAuthError: res.status === 401 && !isAuthEndpoint,
    };
    throw error;
  }

  return data as T;
}
