import { NextRequest, NextResponse } from "next/server";

import { KEY_ACCESS_TOKEN } from "./constants/cookies";
import { route } from "./constants/route";

export function middleware(request: NextRequest) {
  // Access Token
  const isAuthenticated = request.cookies.get(KEY_ACCESS_TOKEN);

  const pathWithoutUnauthorized = ["/login", "/register"];

  if (
    !isAuthenticated &&
    !pathWithoutUnauthorized.includes(request.nextUrl.pathname)
  ) {
    return NextResponse.redirect(new URL(route.register.path, request.url));
  }

  if (
    isAuthenticated &&
    pathWithoutUnauthorized.includes(request.nextUrl.pathname)
  ) {
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
