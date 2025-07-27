import { supabase } from "./supabase"

export type LabourProfile = {
  id: string
  name: string
  phone: string
  email?: string
  city: string
  area: string
  profile_image?: string
  rating: number
  total_jobs: number
  is_verified: boolean
  is_available: boolean
  experience_years: number
  created_at: string
  updated_at: string
}

export type LabourService = {
  id: string
  labour_id: string
  service_type: string
  description?: string
  min_rate: number
  max_rate: number
  available: boolean
  created_at: string
}

export type LabourApplication = {
  id: string
  name: string
  phone: string
  email?: string
  area: string
  services: string[]
  experience_years: number
  description?: string
  documents: string[]
  status: "pending" | "approved" | "rejected"
  rejection_reason?: string
  applied_date: string
  reviewed_date?: string
  reviewed_by?: string
}

export type LabourBooking = {
  id: string
  client_name: string
  client_phone: string
  service_type: string
  preferred_date: string
  time_slot: string
  area: string
  urgency: "normal" | "emergency"
  notes?: string
  labour_id?: string
  status: "pending" | "assigned" | "in_progress" | "completed" | "cancelled"
  created_at: string
  completed_at?: string
}

export type WorkHistory = {
  id: string
  labour_id: string
  booking_id: string
  client_name: string
  service_type: string
  work_date: string
  rating?: number
  feedback?: string
  amount_paid?: number
  created_at: string
}

// Get all labour profiles with their services
export async function getAllLabourProfiles(filters?: {
  service_type?: string
  area?: string
  available_only?: boolean
  verified_only?: boolean
  search?: string
}) {
  let query = supabase
    .from("labour_profiles")
    .select(`
      *,
      labour_services (*)
    `)
    .order("created_at", { ascending: false })

  if (filters?.available_only) {
    query = query.eq("is_available", true)
  }

  if (filters?.verified_only) {
    query = query.eq("is_verified", true)
  }

  if (filters?.area) {
    query = query.eq("area", filters.area)
  }

  if (filters?.search) {
    query = query.or(`name.ilike.%${filters.search}%,phone.ilike.%${filters.search}%`)
  }

  const { data, error } = await query

  if (error) throw error

  // Filter by service type if specified
  if (filters?.service_type) {
    return (
      data?.filter((labour) =>
        labour.labour_services.some(
          (service: LabourService) => service.service_type === filters.service_type && service.available,
        ),
      ) || []
    )
  }

  return data || []
}

// Get labour applications
export async function getLabourApplications(status?: string) {
  let query = supabase.from("labour_applications").select("*").order("applied_date", { ascending: false })

  if (status) {
    query = query.eq("status", status)
  }

  const { data, error } = await query
  if (error) throw error
  return data || []
}

// Create labour application
export async function createLabourApplication(application: Omit<LabourApplication, "id" | "applied_date" | "status">) {
  const { data, error } = await supabase
    .from("labour_applications")
    .insert([{ ...application, status: "pending", applied_date: new Date().toISOString() }])
    .select()
    .single()

  if (error) throw error
  return data
}

// Update labour application status
export async function updateLabourApplicationStatus(
  id: string,
  status: "approved" | "rejected",
  reviewedBy: string,
  rejectionReason?: string,
) {
  const updateData: any = {
    status,
    reviewed_date: new Date().toISOString(),
    reviewed_by: reviewedBy,
  }

  if (rejectionReason) {
    updateData.rejection_reason = rejectionReason
  }

  const { data, error } = await supabase.from("labour_applications").update(updateData).eq("id", id).select().single()

  if (error) throw error

  // If approved, create labour profile
  if (status === "approved") {
    const application = data
    await createLabourProfileFromApplication(application)
  }

  return data
}

// Create labour profile from approved application
async function createLabourProfileFromApplication(application: LabourApplication) {
  // Create auth user first
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email: application.email || `${application.phone}@bulu.com`,
    phone: application.phone,
    password: Math.random().toString(36).slice(-8), // Generate random password
    user_metadata: {
      name: application.name,
      role: "labour",
    },
  })

  if (authError) throw authError

  // Create labour profile
  const { data, error } = await supabase
    .from("labour_profiles")
    .insert([
      {
        name: application.name,
        phone: application.phone,
        email: application.email,
        city: "Ranchi",
        area: application.area,
        experience_years: application.experience_years,
        is_verified: true,
        is_available: true,
        rating: 0,
        total_jobs: 0,
        user_id: authData.user.id,
      },
    ])
    .select()
    .single()

  if (error) throw error

  // Create labour services
  const servicePromises = application.services.map((service) =>
    supabase.from("labour_services").insert([
      {
        labour_id: data.id,
        service_type: service,
        available: true,
        min_rate: 500,
        max_rate: 1000,
      },
    ]),
  )

  await Promise.all(servicePromises)

  return data
}

// Create labour profile manually
export async function createLabourProfile(profile: {
  name: string
  phone: string
  email?: string
  area: string
  services: string[]
  experience_years: number
}) {
  // Create auth user
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email: profile.email || `${profile.phone}@bulu.com`,
    phone: profile.phone,
    password: Math.random().toString(36).slice(-8),
    user_metadata: {
      name: profile.name,
      role: "labour",
    },
  })

  if (authError) throw authError

  // Create labour profile
  const { data, error } = await supabase
    .from("labour_profiles")
    .insert([
      {
        name: profile.name,
        phone: profile.phone,
        email: profile.email,
        city: "Ranchi",
        area: profile.area,
        experience_years: profile.experience_years,
        is_verified: true,
        is_available: true,
        rating: 0,
        total_jobs: 0,
        user_id: authData.user.id,
      },
    ])
    .select()
    .single()

  if (error) throw error

  // Create labour services
  const servicePromises = profile.services.map((service) =>
    supabase.from("labour_services").insert([
      {
        labour_id: data.id,
        service_type: service,
        available: true,
        min_rate: 500,
        max_rate: 1000,
      },
    ]),
  )

  await Promise.all(servicePromises)

  return data
}

// Update labour profile
export async function updateLabourProfile(id: string, updates: Partial<LabourProfile>) {
  const { data, error } = await supabase
    .from("labour_profiles")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single()

  if (error) throw error
  return data
}

// Delete labour profile
export async function deleteLabourProfile(id: string) {
  // Delete related services first
  await supabase.from("labour_services").delete().eq("labour_id", id)

  // Delete work history
  await supabase.from("work_history").delete().eq("labour_id", id)

  // Delete profile
  const { error } = await supabase.from("labour_profiles").delete().eq("id", id)

  if (error) throw error
}

// Get labour bookings
export async function getLabourBookings(labourId?: string) {
  let query = supabase
    .from("labour_bookings")
    .select(`
      *,
      labour_profiles (name, phone, area)
    `)
    .order("created_at", { ascending: false })

  if (labourId) {
    query = query.eq("labour_id", labourId)
  }

  const { data, error } = await query
  if (error) throw error
  return data || []
}

// Create a new booking
export async function createLabourBooking(booking: Omit<LabourBooking, "id" | "created_at" | "status">) {
  const { data, error } = await supabase
    .from("labour_bookings")
    .insert([{ ...booking, status: "pending" }])
    .select()
    .single()

  if (error) throw error
  return data
}

// Get work history
export async function getWorkHistory(labourId?: string) {
  let query = supabase.from("work_history").select("*").order("work_date", { ascending: false })

  if (labourId) {
    query = query.eq("labour_id", labourId)
  }

  const { data, error } = await query
  if (error) throw error
  return data || []
}

// Get labour performance stats
export async function getLabourPerformanceStats(labourId: string) {
  const { data: workHistory, error: workError } = await supabase
    .from("work_history")
    .select("*")
    .eq("labour_id", labourId)

  const { data: bookings, error: bookingsError } = await supabase
    .from("labour_bookings")
    .select("*")
    .eq("labour_id", labourId)

  if (workError || bookingsError) throw workError || bookingsError

  const totalJobs = workHistory?.length || 0
  const completedJobs = bookings?.filter((b) => b.status === "completed").length || 0
  const pendingJobs = bookings?.filter((b) => b.status === "pending").length || 0
  const averageRating = workHistory?.reduce((acc, w) => acc + (w.rating || 0), 0) / totalJobs || 0
  const totalEarnings = workHistory?.reduce((acc, w) => acc + (w.amount_paid || 0), 0) || 0

  return {
    totalJobs,
    completedJobs,
    pendingJobs,
    averageRating,
    totalEarnings,
    workHistory: workHistory || [],
    recentBookings: bookings?.slice(0, 5) || [],
  }
}

// Reset labour password
export async function resetLabourPassword(userId: string, newPassword: string) {
  const { data, error } = await supabase.auth.admin.updateUserById(userId, {
    password: newPassword,
  })

  if (error) throw error
  return data
}

// Toggle labour access
export async function toggleLabourAccess(userId: string, disabled: boolean) {
  const { data, error } = await supabase.auth.admin.updateUserById(userId, {
    user_metadata: { disabled },
  })

  if (error) throw error
  return data
}

// -----------------------------------------------------------------------------
// Legacy API aliases (kept for backward compatibility with older pages)
// -----------------------------------------------------------------------------
export const getLabourProfiles = getAllLabourProfiles
