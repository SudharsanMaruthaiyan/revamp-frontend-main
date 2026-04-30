import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

/** Protects routes: requires valid token for non-auth pages. API requests from client use axiosInstance which attaches token via /api/auth/get-token. */
export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const isAuthenticated = !!token;
  const path = req.nextUrl.pathname;

  const isAuthPage =
    path === "/" ||
    path === "/login" ||
    path === "/sign-up" ||
    path.startsWith("/forgot-password") ||
    path.startsWith("/reset-password");

  const isApiAuthRoute = path.startsWith("/api/auth");

  //allow auth api rotues
  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  //restrict unauthenticated access
  if (!isAuthenticated && !isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  //redirect logged in users to dashboard
  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/settings/:path*",
  ],
};