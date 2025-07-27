"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FileUpload from "@/components/file-upload"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FolderOpen, ImageIcon, Video, FileText, Upload, Search, Filter } from "lucide-react"

interface UploadedFile {
  name: string
  url: string
  key: string
  size: number
  type: string
  category: "image" | "video" | "document" | "other"
}

export default function FileManagerPage() {
  const [allFiles, setAllFiles] = useState<UploadedFile[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFolder, setSelectedFolder] = useState("uploads") // Changed from "general" to "uploads"

  const handleUploadComplete = (files: UploadedFile[]) => {
    setAllFiles((prev) => [...prev, ...files])
  }

  const handleUploadError = (error: string) => {
    console.error("Upload error:", error)
  }

  const filteredFiles = allFiles.filter((file) => file.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const imageFiles = filteredFiles.filter((file) => file.category === "image")
  const videoFiles = filteredFiles.filter((file) => file.category === "video")
  const documentFiles = filteredFiles.filter((file) => file.category === "document")

  const folders = [
    { name: "uploads", label: "Uploads", icon: Upload }, // Changed from "general" to "uploads"
    { name: "uploads/images", label: "Images", icon: ImageIcon },
    { name: "uploads/videos", label: "Videos", icon: Video },
    { name: "uploads/documents", label: "Documents", icon: FileText },
    { name: "uploads/user-content", label: "User Content", icon: FolderOpen },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-6 md:px-12 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">File Manager</h1>
          <p className="text-gray-600">Upload and manage your images, videos, and documents</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Folders */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FolderOpen className="h-5 w-5" />
                  Folders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {folders.map((folder) => (
                    <Button
                      key={folder.name}
                      variant={selectedFolder === folder.name ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setSelectedFolder(folder.name)}
                    >
                      <folder.icon className="h-4 w-4 mr-2" />
                      {folder.label}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upload Stats */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Storage Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Files:</span>
                    <span className="font-medium">{allFiles.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Images:</span>
                    <span className="font-medium">{imageFiles.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Videos:</span>
                    <span className="font-medium">{videoFiles.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Documents:</span>
                    <span className="font-medium">{documentFiles.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Filter */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Label htmlFor="search">Search Files</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="search"
                        placeholder="Search by filename..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex items-end">
                    <Button variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* File Upload Component */}
            <div className="mb-6">
              <FileUpload
                folder={selectedFolder}
                multiple={true}
                acceptedTypes={["image/*", "video/*", "application/pdf", ".doc", ".docx"]}
                maxSize={50}
                onUploadComplete={handleUploadComplete}
                onUploadError={handleUploadError}
              />
            </div>

            {/* File Tabs */}
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All Files ({filteredFiles.length})</TabsTrigger>
                <TabsTrigger value="images">Images ({imageFiles.length})</TabsTrigger>
                <TabsTrigger value="videos">Videos ({videoFiles.length})</TabsTrigger>
                <TabsTrigger value="documents">Documents ({documentFiles.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>All Files</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {filteredFiles.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        No files uploaded yet. Upload some files to get started!
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredFiles.map((file, index) => (
                          <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                            {file.category === "image" ? (
                              <img
                                src={file.url || "/placeholder.svg"}
                                alt={file.name}
                                className="w-full h-32 object-cover rounded mb-2"
                              />
                            ) : (
                              <div className="w-full h-32 bg-gray-100 rounded mb-2 flex items-center justify-center">
                                {file.category === "video" && <Video className="h-8 w-8 text-gray-400" />}
                                {file.category === "document" && <FileText className="h-8 w-8 text-gray-400" />}
                              </div>
                            )}
                            <p className="font-medium text-sm truncate">{file.name}</p>
                            <p className="text-xs text-gray-500">{file.category}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="images" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Images</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {imageFiles.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">No images uploaded yet.</div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {imageFiles.map((file, index) => (
                          <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                            <img
                              src={file.url || "/placeholder.svg"}
                              alt={file.name}
                              className="w-full h-32 object-cover rounded mb-2"
                            />
                            <p className="font-medium text-sm truncate">{file.name}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="videos" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Videos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {videoFiles.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">No videos uploaded yet.</div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {videoFiles.map((file, index) => (
                          <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                            <video src={file.url} className="w-full h-32 object-cover rounded mb-2" controls />
                            <p className="font-medium text-sm truncate">{file.name}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Documents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {documentFiles.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">No documents uploaded yet.</div>
                    ) : (
                      <div className="space-y-3">
                        {documentFiles.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 border rounded-lg hover:shadow-md transition-shadow"
                          >
                            <div className="flex items-center gap-3">
                              <FileText className="h-8 w-8 text-blue-500" />
                              <div>
                                <p className="font-medium">{file.name}</p>
                                <p className="text-sm text-gray-500">{file.type}</p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm" onClick={() => window.open(file.url, "_blank")}>
                              View
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
