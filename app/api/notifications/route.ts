import { type NextRequest, NextResponse } from "next/server"
import { getUserNotifications, markNotificationAsRead, createNotification } from "@/lib/dashboard"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const notifications = await getUserNotifications(userId, limit)
    return NextResponse.json(notifications)
  } catch (error: any) {
    console.error("Notifications API error:", error)
    return NextResponse.json({ error: "Failed to fetch notifications" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, notificationId, ...notificationData } = body

    if (action === "mark_read" && notificationId) {
      const result = await markNotificationAsRead(notificationId)
      return NextResponse.json(result)
    }

    if (action === "create") {
      const result = await createNotification(notificationData)
      return NextResponse.json(result)
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  } catch (error: any) {
    console.error("Notifications API error:", error)
    return NextResponse.json({ error: "Failed to process notification request" }, { status: 500 })
  }
}
