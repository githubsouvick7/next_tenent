import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const subdomain = host.split('.')[0];

  const isRootDomain = ['localhost', '127', '0', "10.6.4.122"].some((part) =>
    host.includes(part)
  );

  // Don’t rewrite root domain
  if (isRootDomain || subdomain === 'www') return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/dashboard${url.pathname}`; // e.g., /dashboard or /dashboard/settings
  url.searchParams.set('tenant', subdomain);

  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
