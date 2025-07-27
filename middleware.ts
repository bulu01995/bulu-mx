import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if accessing admin routes (but not the admin-access page or API routes)
  if (pathname.startsWith("/admin") && pathname !== "/admin-access" && !pathname.startsWith("/api/")) {
    // Check for admin access cookie
    const adminAccess = request.cookies.get("admin_access")

    if (!adminAccess || adminAccess.value !== "granted") {
      // Redirect to admin access page
      return NextResponse.redirect(new URL("/admin-access", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
