import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@/utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request);

  // Refresh session if expired - applies to all routes
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // For protected routes - redirect to login if no session
  const isAuthRoute = request.nextUrl.pathname.startsWith('/auth');
  const isProtectedRoute = 
    request.nextUrl.pathname.startsWith('/dashboard') ||
    request.nextUrl.pathname.startsWith('/account') ||
    request.nextUrl.pathname.startsWith('/agents/create');

  // If on protected route and no session, redirect to login
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // If on auth route and has session, redirect to dashboard
  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return response;
}

export const config = {
  matcher: [
    // Protect these routes
    '/dashboard/:path*',
    '/account/:path*',
    '/agents/create',
    // Also run middleware on auth routes for redirects
    '/auth/:path*',
  ],
};