import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./app/actions/login";

export function middleware(request: NextRequest) {
	console.log("middleware");
	const token = request.cookies.get("token"); // Get JWT from cookies
	console.log(token);

	if (!token) {
		return NextResponse.redirect(new URL("/login", request.url)); // Redirect if no token exists
	}

	try {
		// Verify token
		const decoded = verifyToken(token.value)
    if(!decoded){
			throw new Error("Invalid token");
		}
		return NextResponse.next(); // Proceed if valid token
	} catch (error) {
		console.error("Invalid token", error);
		return NextResponse.redirect(new URL("/login", request.url)); // Redirect if token is invalid
	}
}

export const config = {
  matcher: '/manage-members/:path*',
}