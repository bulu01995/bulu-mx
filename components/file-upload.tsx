"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, File, ImageIcon, Video, FileText, CheckCircle, AlertCircle, Trash2 } from "lucide-react"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
const BUCKET_NAME = "bulu-storage"

interface FileUploadProps {
  folder?: string
  multiple?: boolean
  acceptedTypes?: string[]
  maxSize?: number // in MB
  onUploadComplete?: (files: UploadedFile[]) => void
  onUploadError?: (error: string) => void
}

interface UploadedFile {
  name: string
  url: string
  key: string
  size: number
  type: string
  category: "image" | "video" | "document" | "other"
}

export default function FileUpload({
  folder = "uploads", // Changed from "general" to "uploads"
  multiple = false,
  acceptedTypes = ["image/*", "video/*", "application/pdf"],
  maxSize = 50,
  onUploadComplete,
  onUploadError,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    handleFiles(files)
  }

  const uploadFile = async (file: File): Promise<UploadedFile | null> => {
    try {
      // Generate unique filename
      const timestamp = Date.now()
      const random = Math.random().toString(36).slice(2, 8)
      const extension = file.name.split(".").pop() ?? ""
      const path = `${folder}/${timestamp}-${random}.${extension}`

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage.from(BUCKET_NAME).upload(path, file, {
        cacheControl: "3600",
        contentType: file.type,
        upsert: true,
      })

      if (uploadError) {
        throw uploadError
      }

      // Get public URL
      const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(path)

      return {
        name: file.name,
        url: data.publicUrl,
        key: path,
        size: file.size,
        type: file.type,
        category: getFileCategory(file.type),
      }
    } catch (error) {
      console.error("Upload error:", error)
      return null
    }
  }

  const handleFiles = async (files: File[]) => {
    if (files.length === 0) return

    setError(null)
    setSuccess(null)
    setIsUploading(true)
    setUploadProgress(0)

    try {
      const uploadPromises = files.map((file) => uploadFile(file))
      const results = await Promise.all(uploadPromises)

      const successfulUploads = results.filter((result): result is UploadedFile => result !== null)
      const failedCount = results.length - successfulUploads.length

      if (successfulUploads.length > 0) {
        setUploadedFiles((prev) => [...prev, ...successfulUploads])
        setSuccess(`Successfully uploaded ${successfulUploads.length} file(s)`)
        onUploadComplete?.(successfulUploads)
      }

      if (failedCount > 0) {
        setError(`${failedCount} file(s) failed to upload`)
      }
    } catch (error: any) {
      setError(error.message || "Upload failed")
      onUploadError?.(error.message || "Upload failed")
    } finally {
      setIsUploading(false)
      setUploadProgress(100)

      // Clear file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const handleDeleteFile = async (fileKey: string, index: number) => {
    try {
      const { error } = await supabase.storage.from(BUCKET_NAME).remove([fileKey])

      if (error) {
        throw error
      }

      setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
      setSuccess("File deleted successfully")
    } catch (error: any) {
      setError(error.message || "Delete failed")
    }
  }

  const getFileCategory = (fileType: string): "image" | "video" | "document" | "other" => {
    if (fileType.startsWith("image/")) return "image"
    if (fileType.startsWith("video/")) return "video"
    if (fileType.includes("pdf") || fileType.includes("document") || fileType.includes("text")) return "document"
    return "other"
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getFileIcon = (category: string) => {
    switch (category) {
      case "image":
        return <ImageIcon className="h-8 w-8 text-blue-500" />
      case "video":
        return <Video className="h-8 w-8 text-purple-500" />
      case "document":
        return <FileText className="h-8 w-8 text-green-500" />
      default:
        return <File className="h-8 w-8 text-gray-500" />
    }
  }

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            File Upload
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-700 mb-2">Drop files here or click to browse</p>
            <p className="text-sm text-gray-500 mb-4">
              {multiple ? "Upload multiple files" : "Upload a single file"} (Max {maxSize}MB each)
            </p>
            <p className="text-xs text-gray-400 mb-4">Supported: {acceptedTypes.join(", ")}</p>

            <input
              ref={fileInputRef}
              type="file"
              multiple={multiple}
              accept={acceptedTypes.join(",")}
              onChange={handleFileSelect}
              className="hidden"
            />

            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isUploading ? "Uploading..." : "Select Files"}
            </Button>
          </div>

          {/* Upload Progress */}
          {isUploading && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Uploading...</span>
                <span className="text-sm text-gray-600">{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="w-full" />
            </div>
          )}

          {/* Success/Error Messages */}
          {success && (
            <Alert className="mt-4 bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">{success}</AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert className="mt-4 bg-red-50 border-red-200">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Uploaded Files ({uploadedFiles.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                  <div className="flex items-center gap-3">
                    {getFileIcon(file.category)}
                    <div>
                      <p className="font-medium text-gray-900">{file.name}</p>
                      <p className="text-sm text-gray-500">
                        {formatFileSize(file.size)} • {file.category}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => window.open(file.url, "_blank")}>
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteFile(file.key, index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
