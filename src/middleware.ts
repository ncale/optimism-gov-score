import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
	const res = NextResponse.next();

	res.headers.set('Access-Control-Allow-Origin', '*');
	res.headers.set('Access-Control-Allow-Methods', 'GET, POST');

	return res
}

export const config = {
	matcher: '/api/:path*'
}