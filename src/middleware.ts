import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/dashboard', '/directory', '/admin'];
const authRoute = '/login';

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get('auth_phone');
  const { pathname } = request.nextUrl;

  if (!cookie && protectedRoutes.includes(pathname)) {
    const absoluteURL = new URL(authRoute, request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  if (cookie && pathname === authRoute) {
    const absoluteURL = new URL('/dashboard', request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/directory', '/admin', '/login'],
};
