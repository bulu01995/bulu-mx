import { Shield } from "lucide-react"

export default function AdminAccessLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="mx-auto w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4 animate-pulse">
          <Shield className="h-6 w-6 text-white" />
        </div>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading admin access...</p>
      </div>
    </div>
  )
}
