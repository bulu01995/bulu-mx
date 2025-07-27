import { NextResponse } from "next/server"
import { S3Client, ListBucketsCommand, HeadBucketCommand } from "@aws-sdk/client-s3"

const s3Client = new S3Client({
  endpoint: "https://mfjylempogdobqfdhwvt.supabase.co/storage/v1/s3",
  region: "ap-south-1",
  credentials: {
    accessKeyId: "3953e7632c4a54a91ca41e3dc91a3262",
    secretAccessKey: "4652fc06d464eaf6bed581c2872284c238e60c2b3d925c069432b3996c24dadf",
  },
  forcePathStyle: true,
})

export async function GET() {
  try {
    // Test 1: List buckets to verify connection
    console.log("Testing S3 connection...")

    const listBucketsCommand = new ListBucketsCommand({})
    const bucketsResponse = await s3Client.send(listBucketsCommand)

    console.log("Buckets found:", bucketsResponse.Buckets?.length || 0)

    // Test 2: Check if uploads bucket exists
    let bucketExists = false
    try {
      const headBucketCommand = new HeadBucketCommand({ Bucket: "uploads" })
      await s3Client.send(headBucketCommand)
      bucketExists = true
      console.log("Uploads bucket exists")
    } catch (error) {
      console.log("Uploads bucket does not exist or no access")
    }

    return NextResponse.json({
      success: true,
      message: "S3 connection successful!",
      details: {
        endpoint: "https://mfjylempogdobqfdhwvt.supabase.co/storage/v1/s3",
        region: "ap-south-1",
        bucketsFound: bucketsResponse.Buckets?.length || 0,
        bucketNames: bucketsResponse.Buckets?.map((b) => b.Name) || [],
        uploadsBucketExists: bucketExists,
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error: any) {
    console.error("S3 connection test failed:", error)

    return NextResponse.json({
      success: false,
      message: `S3 connection failed: ${error.message}`,
      details: {
        error: error.message,
        code: error.code || "UNKNOWN",
        endpoint: "https://mfjylempogdobqfdhwvt.supabase.co/storage/v1/s3",
        timestamp: new Date().toISOString(),
      },
    })
  }
}
