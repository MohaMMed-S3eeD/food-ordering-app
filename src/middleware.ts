import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { withAuth } from 'next-auth/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { Routes, UserRole } from './constants/enums';

const intlMiddleware = createMiddleware(routing);

export default withAuth(
  async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;
    //* extract the locale from pathname
    const localeMatch = pathname.match(/^\/([a-z]{2})(\/.*)?$/);
    const currentLocale = localeMatch ? localeMatch[1] : 'en';

    const isAuth = await getToken({ req });

    const isAuthPage = pathname.startsWith(`/${currentLocale}/${Routes.AUTH}`);
    const protectedRoutes = [Routes.PROFILE, Routes.ADMIN];
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(`/${currentLocale}/${route}`));

    //* if user is not authenticated and the route is protected, redirect to auth page
    if (!isAuth && isProtectedRoute) {
      return NextResponse.redirect(new URL(`/${currentLocale}/${Routes.AUTH}/signin`, req.url));
    }
    //* if user is authenticated and the route is auth page, redirect to profile page
    if (isAuth && isAuthPage) {
      const role = isAuth.role;
      if (role === UserRole.ADMIN) {
        return NextResponse.redirect(new URL(`/${currentLocale}/${Routes.ADMIN}`, req.url));
      } else {
        return NextResponse.redirect(new URL(`/${currentLocale}/${Routes.PROFILE}`, req.url));
      }
    }
    if (isAuth && pathname.startsWith(`/${currentLocale}/${Routes.PROFILE}`)) {
      const role = isAuth.role;
      if (role === UserRole.ADMIN) {
        return NextResponse.redirect(new URL(`/${currentLocale}/${Routes.ADMIN}`, req.url));
      }
      // مرر التحكم لـ intlMiddleware للتعامل مع تغيير اللغة
      return intlMiddleware(req);
    }
    //* Admin route protection
    if (isAuth && pathname.startsWith(`/${currentLocale}/${Routes.ADMIN}`)) {
      const role = isAuth.role;
      if (role !== UserRole.ADMIN) {
        return NextResponse.redirect(new URL(`/${currentLocale}/${Routes.PROFILE}`, req.url));
      }
      // مرر التحكم لـ intlMiddleware للتعامل مع تغيير اللغة
      return intlMiddleware(req);
    }

    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized() {
        return true;
      },
    },
  }
);

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`  
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};