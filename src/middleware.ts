import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/AuthService";


const authRoute = ['/login', '/register'];
const roleBasedPrivateRotus = {
    user: [/^\/user/, /^\/create-shop/],
    admin: [/^\/admin/]
};

export const middleware = async (request: NextRequest) => {
    const { pathname } = request.nextUrl;
    const userInfo = await getCurrentUser(); 

    if (!userInfo) {
        if (authRoute.includes(pathname)) {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(new URL(`http://localhost:3000/login?redirectPath=${pathname}`))
        }
    };

    if (userInfo?.role && roleBasedPrivateRotus[userInfo?.role]) {
        const routes = roleBasedPrivateRotus[userInfo?.role];
        if (routes.some(route => pathname.match(route))) {
            return NextResponse.next();
        };
    };

    return NextResponse.redirect(new URL('/', request.url))
};


export const config = {
    matcher: [
        // '/login',
        '/create-shop',
        '/admin',
        '/admin/:page',
        '/user',
        '/user/:page'
    ]
}