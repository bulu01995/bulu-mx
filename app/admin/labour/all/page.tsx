"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  HardHat,
  Search,
  Edit,
  Trash2,
  Eye,
  Phone,
  MapPin,
  Star,
  Briefcase,
  ToggleLeft,
  ToggleRight,
  Shield,
  ShieldCheck,
} from "@/components/icons"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  getAllLabourProfiles,
  updateLabourProfile,
  deleteLabourProfile,
  type LabourProfile,
} from "@/lib/labour-database"
import { toast } from "@/hooks/use-toast"

const ranchiareas = [
  "Harmu",
  "Kanke",
  "Doranda",
  "Lalpur",
  "Bariatu",
  "Ratu Road",
  "Morabadi",
  "Upper Bazar",
  "Lower Bazar",
  "Kokar",
  "Hinoo",
  "Kantatoli",
  "Booty More",
  "Jagannathpur",
  "Namkum",
  "Tatisilwai",
]

const serviceTypes = [
  "Electrician",
  "Plumber",
  "Carpenter",
  "Painter",
  "AC Repair",
  "House Cleaning",
  "Appliance Repair",
  "Gardening",
  "Security Guard",
]

export default function AllLabourers() {
  const [labourers, setLabourers] = useState<LabourProfile[]>([])
  const [filteredLabourers, setFilteredLabourers] = useState<LabourProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedArea, setSelectedArea] = useState<string>("all")
  const [selectedService, setSelectedService] = useState<string>("all")
  const [availabilityFilter, setAvailabilityFilter] = useState<string>("all")
  const [verificationFilter, setVerificationFilter] = useState<string>("all")
  const [selectedLabourer, setSelectedLabourer] = useState<LabourProfile | null>(null)

  useEffect(() => {
    loadLabourers()
  }, [])

  useEffect(() => {
    filterLabourers()
  }, [labourers, searchTerm, selectedArea, selectedService, availabilityFilter, verificationFilter])

  const loadLabourers = async () => {
    try {
      setLoading(true)
      const data = await getAllLabourProfiles()
      setLabourers(data)
    } catch (error) {
      console.error("Error loading labourers:", error)
      toast({
        title: "Error",
        description: "Failed to load labourers",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const filterLabourers = () => {
    let filtered = labourers

    if (searchTerm) {
      filtered = filtered.filter(
        (labour) =>
          labour.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          labour.phone.includes(searchTerm) ||
          labour.area.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedArea !== "all") {
      filtered = filtered.filter((labour) => labour.area === selectedArea)
    }

    if (selectedService !== "all") {
      filtered = filtered.filter((labour) =>
        labour.labour_services?.some((service: any) => service.service_type === selectedService),
      )
    }

    if (availabilityFilter !== "all") {
      filtered = filtered.filter((labour) =>
        availabilityFilter === "available" ? labour.is_available : !labour.is_available,
      )
    }

    if (verificationFilter !== "all") {
      filtered = filtered.filter((labour) =>
        verificationFilter === "verified" ? labour.is_verified : !labour.is_verified,
      )
    }

    setFilteredLabourers(filtered)
  }

  const toggleAvailability = async (labourId: string, currentStatus: boolean) => {
    try {
      await updateLabourProfile(labourId, { is_available: !currentStatus })
      setLabourers((prev) =>
        prev.map((labour) => (labour.id === labourId ? { ...labour, is_available: !currentStatus } : labour)),
      )
      toast({
        title: "Success",
        description: "Labour availability updated",
      })
    } catch (error) {
      console.error("Error updating availability:", error)
      toast({
        title: "Error",
        description: "Failed to update availability",
        variant: "destructive",
      })
    }
  }

  const toggleVerification = async (labourId: string, currentStatus: boolean) => {
    try {
      await updateLabourProfile(labourId, { is_verified: !currentStatus })
      setLabourers((prev) =>
        prev.map((labour) => (labour.id === labourId ? { ...labour, is_verified: !currentStatus } : labour)),
      )
      toast({
        title: "Success",
        description: "Labour verification updated",
      })
    } catch (error) {
      console.error("Error updating verification:", error)
      toast({
        title: "Error",
        description: "Failed to update verification",
        variant: "destructive",
      })
    }
  }

  const handleDeleteLabourer = async (labourId: string) => {
    if (!confirm("Are you sure you want to delete this labourer? This action cannot be undone.")) {
      return
    }

    try {
      await deleteLabourProfile(labourId)
      setLabourers((prev) => prev.filter((labour) => labour.id !== labourId))
      toast({
        title: "Success",
        description: "Labour profile deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting labourer:", error)
      toast({
        title: "Error",
        description: "Failed to delete labour profile",
        variant: "destructive",
      })
    }
  }

  const getStatusBadge = (labour: LabourProfile) => {
    if (labour.is_available) {
      return <Badge className="bg-green-100 text-green-800">Available</Badge>
    } else {
      return <Badge variant="secondary">Busy</Badge>
    }
  }

  const getVerificationBadge = (isVerified: boolean) => {
    if (isVerified) {
      return <Badge className="bg-blue-100 text-blue-800">Verified</Badge>
    } else {
      return <Badge variant="outline">Unverified</Badge>
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading labourers...</p>
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
            <HardHat className="h-6 w-6" />
            All Labourers
          </h1>
          <p className="text-gray-600">Manage all registered labour profiles</p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="secondary" className="text-sm">
            {filteredLabourers.length} Total
          </Badge>
          <Badge className="bg-green-100 text-green-800 text-sm">
            {filteredLabourers.filter((l) => l.is_available).length} Available
          </Badge>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name, phone, or area..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={selectedArea} onValueChange={setSelectedArea}>
              <SelectTrigger>
                <SelectValue placeholder="All Areas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Areas</SelectItem>
                {ranchiareas.map((area) => (
                  <SelectItem key={area} value={area}>
                    {area}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedService} onValueChange={setSelectedService}>
              <SelectTrigger>
                <SelectValue placeholder="All Services" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                {serviceTypes.map((service) => (
                  <SelectItem key={service} value={service}>
                    {service}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="busy">Busy</SelectItem>
              </SelectContent>
            </Select>

            <Select value={verificationFilter} onValueChange={setVerificationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Verification" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="unverified">Unverified</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Labourers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Labour Profiles ({filteredLabourers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Labourer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Area</TableHead>
                <TableHead>Services</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Verification</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLabourers.map((labour) => (
                <TableRow key={labour.id}>
                  <TableCell>
                    <div className="font-medium">{labour.name}</div>
                    <div className="text-sm text-gray-500">ID: {labour.id.slice(0, 8)}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Phone className="h-3 w-3" />
                      {labour.phone}
                    </div>
                    {labour.email && <div className="text-xs text-gray-500">{labour.email}</div>}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <MapPin className="h-3 w-3" />
                      {labour.area}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {labour.labour_services?.slice(0, 2).map((service: any, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {service.service_type}
                        </Badge>
                      ))}
                      {labour.labour_services?.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{labour.labour_services.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Briefcase className="h-3 w-3" />
                      {labour.experience_years}y
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{labour.rating.toFixed(1)}</span>
                      <span className="text-xs text-gray-500">({labour.total_jobs})</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(labour)}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleAvailability(labour.id, labour.is_available)}
                      >
                        {labour.is_available ? (
                          <ToggleRight className="h-4 w-4 text-green-600" />
                        ) : (
                          <ToggleLeft className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getVerificationBadge(labour.is_verified)}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleVerification(labour.id, labour.is_verified)}
                      >
                        {labour.is_verified ? (
                          <ShieldCheck className="h-4 w-4 text-blue-600" />
                        ) : (
                          <Shield className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedLabourer(labour)}>
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Labour Profile - {labour.name}</DialogTitle>
                            <DialogDescription>Complete profile information and statistics</DialogDescription>
                          </DialogHeader>

                          {selectedLabourer && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium text-gray-700">Name</label>
                                  <p className="text-sm text-gray-900">{selectedLabourer.name}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-700">Phone</label>
                                  <p className="text-sm text-gray-900">{selectedLabourer.phone}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-700">Area</label>
                                  <p className="text-sm text-gray-900">{selectedLabourer.area}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-700">Experience</label>
                                  <p className="text-sm text-gray-900">{selectedLabourer.experience_years} years</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-700">Rating</label>
                                  <p className="text-sm text-gray-900">{selectedLabourer.rating.toFixed(1)} ⭐</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-700">Total Jobs</label>
                                  <p className="text-sm text-gray-900">{selectedLabourer.total_jobs}</p>
                                </div>
                              </div>

                              <div>
                                <label className="text-sm font-medium text-gray-700">Services Offered</label>
                                <div className="flex flex-wrap gap-2 mt-1">
                                  {selectedLabourer.labour_services?.map((service: any, index: number) => (
                                    <Badge key={index} variant="secondary">
                                      {service.service_type} (₹{service.min_rate}-{service.max_rate})
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium">Status:</span>
                                  {getStatusBadge(selectedLabourer)}
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium">Verification:</span>
                                  {getVerificationBadge(selectedLabourer.is_verified)}
                                </div>
                              </div>

                              <div className="text-xs text-gray-500">
                                <p>Created: {new Date(selectedLabourer.created_at).toLocaleDateString()}</p>
                                <p>Last Updated: {new Date(selectedLabourer.updated_at).toLocaleDateString()}</p>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>

                      <Button variant="outline" size="sm" asChild>
                        <a href={`/admin/labour/edit?id=${labour.id}`}>
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </a>
                      </Button>

                      <Button variant="destructive" size="sm" onClick={() => handleDeleteLabourer(labour.id)}>
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredLabourers.length === 0 && (
            <div className="text-center py-8">
              <HardHat className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No labourers found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Labourers</p>
                <p className="text-2xl font-bold text-blue-600">{labourers.length}</p>
              </div>
              <HardHat className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Available Now</p>
                <p className="text-2xl font-bold text-green-600">{labourers.filter((l) => l.is_available).length}</p>
              </div>
              <ToggleRight className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Verified</p>
                <p className="text-2xl font-bold text-blue-600">{labourers.filter((l) => l.is_verified).length}</p>
              </div>
              <ShieldCheck className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Rating</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {(labourers.reduce((acc, l) => acc + l.rating, 0) / labourers.length || 0).toFixed(1)}
                </p>
              </div>
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
