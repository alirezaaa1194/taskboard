import { cookies } from "next/headers";
import { appApis } from "@/data/api";

const APP_URL = process.env.NEXT_PUBLIC_BASE_URL ?? process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

const AUTH_ENDPOINTS: string[] = [appApis.auth.login, appApis.auth.refresh, appApis.auth.logout];

export interface ApiError {
  status: number;
  message: string;
  body: unknown;
  isAuthError: boolean;
}

interface ServerCallOptions {
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  body?: unknown;
  query?: Record<string, string | number | undefined>;
}

export async function ServerCall<T>(path: string, options: ServerCallOptions = {}): Promise<T> {
  const { method = "GET", body, query } = options;
  const cookieStore = await cookies();

  const search = query
    ? "?" +
      new URLSearchParams(
        Object.entries(query)
          .filter(([, v]) => v !== undefined && v !== null)
          .map(([k, v]) => [k, String(v)]),
      ).toString()
    : "";

  const url = `${APP_URL}/api/v1${path}${search}`;

  const res = await fetch(url, {
    method,
    headers: {
      "content-type": "application/json",
      cookie: cookieStore.toString(),
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
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
