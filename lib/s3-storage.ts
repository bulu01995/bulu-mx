import { S3Client, PutObjectCommand, DeleteObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3"

// S3 Configuration using your Supabase S3 endpoint
const s3Client = new S3Client({
  endpoint: "https://mfjylempogdobqfdhwvt.supabase.co/storage/v1/s3",
  region: "ap-south-1",
  credentials: {
    accessKeyId: "3953e7632c4a54a91ca41e3dc91a3262",
    secretAccessKey: "4652fc06d464eaf6bed581c2872284c238e60c2b3d925c069432b3996c24dadf",
  },
  forcePathStyle: true,
})

const BUCKET_NAME = "bulu-storage"

export interface FileUploadResult {
  success: boolean
  fileUrl?: string
  fileName?: string
  error?: string
}

export interface StorageFile {
  key: string
  size: number
  lastModified: Date
  url: string
}

// Upload file to S3
export async function uploadFileToS3(file: File, folder = "general"): Promise<FileUploadResult> {
  try {
    const timestamp = Date.now()
    const fileName = `${folder}/${timestamp}-${file.name}`

    const uploadCommand = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: file,
      ContentType: file.type,
      Metadata: {
        originalName: file.name,
        uploadedAt: new Date().toISOString(),
      },
    })

    await s3Client.send(uploadCommand)

    const fileUrl = `https://mfjylempogdobqfdhwvt.supabase.co/storage/v1/object/public/${BUCKET_NAME}/${fileName}`

    return {
      success: true,
      fileUrl,
      fileName,
    }
  } catch (error) {
    console.error("S3 upload error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Upload failed",
    }
  }
}

// Delete file from S3
export async function deleteFileFromS3(fileName: string): Promise<boolean> {
  try {
    const deleteCommand = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileName,
    })

    await s3Client.send(deleteCommand)
    return true
  } catch (error) {
    console.error("S3 delete error:", error)
    return false
  }
}

// List files in S3
export async function listFilesFromS3(folder?: string): Promise<StorageFile[]> {
  try {
    const listCommand = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      Prefix: folder ? `${folder}/` : undefined,
      MaxKeys: 100,
    })

    const response = await s3Client.send(listCommand)

    if (!response.Contents) return []

    return response.Contents.map((item) => ({
      key: item.Key || "",
      size: item.Size || 0,
      lastModified: item.LastModified || new Date(),
      url: `https://mfjylempogdobqfdhwvt.supabase.co/storage/v1/object/public/${BUCKET_NAME}/${item.Key}`,
    }))
  } catch (error) {
    console.error("S3 list error:", error)
    return []
  }
}

// Get file categories
export function getFileCategory(fileName: string): string {
  const extension = fileName.split(".").pop()?.toLowerCase()

  if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(extension || "")) {
    return "images"
  }

  if (["mp4", "avi", "mov", "wmv", "flv", "webm"].includes(extension || "")) {
    return "videos"
  }

  if (["pdf", "doc", "docx", "txt", "rtf"].includes(extension || "")) {
    return "documents"
  }

  return "general"
}

// Validate file type and size
export function validateFile(file: File): { valid: boolean; error?: string } {
  const maxSize = 50 * 1024 * 1024 // 50MB
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
    "video/mp4",
    "video/avi",
    "video/mov",
    "video/wmv",
    "application/pdf",
    "text/plain",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ]

  if (file.size > maxSize) {
    return { valid: false, error: "File size must be less than 50MB" }
  }

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: "File type not supported" }
  }

  return { valid: true }
}
