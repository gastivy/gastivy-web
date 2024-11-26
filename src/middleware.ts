import { NextRequest, NextResponse } from "next/server";

import { route } from "./constants/route";

export function middleware(request: NextRequest) {
  // Access Token
  const isAuthenticated = request.cookies.get("GSTID");

  const pathWithoutUnauthorized = ["/login", "/register"];

  if (
    !isAuthenticated &&
    !pathWithoutUnauthorized.includes(request.nextUrl.pathname)
  ) {
    return NextResponse.redirect(new URL(route.login.path, request.url));
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
  matcher: ["/((?!_next|api|favicon.ico).*)"], // Applies to all paths except _next, api, and favicon
};
