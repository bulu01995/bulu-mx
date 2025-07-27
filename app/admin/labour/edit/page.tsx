"use client"
import { useState, useEffect } from "react"
import type React from "react"

import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Edit, Phone, Mail, MapPin, Briefcase, Save, ArrowLeft, User } from "@/components/icons"
import { getAllLabourProfiles, updateLabourProfile, type LabourProfile } from "@/lib/labour-database"
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
  "Cook",
  "Driver",
  "Babysitter",
  "Elder Care",
  "Pet Care",
]

export default function EditLabourInfo() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const labourId = searchParams.get("id")

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [labour, setLabour] = useState<LabourProfile | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    area: "",
    experience_years: 1,
    is_available: true,
    is_verified: true,
    services: [] as string[],
  })

  useEffect(() => {
    if (labourId) {
      loadLabourData()
    } else {
      setLoading(false)
    }
  }, [labourId])

  const loadLabourData = async () => {
    try {
      setLoading(true)
      const labourers = await getAllLabourProfiles()
      const foundLabour = labourers.find((l) => l.id === labourId)

      if (foundLabour) {
        setLabour(foundLabour)
        setFormData({
          name: foundLabour.name,
          phone: foundLabour.phone,
          email: foundLabour.email || "",
          area: foundLabour.area,
          experience_years: foundLabour.experience_years,
          is_available: foundLabour.is_available,
          is_verified: foundLabour.is_verified,
          services: foundLabour.labour_services?.map((s: any) => s.service_type) || [],
        })
      } else {
        toast({
          title: "Error",
          description: "Labour not found",
          variant: "destructive",
        })
        router.push("/admin/labour/all")
      }
    } catch (error) {
      console.error("Error loading labour data:", error)
      toast({
        title: "Error",
        description: "Failed to load labour data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!labourId) return

    if (!formData.name || !formData.phone || !formData.area || formData.services.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields and select at least one service",
        variant: "destructive",
      })
      return
    }

    try {
      setSaving(true)
      await updateLabourProfile(labourId, {
        name: formData.name,
        phone: formData.phone,
        email: formData.email || undefined,
        area: formData.area,
        experience_years: formData.experience_years,
        is_available: formData.is_available,
        is_verified: formData.is_verified,
      })

      toast({
        title: "Success",
        description: "Labour profile updated successfully",
      })

      router.push("/admin/labour/all")
    } catch (error) {
      console.error("Error updating labour profile:", error)
      toast({
        title: "Error",
        description: "Failed to update labour profile",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading labour data...</p>
        </div>
      </div>
    )
  }

  if (!labour) {
    return (
      <div className="text-center py-12">
        <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Labour Not Found</h2>
        <p className="text-gray-600 mb-4">The requested labour profile could not be found.</p>
        <Button onClick={() => router.push("/admin/labour/all")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to All Labourers
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Edit className="h-6 w-6" />
            Edit Labour Info
          </h1>
          <p className="text-gray-600">Update {labour.name}'s profile information</p>
        </div>
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+91 9876543210"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="email@example.com"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="area">Area *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Select value={formData.area} onValueChange={(value) => handleInputChange("area", value)}>
                    <SelectTrigger className="pl-10">
                      <SelectValue placeholder="Select area in Ranchi" />
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Experience (Years) *</Label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="experience"
                    type="number"
                    min="0"
                    max="50"
                    value={formData.experience_years}
                    onChange={(e) => handleInputChange("experience_years", Number.parseInt(e.target.value) || 1)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Status Toggles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="available"
                  checked={formData.is_available}
                  onCheckedChange={(checked) => handleInputChange("is_available", checked)}
                />
                <Label htmlFor="available" className="text-sm font-normal cursor-pointer">
                  Available for work
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="verified"
                  checked={formData.is_verified}
                  onCheckedChange={(checked) => handleInputChange("is_verified", checked)}
                />
                <Label htmlFor="verified" className="text-sm font-normal cursor-pointer">
                  Verified labour
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Services */}
        <Card>
          <CardHeader>
            <CardTitle>Services Offered *</CardTitle>
            <p className="text-sm text-gray-600">Select all services this labour can provide</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {serviceTypes.map((service) => (
                <div key={service} className="flex items-center space-x-2">
                  <Checkbox
                    id={service}
                    checked={formData.services.includes(service)}
                    onCheckedChange={() => handleServiceToggle(service)}
                  />
                  <Label htmlFor={service} className="text-sm font-normal cursor-pointer">
                    {service}
                  </Label>
                </div>
              ))}
            </div>

            {formData.services.length > 0 && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-800 mb-2">Selected Services:</p>
                <div className="flex flex-wrap gap-2">
                  {formData.services.map((service) => (
                    <span key={service} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Profile Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Statistics</CardTitle>
            <p className="text-sm text-gray-600">Current performance metrics (read-only)</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{labour.total_jobs}</p>
                <p className="text-sm text-gray-600">Total Jobs</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-yellow-600">{labour.rating.toFixed(1)}</p>
                <p className="text-sm text-gray-600">Rating</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{labour.experience_years}</p>
                <p className="text-sm text-gray-600">Years Exp.</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">{new Date(labour.created_at).toLocaleDateString()}</p>
                <p className="text-sm text-gray-600">Joined</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Form Actions */}
        <div className="flex items-center justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
