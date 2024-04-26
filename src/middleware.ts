import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/delegates", req.url));
  }
  const res = NextResponse.next();
  return res;
}

export const config = {
  matcher: ["/", "/api/:path*"],
};
