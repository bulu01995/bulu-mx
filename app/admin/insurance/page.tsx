"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Search,
  Download,
  RefreshCw,
  Users,
  Phone,
  MapPin,
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react"
import {
  getInsuranceLeads,
  getInsuranceStats,
  updateInsuranceLeadStatus,
  exportInsuranceLeadsToCSV,
  type InsuranceLead,
  type InsuranceStats,
} from "@/lib/insurance-database"

export default function AdminInsurancePage() {
  const [leads, setLeads] = useState<InsuranceLead[]>([])
  const [stats, setStats] = useState<InsuranceStats>({
    total: 0,
    pending: 0,
    contacted: 0,
    qualified: 0,
    converted: 0,
    rejected: 0,
    follow_up: 0,
  })
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [updating, setUpdating] = useState<string | null>(null)
  const [error, setError] = useState("")

  const loadData = async () => {
    try {
      setLoading(true)
      setError("")

      const [leadsData, statsData] = await Promise.all([
        getInsuranceLeads({
          search: searchTerm || undefined,
          status: statusFilter === "all" ? undefined : statusFilter,
          insurance_type: typeFilter === "all" ? undefined : typeFilter,
        }),
        getInsuranceStats(),
      ])

      setLeads(leadsData)
      setStats(statsData)
    } catch (error) {
      console.error("Error loading insurance data:", error)
      setError("Failed to load insurance data. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [searchTerm, statusFilter, typeFilter])

  const handleStatusUpdate = async (leadId: string, newStatus: InsuranceLead["status"]) => {
    try {
      setUpdating(leadId)
      await updateInsuranceLeadStatus(leadId, newStatus)
      await loadData() // Reload data to reflect changes
    } catch (error) {
      console.error("Error updating lead status:", error)
      setError("Failed to update lead status. Please try again.")
    } finally {
      setUpdating(null)
    }
  }

  const handleExport = () => {
    try {
      exportInsuranceLeadsToCSV(leads)
    } catch (error) {
      console.error("Error exporting data:", error)
      setError("Failed to export data. Please try again.")
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: "bg-yellow-100 text-yellow-800", icon: Clock },
      contacted: { color: "bg-blue-100 text-blue-800", icon: Phone },
      qualified: { color: "bg-purple-100 text-purple-800", icon: TrendingUp },
      converted: { color: "bg-green-100 text-green-800", icon: CheckCircle },
      rejected: { color: "bg-red-100 text-red-800", icon: XCircle },
      follow_up: { color: "bg-orange-100 text-orange-800", icon: AlertCircle },
    }

    const config = statusConfig[status as keyof typeof statusConfig]
    const Icon = config?.icon || Clock

    return (
      <Badge className={`${config?.color} flex items-center gap-1`}>
        <Icon className="h-3 w-3" />
        {status.replace("_", " ").toUpperCase()}
      </Badge>
    )
  }

  const formatInsuranceType = (type: string) => {
    return type
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Insurance Leads</h1>
          <p className="text-gray-600">Manage and track insurance applications</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={loadData} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={handleExport} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            <span className="text-red-700">{error}</span>
            <Button variant="outline" size="sm" onClick={() => setError("")} className="ml-auto">
              Dismiss
            </Button>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Users className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Contacted</p>
                <p className="text-2xl font-bold text-blue-600">{stats.contacted}</p>
              </div>
              <Phone className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Qualified</p>
                <p className="text-2xl font-bold text-purple-600">{stats.qualified}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Converted</p>
                <p className="text-2xl font-bold text-green-600">{stats.converted}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Follow Up</p>
                <p className="text-2xl font-bold text-orange-600">{stats.follow_up}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by name, phone, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="qualified">Qualified</SelectItem>
                <SelectItem value="converted">Converted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="follow_up">Follow Up</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="car-insurance">Car Insurance</SelectItem>
                <SelectItem value="health-insurance">Health Insurance</SelectItem>
                <SelectItem value="term-insurance">Term Insurance</SelectItem>
                <SelectItem value="bike-insurance">Bike Insurance</SelectItem>
                <SelectItem value="investment-plans">Investment Plans</SelectItem>
                <SelectItem value="business-insurance">Business Insurance</SelectItem>
                <SelectItem value="family-health-insurance">Family Health Insurance</SelectItem>
                <SelectItem value="guaranteed-return-plans">Guaranteed Return Plans</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Leads Table */}
      <Card>
        <CardHeader>
          <CardTitle>Insurance Leads ({leads.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Insurance Type</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{lead.full_name}</div>
                        {lead.email && <div className="text-sm text-gray-500">{lead.email}</div>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-gray-400" />
                        {lead.phone_number}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{formatInsuranceType(lead.insurance_type)}</div>
                        <div className="text-sm text-gray-500 capitalize">{lead.insurance_category}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                        <div>
                          <div>{lead.city}</div>
                          <div className="text-sm text-gray-500">{lead.state}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(lead.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        <div>
                          <div>{new Date(lead.created_at).toLocaleDateString()}</div>
                          <div className="text-sm text-gray-500">{new Date(lead.created_at).toLocaleTimeString()}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {lead.status === "pending" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStatusUpdate(lead.id, "contacted")}
                            disabled={updating === lead.id}
                          >
                            {updating === lead.id ? <RefreshCw className="h-3 w-3 animate-spin" /> : "Contact"}
                          </Button>
                        )}
                        {lead.status === "contacted" && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleStatusUpdate(lead.id, "qualified")}
                              disabled={updating === lead.id}
                            >
                              Qualify
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleStatusUpdate(lead.id, "follow_up")}
                              disabled={updating === lead.id}
                            >
                              Follow Up
                            </Button>
                          </>
                        )}
                        {(lead.status === "qualified" || lead.status === "follow_up") && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleStatusUpdate(lead.id, "converted")}
                              disabled={updating === lead.id}
                              className="text-green-600 hover:text-green-700"
                            >
                              Convert
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleStatusUpdate(lead.id, "rejected")}
                              disabled={updating === lead.id}
                              className="text-red-600 hover:text-red-700"
                            >
                              Reject
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {leads.length === 0 && (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No insurance leads found</p>
              <p className="text-sm text-gray-400 mt-2">
                Leads will appear here once customers submit insurance applications
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
