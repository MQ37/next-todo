import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getUserSession } from './auth';
 
export async function middleware(request: NextRequest) {

    const urlPath = request.nextUrl.pathname;
    console.log("middleware", urlPath);
    
    const loginRequiredPaths = [
        "/todo"
    ];
    const loginRedirectPaths = [
        "/login",
        "/register"
    ];

    const user = await getUserSession();
    const isLoggedIn = !!user;
    console.log("isLoggedIn", isLoggedIn);

    const isLoginRequired = loginRequiredPaths.some(path => urlPath.startsWith(path));
    if (isLoginRequired && !isLoggedIn) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    const isLoginRedirect = loginRedirectPaths.some(path => urlPath.startsWith(path));
    if (isLoginRedirect && isLoggedIn) {
        return NextResponse.redirect(new URL('/todo', request.url))
    }

    return NextResponse.next()
}

export const config = {
    // exlude next stuff and images
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|.*\\.ico$).*)'],
}

