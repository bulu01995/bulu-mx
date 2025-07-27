import { type NextRequest, NextResponse } from "next/server"

const ADMIN_ACCESS_KEY = "@AJAYkn8085123"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { key } = body

    console.log("Received key verification request:", { key })

    if (!key) {
      return NextResponse.json({ success: false, error: "Access key is required" }, { status: 400 })
    }

    if (key === ADMIN_ACCESS_KEY) {
      console.log("Key verified successfully")

      const response = NextResponse.json({ success: true, message: "Access granted" })

      // Set secure cookie for admin access
      response.cookies.set("admin_access", "granted", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 24 hours
        path: "/",
      })

      console.log("Cookie set successfully")
      return response
    } else {
      console.log("Invalid key provided:", key)
      return NextResponse.json({ success: false, error: "Invalid access key" }, { status: 401 })
    }
  } catch (error) {
    console.error("Admin verification error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const adminAccess = request.cookies.get("admin_access")
    console.log("Checking admin access cookie:", adminAccess)

    if (adminAccess && adminAccess.value === "granted") {
      console.log("Admin access granted")
      return NextResponse.json({ success: true, hasAccess: true })
    } else {
      console.log("No admin access")
      return NextResponse.json({ success: false, hasAccess: false })
    }
  } catch (error) {
    console.error("Admin access check error:", error)
    return NextResponse.json({ success: false, hasAccess: false })
  }
}
