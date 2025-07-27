import { type NextRequest, NextResponse } from "next/server"
import { getUserDocuments, uploadUserDocument } from "@/lib/dashboard"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const documents = await getUserDocuments(userId)
    return NextResponse.json(documents)
  } catch (error: any) {
    console.error("Documents API error:", error)
    return NextResponse.json({ error: "Failed to fetch documents" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const document = await uploadUserDocument(body)
    return NextResponse.json(document)
  } catch (error: any) {
    console.error("Document upload API error:", error)
    return NextResponse.json({ error: "Failed to upload document" }, { status: 500 })
  }
}
