import { NextResponse } from "next/server"

export async function POST() {
  try {
    const response = NextResponse.json({ success: true, message: "Logged out successfully" })

    // Clear the admin access cookie
    response.cookies.set("admin_access", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0, // Expire immediately
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json({ success: false, message: "Logout failed" }, { status: 500 })
  }
}
