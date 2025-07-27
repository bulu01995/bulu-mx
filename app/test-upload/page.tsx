"use client"

import type React from "react"

import { useState } from "react"

export default function TestUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadStatus, setUploadStatus] = useState<string>("")

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0])
    }
  }

  const testFileUpload = async () => {
    if (!selectedFile) {
      setUploadStatus("Please select a file.")
      return
    }

    const formData = new FormData()
    formData.append("file", selectedFile)
    formData.append("folder", "uploads") // Updated line
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        setUploadStatus("File uploaded successfully!")
      } else {
        setUploadStatus(`File upload failed. Status: ${response.status}`)
      }
    } catch (error: any) {
      setUploadStatus(`File upload failed. Error: ${error.message}`)
    }
  }

  return (
    <div>
      <h1>Test File Upload</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={testFileUpload} disabled={!selectedFile}>
        Upload File
      </button>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  )
}
