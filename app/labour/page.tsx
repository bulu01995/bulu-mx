"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  MapPin,
  Star,
  Phone,
  CheckCircle,
  Clock,
  Zap,
  Wrench,
  PaintBucket,
  Hammer,
  Home,
  Wind,
  Users,
  Filter,
  SlidersHorizontal,
} from "lucide-react"
import { getLabourProfiles, createLabourBooking, type LabourProfile, type LabourService } from "@/lib/labour-database"
import { toast } from "@/hooks/use-toast"

export default function LabourPage() {
  const [labourProfiles, setLabourProfiles] = useState<(LabourProfile & { labour_services: LabourService[] })[]>([])
  const [filteredProfiles, setFilteredProfiles] = useState<(LabourProfile & { labour_services: LabourService[] })[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [selectedArea, setSelectedArea] = useState("")
  const [availability, setAvailability] = useState("all")
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [sortBy, setSortBy] = useState("rating")
  const [showFilters, setShowFilters] = useState(false)

  // Booking form state
  const [bookingForm, setBookingForm] = useState({
    client_name: "",
    client_phone: "",
    service_type: "",
    preferred_date: "",
    time_slot: "",
    area: "",
    urgency: "Normal",
    notes: "",
  })

  const serviceTypes = [
    { id: "Electrician", name: "Electrician", icon: Zap },
    { id: "Plumber", name: "Plumber", icon: Wrench },
    { id: "House Cleaning", name: "House Cleaning", icon: Home },
    { id: "Carpenter", name: "Carpenter", icon: Hammer },
    { id: "Painter", name: "Painter", icon: PaintBucket },
    { id: "AC Repair", name: "AC Repair", icon: Wind },
    { id: "House Help", name: "House Help", icon: Users },
    { id: "Deep Cleaning", name: "Deep Cleaning", icon: Home },
  ]

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

  const timeSlots = [
    "9:00 AM - 11:00 AM",
    "11:00 AM - 1:00 PM",
    "1:00 PM - 3:00 PM",
    "3:00 PM - 5:00 PM",
    "5:00 PM - 7:00 PM",
  ]

  useEffect(() => {
    fetchLabourProfiles()
  }, [])

  useEffect(() => {
    filterProfiles()
  }, [labourProfiles, searchTerm, selectedServices, selectedArea, availability, verifiedOnly, sortBy])

  const fetchLabourProfiles = async () => {
    try {
      setLoading(true)
      const profiles = await getLabourProfiles()
      setLabourProfiles(profiles)
    } catch (error) {
      console.error("Error fetching labour profiles:", error)
      toast({
        title: "Error",
        description: "Failed to load labour profiles",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const filterProfiles = () => {
    let filtered = [...labourProfiles]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (profile) =>
          profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          profile.labour_services.some((service) =>
            service.service_type.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
      )
    }

    // Service type filter
    if (selectedServices.length > 0) {
      filtered = filtered.filter((profile) =>
        profile.labour_services.some((service) => selectedServices.includes(service.service_type) && service.available),
      )
    }

    // Area filter
    if (selectedArea) {
      filtered = filtered.filter((profile) => profile.area === selectedArea)
    }

    // Availability filter
    if (availability === "available") {
      filtered = filtered.filter((profile) => profile.is_available)
    }

    // Verified filter
    if (verifiedOnly) {
      filtered = filtered.filter((profile) => profile.is_verified)
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating
        case "jobs":
          return b.total_jobs - a.total_jobs
        case "name":
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

    setFilteredProfiles(filtered)
  }

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId],
    )
  }

  const handleBookingSubmit = async (labourId: string) => {
    try {
      if (!bookingForm.client_name || !bookingForm.client_phone || !bookingForm.service_type) {
        toast({
          title: "Error",
          description: "Please fill in all required fields",
          variant: "destructive",
        })
        return
      }

      await createLabourBooking({
        ...bookingForm,
        labour_id: labourId,
      })

      toast({
        title: "Success!",
        description: "Your booking request has been submitted. The labour will contact you soon.",
      })

      // Reset form
      setBookingForm({
        client_name: "",
        client_phone: "",
        service_type: "",
        preferred_date: "",
        time_slot: "",
        area: "",
        urgency: "Normal",
        notes: "",
      })
    } catch (error) {
      console.error("Error creating booking:", error)
      toast({
        title: "Error",
        description: "Failed to submit booking. Please try again.",
        variant: "destructive",
      })
    }
  }

  const getServiceIcon = (serviceType: string) => {
    const service = serviceTypes.find((s) => s.id === serviceType)
    return service ? service.icon : Users
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Find Trusted Labour Services in Ranchi</h1>
            <p className="text-xl opacity-90">Connect with verified professionals for all your service needs</p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search Electrician, Plumber, Cleaner..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 py-3 text-lg bg-white text-gray-900"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className={`w-80 space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Service Type Filter */}
                <div>
                  <h3 className="font-semibold mb-3">Service Type</h3>
                  <div className="space-y-2">
                    {serviceTypes.map((service) => (
                      <div key={service.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={service.id}
                          checked={selectedServices.includes(service.id)}
                          onCheckedChange={() => handleServiceToggle(service.id)}
                        />
                        <Label htmlFor={service.id} className="flex items-center gap-2 cursor-pointer">
                          <service.icon className="h-4 w-4" />
                          {service.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Area Filter */}
                <div>
                  <h3 className="font-semibold mb-3">Area in Ranchi</h3>
                  <Select value={selectedArea} onValueChange={setSelectedArea}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select area" />
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
                </div>

                {/* Availability Filter */}
                <div>
                  <h3 className="font-semibold mb-3">Availability</h3>
                  <RadioGroup value={availability} onValueChange={setAvailability}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="all" />
                      <Label htmlFor="all">All</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="available" id="available" />
                      <Label htmlFor="available">Available Today</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Verified Only */}
                <div className="flex items-center justify-between">
                  <Label htmlFor="verified">Verified Only</Label>
                  <Switch id="verified" checked={verifiedOnly} onCheckedChange={setVerifiedOnly} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header with results count and sort */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold">{filteredProfiles.length} Labour Services in Ranchi</h2>
                <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="jobs">Most Experienced</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Labour Listings */}
            {loading ? (
              <div className="grid md:grid-cols-2 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredProfiles.map((profile) => (
                  <Card key={profile.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex gap-4 mb-4">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-2xl font-bold text-blue-600">{profile.name.charAt(0)}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-semibold">{profile.name}</h3>
                            {profile.is_verified && <CheckCircle className="h-5 w-5 text-green-500" />}
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{profile.rating}</span>
                            <span className="text-sm text-gray-500">({profile.total_jobs} jobs)</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <MapPin className="h-4 w-4" />
                            {profile.area}, Ranchi
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={profile.is_available ? "default" : "secondary"}>
                            {profile.is_available ? "Available" : "Busy"}
                          </Badge>
                        </div>
                      </div>

                      {/* Services */}
                      <div className="mb-4">
                        <h4 className="font-medium mb-2">Services:</h4>
                        <div className="flex flex-wrap gap-2">
                          {profile.labour_services
                            .filter((s) => s.available)
                            .map((service) => {
                              const ServiceIcon = getServiceIcon(service.service_type)
                              return (
                                <Badge key={service.id} variant="outline" className="flex items-center gap-1">
                                  <ServiceIcon className="h-3 w-3" />
                                  {service.service_type}
                                  <span className="text-xs">
                                    ₹{service.min_rate}-{service.max_rate}
                                  </span>
                                </Badge>
                              )
                            })}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              className="flex-1"
                              disabled={!profile.is_available}
                              onClick={() => setBookingForm((prev) => ({ ...prev, area: profile.area }))}
                            >
                              <Phone className="mr-2 h-4 w-4" />
                              Book Now
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Book {profile.name}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="client_name">Your Name *</Label>
                                <Input
                                  id="client_name"
                                  value={bookingForm.client_name}
                                  onChange={(e) => setBookingForm((prev) => ({ ...prev, client_name: e.target.value }))}
                                  placeholder="Enter your name"
                                />
                              </div>
                              <div>
                                <Label htmlFor="client_phone">Phone Number *</Label>
                                <Input
                                  id="client_phone"
                                  value={bookingForm.client_phone}
                                  onChange={(e) =>
                                    setBookingForm((prev) => ({ ...prev, client_phone: e.target.value }))
                                  }
                                  placeholder="+91 XXXXX XXXXX"
                                />
                              </div>
                              <div>
                                <Label htmlFor="service_type">Service Needed *</Label>
                                <Select
                                  value={bookingForm.service_type}
                                  onValueChange={(value) =>
                                    setBookingForm((prev) => ({ ...prev, service_type: value }))
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select service" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {profile.labour_services
                                      .filter((s) => s.available)
                                      .map((service) => (
                                        <SelectItem key={service.id} value={service.service_type}>
                                          {service.service_type} (₹{service.min_rate}-{service.max_rate})
                                        </SelectItem>
                                      ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="preferred_date">Preferred Date</Label>
                                  <Input
                                    id="preferred_date"
                                    type="date"
                                    value={bookingForm.preferred_date}
                                    onChange={(e) =>
                                      setBookingForm((prev) => ({ ...prev, preferred_date: e.target.value }))
                                    }
                                    min={new Date().toISOString().split("T")[0]}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="time_slot">Time Slot</Label>
                                  <Select
                                    value={bookingForm.time_slot}
                                    onValueChange={(value) => setBookingForm((prev) => ({ ...prev, time_slot: value }))}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select time" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {timeSlots.map((slot) => (
                                        <SelectItem key={slot} value={slot}>
                                          {slot}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <div>
                                <Label htmlFor="area">Your Area</Label>
                                <Select
                                  value={bookingForm.area}
                                  onValueChange={(value) => setBookingForm((prev) => ({ ...prev, area: value }))}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select your area" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {ranchiareas.map((area) => (
                                      <SelectItem key={area} value={area}>
                                        {area}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label htmlFor="urgency">Urgency</Label>
                                <Select
                                  value={bookingForm.urgency}
                                  onValueChange={(value) => setBookingForm((prev) => ({ ...prev, urgency: value }))}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Normal">Normal</SelectItem>
                                    <SelectItem value="Emergency">Emergency</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label htmlFor="notes">Additional Notes</Label>
                                <Textarea
                                  id="notes"
                                  value={bookingForm.notes}
                                  onChange={(e) => setBookingForm((prev) => ({ ...prev, notes: e.target.value }))}
                                  placeholder="Describe your requirements..."
                                  rows={3}
                                />
                              </div>
                              <Button onClick={() => handleBookingSubmit(profile.id)} className="w-full">
                                Submit Booking Request
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button variant="outline" size="sm">
                          <Clock className="mr-2 h-4 w-4" />
                          Schedule
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {!loading && filteredProfiles.length === 0 && (
              <div className="text-center py-12">
                <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No labour services found</h3>
                <p className="text-gray-500">Try adjusting your search criteria or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
