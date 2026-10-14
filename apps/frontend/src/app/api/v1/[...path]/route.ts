import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:4000";

async function handler(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const pathStr = path.join("/");
  const url = `${BACKEND_URL}/${pathStr}${req.nextUrl.search}`;

  const cookies = req.headers.get("cookie") ?? "";
  const body = ["GET", "HEAD"].includes(req.method) ? undefined : await req.text();

  let res = await fetch(url, {
    method: req.method,
    headers: {
      "content-type": req.headers.get("content-type") ?? "application/json",
      cookie: cookies,
    },
    body,
    cache: "no-store",
  });

  // If it's a 401 and not related to auth -> refresh
  if (res.status === 401 && !pathStr.startsWith("auth/")) {
    const refreshRes = await fetch(`${BACKEND_URL}/auth/refresh`, {
      method: "POST",
      headers: { cookie: cookies },
      cache: "no-store",
    });

    if (refreshRes.ok) {
      const newCookies = refreshRes.headers.getSetCookie();
      const retryRes = await fetch(url, {
        method: req.method,
        headers: {
          "content-type": req.headers.get("content-type") ?? "application/json",
          cookie: newCookies.join("; "),
        },
        body,
        cache: "no-store",
      });

      const out = new NextResponse(retryRes.body, {
        status: retryRes.status,
        headers: retryRes.headers,
      });
      newCookies.forEach((c) => out.headers.append("set-cookie", c));
      return out;
    }
  }

  return new NextResponse(res.body, {
    status: res.status,
    headers: res.headers,
  });
}

export const GET = handler;
export const POST = handler;
export const PATCH = handler;
export const DELETE = handler;
export const PUT = handler;
