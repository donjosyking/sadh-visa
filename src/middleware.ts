import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "@/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  const isProtected =
    pathname.startsWith("/personnel") || pathname.startsWith("/admin");

  if (isProtected && !isLoggedIn) {
    const url = new URL("/connexion", req.nextUrl.origin);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith("/admin") && isLoggedIn) {
    const role = req.auth?.user?.role;
    if (role !== "ADMIN" && role !== "DIRECTION") {
      return NextResponse.redirect(new URL("/personnel", req.nextUrl.origin));
    }
  }
});

export const config = {
  matcher: ["/personnel/:path*", "/admin/:path*"],
};
