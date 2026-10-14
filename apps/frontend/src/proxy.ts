import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:4000";
const PUBLIC_ROUTES = ["/login"];
const OWNER_ONLY_ROUTES = ["/users"];

async function verifyAccessToken(token: string): Promise<boolean> {
  try {
    const res = await fetch(`${BACKEND_URL}/auth/me`, {
      headers: { cookie: `access_token=${token}` },
      cache: "no-store",
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function getRole(token: string): Promise<string | null> {
  try {
    const res = await fetch(`${BACKEND_URL}/auth/me`, {
      headers: { cookie: `access_token=${token}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.role ?? null;
  } catch {
    return null;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublic = PUBLIC_ROUTES.some((r) => pathname.startsWith(r));
  const isOwnerOnly = OWNER_ONLY_ROUTES.some((r) => pathname.startsWith(r));

  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;

  // Public page
  if (isPublic) {
    if (accessToken && (await verifyAccessToken(accessToken))) {
      return NextResponse.redirect(new URL("/tasks", request.url));
    }
    return NextResponse.next();
  }

  // Protected page
  if (!accessToken && !refreshToken) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("returnTo", pathname);
    return NextResponse.redirect(url);
  }

  // Valid access_token?
  if (accessToken && (await verifyAccessToken(accessToken))) {
    // Owner access check
    if (isOwnerOnly) {
      const role = await getRole(accessToken);
      if (role !== "owner") {
        return NextResponse.redirect(new URL("/tasks", request.url));
      }
    }
    return NextResponse.next();
  }

  // refresh
  if (refreshToken) {
    try {
      const refreshRes = await fetch(`${BACKEND_URL}/auth/refresh`, {
        method: "POST",
        headers: { cookie: `refresh_token=${refreshToken}` },
        cache: "no-store",
      });

      if (refreshRes.ok) {
        const setCookies = refreshRes.headers.getSetCookie();
        const response = NextResponse.next();
        setCookies.forEach((c) => response.headers.append("set-cookie", c));

        // Check the role again after the refresh.
        const newAccessToken = setCookies
          .find((c) => c.startsWith("access_token="))
          ?.split(";")[0]
          ?.split("=")[1];

        if (newAccessToken && isOwnerOnly) {
          const role = await getRole(newAccessToken);
          if (role !== "owner") {
            return NextResponse.redirect(new URL("/tasks", request.url));
          }
        }

        return response;
      }
    } catch {
      // fall through
    }
  }

  // refresh fail → login
  const url = request.nextUrl.clone();
  url.pathname = "/login";
  url.searchParams.set("returnTo", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
