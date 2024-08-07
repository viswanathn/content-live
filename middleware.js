import { NextResponse } from 'next/server';

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const locales = ['en', 'fr', 'de', 'zn-CH']; // List of supported locales

  // Only process API routes
  if (pathname.startsWith('/api')) {
    // Check if the pathname starts with a locale
    const locale = locales.find((loc) => pathname.startsWith(`/${loc}/api`));

    if (locale) {
      // Rewrite the URL to strip the locale prefix
      const newPathname = pathname.replace(`/${locale}`, '');
      const url = req.nextUrl.clone();
      url.pathname = newPathname;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}