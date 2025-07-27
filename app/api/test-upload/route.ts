import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// ----------  ⚙️  Supabase admin client (server-side only) ----------
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

// All uploads go to this bucket
const BUCKET_NAME = "bulu-storage"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null
    const folder = (formData.get("folder") as string) || "uploads"

    if (!file) {
      return NextResponse.json({ success: false, message: "No file provided" })
    }

    // 1️⃣  Enforce 50 MB limit
    const MAX_SIZE = 50 * 1024 * 1024
    if (file.size > MAX_SIZE) {
      return NextResponse.json({
        success: false,
        message: "File too large (max 50 MB)",
      })
    }

    // 2️⃣  Make sure the bucket exists (create it if it doesn’t)
    const { data: bucketInfo } = await supabase.storage.getBucket(BUCKET_NAME)
    if (!bucketInfo) {
      await supabase.storage.createBucket(BUCKET_NAME, { public: true })
    }

    // 3️⃣  Build a unique file-name
    const timestamp = Date.now()
    const random = Math.random().toString(36).slice(2, 8)
    const extension = file.name.split(".").pop() ?? ""
    const path = `${folder}/${timestamp}-${random}.${extension}`

    // 4️⃣  Upload (upsert = overwrite if the name already exists)
    const { error: uploadError } = await supabase.storage.from(BUCKET_NAME).upload(path, file, {
      cacheControl: "3600",
      contentType: file.type,
      upsert: true,
    })

    if (uploadError) {
      throw uploadError
    }

    // 5️⃣  Build a public URL
    const publicUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/${path}`

    return NextResponse.json({
      success: true,
      message: "File uploaded successfully!",
      url: publicUrl,
      details: {
        bucket: BUCKET_NAME,
        path,
        size: file.size,
        type: file.type,
        uploadedAt: new Date().toISOString(),
      },
    })
  } catch (err: any) {
    console.error("Upload failed:", err)
    return NextResponse.json({
      success: false,
      message: `Upload failed: ${err?.message ?? "Unknown error"}`,
      details: err,
    })
  }
}
