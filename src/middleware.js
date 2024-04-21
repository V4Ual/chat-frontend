import { NextResponse } from 'next/server'
import { handleGetCookie } from './utils';

// This function can be marked `async` if using `await` inside
export function middleware(request) {
    const token = request?.cookies?.get("_token")?.value;
    const isUserAuthenticated = !!token;

    const activePath = request?.nextUrl?.pathname;


    const beforeAuthRoutes = ["/", "/login", "/registration"];
    const nonAccessibleRoues = ["/*", "/login/", "/registration/"];
    const afterAuthRoutes = [
        "/",
        "/chat",
    ];


    if (nonAccessibleRoues.includes(activePath)) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (!isUserAuthenticated && afterAuthRoutes.includes(activePath)) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (isUserAuthenticated && beforeAuthRoutes.includes(activePath)) {
        return NextResponse.redirect(new URL("/chat", request.url));
    }

}


export const config = {
    matcher: [
        "/",
        "/login",
        "/registration",
        '/chat/:path'
    ]
}