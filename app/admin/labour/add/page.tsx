"use client"
import { useState } from "react"
import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, UserPlus, Phone, Mail, MapPin, Briefcase, Save, ArrowLeft } from "@/components/icons"
import { createLabourProfile } from "@/lib/labour-database"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

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

export default function AddLabour() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    area: "",
    experience_years: 1,
    services: [] as string[],
    description: "",
  })

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

    if (!formData.name || !formData.phone || !formData.area || formData.services.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields and select at least one service",
        variant: "destructive",
      })
      return
    }

    if (formData.phone.length < 10) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid phone number",
        variant: "destructive",
      })
      return
    }

    try {
      setLoading(true)
      await createLabourProfile({
        name: formData.name,
        phone: formData.phone,
        email: formData.email || undefined,
        area: formData.area,
        services: formData.services,
        experience_years: formData.experience_years,
      })

      toast({
        title: "Success",
        description: "Labour profile created successfully",
      })

      router.push("/admin/labour/all")
    } catch (error) {
      console.error("Error creating labour profile:", error)
      toast({
        title: "Error",
        description: "Failed to create labour profile",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Plus className="h-6 w-6" />
            Add New Labour
          </h1>
          <p className="text-gray-600">Create a new labour profile manually</p>
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
              <UserPlus className="h-5 w-5" />
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
                <Label htmlFor="email">Email Address (Optional)</Label>
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

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Brief description about the labour's skills and experience..."
                rows={3}
              />
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

        {/* Form Actions */}
        <div className="flex items-center justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Creating...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Create Labour Profile
              </>
            )}
          </Button>
        </div>
      </form>

      {/* Preview Card */}
      {(formData.name || formData.phone || formData.area || formData.services.length > 0) && (
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <p className="text-sm text-gray-600">This is how the labour profile will appear</p>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg p-4 bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">{formData.name || "Labour Name"}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {formData.phone || "Phone Number"}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {formData.area || "Area"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="h-3 w-3" />
                      {formData.experience_years} years exp.
                    </span>
                  </div>
                  {formData.services.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {formData.services.map((service) => (
                        <span key={service} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          {service}
                        </span>
                      ))}
                    </div>
                  )}
                  {formData.description && <p className="text-sm text-gray-600 mt-2">{formData.description}</p>}
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Available</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Verified</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
