import { type NextRequest, NextResponse } from "next/server"

const ADMIN_ACCESS_KEY = "@AJAYkn8085123"

export async function POST(request: NextRequest) {
  try {
    const { key } = await request.json()

    if (key === ADMIN_ACCESS_KEY) {
      // Set a secure cookie to remember admin access
      const response = NextResponse.json({ success: true })
      response.cookies.set("admin_access", "granted", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 24 hours
      })
      return response
    }

    return NextResponse.json({ success: false, error: "Invalid access key" }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 })
  }
}

export async function GET(request: NextRequest) {
  const adminAccess = request.cookies.get("admin_access")

  if (adminAccess?.value === "granted") {
    return NextResponse.json({ hasAccess: true })
  }

  return NextResponse.json({ hasAccess: false })
}
