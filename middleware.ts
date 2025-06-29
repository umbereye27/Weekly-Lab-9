import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Define public routes
  const isPublicRoute = ['/', '/login', '/register'].includes(pathname)

  // Get the session token from cookies
  const sessionToken =
    request.cookies.get('next-auth.session-token')?.value ||
    request.cookies.get('__Secure-next-auth.session-token')?.value

  // If not authenticated and not on a public route, redirect to login
  if (!sessionToken && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // If authenticated and on login/register, redirect to dashboard
  if (sessionToken && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Allow request to proceed
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
