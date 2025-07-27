import { type NextRequest, NextResponse } from "next/server"
import { getDashboardStats } from "@/lib/dashboard"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const stats = await getDashboardStats(userId)
    return NextResponse.json(stats)
  } catch (error: any) {
    console.error("Dashboard stats API error:", error)
    return NextResponse.json({ error: "Failed to fetch dashboard stats" }, { status: 500 })
  }
}
