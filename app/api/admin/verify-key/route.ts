import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

const ADMIN_ACCESS_KEY = "@AJAYkn8085123"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { key } = body

    if (!key) {
      return NextResponse.json({ success: false, message: "Access key is required" }, { status: 400 })
    }

    if (key === ADMIN_ACCESS_KEY) {
      // Set secure cookie for admin access
      const response = NextResponse.json({ success: true })

      response.cookies.set("admin_access", "granted", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 24 hours
        path: "/",
      })

      return response
    } else {
      return NextResponse.json({ success: false, message: "Invalid access key" }, { status: 401 })
    }
  } catch (error) {
    console.error("Admin key verification error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const cookieStore = cookies()
    const adminAccess = cookieStore.get("admin_access")

    if (adminAccess && adminAccess.value === "granted") {
      return NextResponse.json({ hasAccess: true })
    } else {
      return NextResponse.json({ hasAccess: false })
    }
  } catch (error) {
    console.error("Admin access check error:", error)
    return NextResponse.json({ hasAccess: false })
  }
}
