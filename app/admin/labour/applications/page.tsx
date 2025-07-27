"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  UserPlus,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Phone,
  MapPin,
  Briefcase,
  Clock,
  Eye,
  FileText,
} from "@/components/icons"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { getLabourApplications, updateLabourApplicationStatus, type LabourApplication } from "@/lib/labour-database"
import { toast } from "@/hooks/use-toast"

export default function LabourApplications() {
  const [applications, setApplications] = useState<LabourApplication[]>([])
  const [filteredApplications, setFilteredApplications] = useState<LabourApplication[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedApplication, setSelectedApplication] = useState<LabourApplication | null>(null)
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(null)
  const [actionNote, setActionNote] = useState("")
  const [processingAction, setProcessingAction] = useState(false)

  useEffect(() => {
    loadApplications()
  }, [])

  useEffect(() => {
    filterApplications()
  }, [applications, searchTerm])

  const loadApplications = async () => {
    try {
      setLoading(true)
      const data = await getLabourApplications()
      setApplications(data)
    } catch (error) {
      console.error("Error loading applications:", error)
      toast({
        title: "Error",
        description: "Failed to load applications",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const filterApplications = () => {
    let filtered = applications

    if (searchTerm) {
      filtered = filtered.filter(
        (app) =>
          app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.phone.includes(searchTerm) ||
          app.services.some((service) => service.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    setFilteredApplications(filtered)
  }

  const handleAction = async (applicationId: string, action: "approve" | "reject") => {
    try {
      setProcessingAction(true)
      await updateLabourApplicationStatus(
        applicationId,
        action,
        "admin", // In real app, get from auth context
        action === "reject" ? actionNote : undefined,
      )

      setApplications((prev) =>
        prev.map((app) =>
          app.id === applicationId ? { ...app, status: action === "approve" ? "approved" : "rejected" } : app,
        ),
      )

      toast({
        title: "Success",
        description: `Application ${action === "approve" ? "approved" : "rejected"} successfully`,
      })

      setSelectedApplication(null)
      setActionType(null)
      setActionNote("")
    } catch (error) {
      console.error(`Error ${action}ing application:`, error)
      toast({
        title: "Error",
        description: `Failed to ${action} application`,
        variant: "destructive",
      })
    } finally {
      setProcessingAction(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Pending
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Approved
          </Badge>
        )
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading applications...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <UserPlus className="h-6 w-6" />
            Labour Applications
          </h1>
          <p className="text-gray-600">Review and manage pending labour registration requests</p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="destructive" className="text-sm">
            {filteredApplications.filter((app) => app.status === "pending").length} Pending
          </Badge>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name, area, phone, or service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Applications Table */}
      <Card>
        <CardHeader>
          <CardTitle>Applications ({filteredApplications.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Applicant</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Area</TableHead>
                <TableHead>Services</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Applied Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell>
                    <div className="font-medium">{application.name}</div>
                    <div className="text-sm text-gray-500">ID: {application.id.slice(0, 8)}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Phone className="h-3 w-3" />
                      {application.phone}
                    </div>
                    {application.email && <div className="text-xs text-gray-500">{application.email}</div>}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <MapPin className="h-3 w-3" />
                      {application.area}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {application.services.slice(0, 2).map((service, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                      {application.services.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{application.services.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Briefcase className="h-3 w-3" />
                      {application.experience_years}y
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Clock className="h-3 w-3" />
                      {new Date(application.applied_date).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(application.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedApplication(application)}>
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Application Details - {application.name}</DialogTitle>
                            <DialogDescription>
                              Review the complete application before making a decision
                            </DialogDescription>
                          </DialogHeader>

                          {selectedApplication && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium text-gray-700">Name</label>
                                  <p className="text-sm text-gray-900">{selectedApplication.name}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-700">Phone</label>
                                  <p className="text-sm text-gray-900">{selectedApplication.phone}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-700">Email</label>
                                  <p className="text-sm text-gray-900">{selectedApplication.email || "Not provided"}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-700">Area</label>
                                  <p className="text-sm text-gray-900">{selectedApplication.area}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-700">Experience</label>
                                  <p className="text-sm text-gray-900">{selectedApplication.experience_years} years</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-700">Applied Date</label>
                                  <p className="text-sm text-gray-900">
                                    {new Date(selectedApplication.applied_date).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>

                              <div>
                                <label className="text-sm font-medium text-gray-700">Services Offered</label>
                                <div className="flex flex-wrap gap-2 mt-1">
                                  {selectedApplication.services.map((service, index) => (
                                    <Badge key={index} variant="secondary">
                                      {service}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              {selectedApplication.description && (
                                <div>
                                  <label className="text-sm font-medium text-gray-700">Description</label>
                                  <p className="text-sm text-gray-900 mt-1">{selectedApplication.description}</p>
                                </div>
                              )}

                              <div>
                                <label className="text-sm font-medium text-gray-700">Documents Submitted</label>
                                <div className="flex flex-wrap gap-2 mt-1">
                                  {selectedApplication.documents.map((doc, index) => (
                                    <Badge key={index} variant="outline" className="flex items-center gap-1">
                                      <FileText className="h-3 w-3" />
                                      {doc}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              {selectedApplication.status === "rejected" && selectedApplication.rejection_reason && (
                                <div className="p-3 bg-red-50 rounded-lg">
                                  <label className="text-sm font-medium text-red-700">Rejection Reason</label>
                                  <p className="text-sm text-red-600 mt-1">{selectedApplication.rejection_reason}</p>
                                </div>
                              )}
                            </div>
                          )}

                          {selectedApplication?.status === "pending" && (
                            <DialogFooter className="gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="destructive" onClick={() => setActionType("reject")}>
                                    <XCircle className="h-4 w-4 mr-2" />
                                    Reject
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Reject Application</DialogTitle>
                                    <DialogDescription>
                                      Please provide a reason for rejecting this application
                                    </DialogDescription>
                                  </DialogHeader>
                                  <Textarea
                                    placeholder="Reason for rejection..."
                                    value={actionNote}
                                    onChange={(e) => setActionNote(e.target.value)}
                                  />
                                  <DialogFooter>
                                    <Button variant="outline" onClick={() => setActionType(null)}>
                                      Cancel
                                    </Button>
                                    <Button
                                      variant="destructive"
                                      onClick={() => handleAction(selectedApplication.id, "reject")}
                                      disabled={processingAction || !actionNote.trim()}
                                    >
                                      {processingAction ? "Processing..." : "Confirm Rejection"}
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>

                              <Button
                                onClick={() => handleAction(selectedApplication.id, "approve")}
                                className="bg-green-600 hover:bg-green-700"
                                disabled={processingAction}
                              >
                                {processingAction ? (
                                  <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Processing...
                                  </>
                                ) : (
                                  <>
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Approve & Create Account
                                  </>
                                )}
                              </Button>
                            </DialogFooter>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredApplications.length === 0 && (
            <div className="text-center py-8">
              <UserPlus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No applications found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Applications</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {applications.filter((app) => app.status === "pending").length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved Today</p>
                <p className="text-2xl font-bold text-green-600">
                  {applications.filter((app) => app.status === "approved").length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-red-600">
                  {applications.filter((app) => app.status === "rejected").length}
                </p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
