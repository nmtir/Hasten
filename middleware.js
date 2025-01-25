// middleware.js or middleware.ts
import { NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { jwtVerify } from "jose";

const defaultLocale = "en";
const locales = ["bn", "en", "ar"];

// Define your supported locales and default locale
const publicRoutes = [
  "/en/auth/login",
  "/en/auth/create-password",
  "/en/auth/register",
  "/en/auth/forgot", // Add any other public routes here
];

// Function to determine if the pathname is a public route
function isPublicRoute(pathname) {
  return publicRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

// Function to get the preferred locale
function getLocale(request) {
  const acceptLanguage = request.headers.get("accept-language") ?? undefined;
  const headers = { "accept-language": acceptLanguage };
  const languages = new Negotiator({ headers });

  return match(languages, locales, defaultLocale);
}

// Function to verify JWT using jose
async function verifyToken(token) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    console.log("Token verification failed:", error);
    return null;
  }
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Attempt to retrieve the token from cookies
  const token = request.cookies.get("token")?.value || null;

  let isAuthenticated = false;
  let decodedToken = null;

  if (token) {
    decodedToken = await verifyToken(token);
    if (decodedToken) {
      isAuthenticated = true;
    }
  }
  // Locale handling
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }

  // If the user is authenticated and is trying to access a public route, redirect them to the categories
  if (isAuthenticated && isPublicRoute(pathname)) {
    return NextResponse.redirect(new URL("/en/categories", request.url));
  }

  // If the request is for a public route and the user is not authenticated, allow the request to proceed
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // JWT Verification for protected routes
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/en/auth/login", request.url));
  }
  // If everything is fine, proceed with the request
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Apply middleware to all routes except the ones defined in publicRoutes and static assets
    "/((?!api|assets|docs|.*\\..*|_next|login|signup|public).*)",
  ],
};
