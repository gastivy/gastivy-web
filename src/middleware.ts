import { NextRequest, NextResponse } from "next/server";

import { route } from "./constants/route";

export function middleware(request: NextRequest) {
  // Access Token
  const pathWithoutUnauthorized = ["/login", "/register"];

  if (!pathWithoutUnauthorized.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL(route.login.path, request.url));
  }

  if (pathWithoutUnauthorized.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL(route.home.path, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/activity-app/:path*",
    "/finance-app/:path*",
    "/",
    "/login",
    "/register",
  ],
};
