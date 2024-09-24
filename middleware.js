import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define public routes using createRouteMatcher
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',  // Allows access to the sign-in route and its variations
  '/sign-up(.*)',  // Allows access to the sign-up route and its variations
  '/api/stores/:path*', // Allows access to any route starting with '/api/stores/'
]);

/**
 * Clerk middleware to handle authentication for non-public routes.
 * 
 * The middleware uses Clerk's authentication to protect certain routes based on 
 * whether the route is public or private. Public routes can be accessed without 
 * authentication, while private routes require user authentication.
 * 
 * - For public routes: Authentication is bypassed.
 * - For private routes: Clerk's `auth().protect()` is invoked to enforce authentication.
 */
export default clerkMiddleware((auth, request) => {
  // If the route is not public, enforce authentication
  if (!isPublicRoute(request)) {
    auth().protect(); // Clerk's authentication mechanism to protect private routes
  }
});


// Configuration object for route matching
export const config = {
  matcher: [
    /**
     * Matcher to skip Next.js internals and static files.
     * 
     * This regular expression excludes requests to Next.js internal assets and 
     * static files like HTML, CSS, JavaScript, images, fonts, etc. These files 
     * don't require middleware execution.
     */
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    
    // Always apply the middleware for API routes
    '/(api|trpc)(.*)',
  ],
}