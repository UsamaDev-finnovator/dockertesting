import { NextResponse, NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const authToken = req.cookies.get("auth_token")?.value;
  const path = req.nextUrl.pathname;

  if (!authToken && path.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (authToken && (path.startsWith("/login") || path.startsWith("/signup"))) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const isDev = process.env.NODE_ENV !== "production";

  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' ${
    isDev ? "'unsafe-eval'" : ""
  } https: http:;
    style-src 'self' 'nonce-${nonce}' ${isDev ? "'unsafe-inline'" : ""};
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    worker-src 'none';
    upgrade-insecure-requests;
   connect-src 'self' http: ws: wss: http://108.181.189.211:8081;
  `;

  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, " ")
    .trim();

  const requestHeaders = new Headers(req.headers);
  if (req.headers.get("x-forwarded-proto")?.includes("https")) {
    requestHeaders.set("x-nonce", nonce);
    requestHeaders.set(
      "Content-Security-Policy",
      contentSecurityPolicyHeaderValue
    );
  }

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  return response;
}

export const config = {
  matcher: [
    {
      source: "/((?!api|_next/static|_next/image).*)",
    },
  ],
};
