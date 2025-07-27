import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

const ADMIN_ACCESS_KEY = "@AJAYkn8085123"

export async function POST(request: NextRequest) {
  try {
    const { key } = await request.json()

    if (!key) {
      return NextResponse.json({ success: false, error: "Access key is required" }, { status: 400 })
    }

    if (key === ADMIN_ACCESS_KEY) {
      // Set secure cookie for admin access
      const response = NextResponse.json({ success: true })

      response.cookies.set("admin_access", "granted", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 24 hours
        path: "/",
      })

      return response
    } else {
      return NextResponse.json({ success: false, error: "Invalid access key" }, { status: 401 })
    }
  } catch (error) {
    console.error("Admin verification error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const cookieStore = cookies()
    const adminAccess = cookieStore.get("admin_access")

    if (adminAccess && adminAccess.value === "granted") {
      return NextResponse.json({ success: true, hasAccess: true })
    } else {
      return NextResponse.json({ success: false, hasAccess: false })
    }
  } catch (error) {
    console.error("Admin access check error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
