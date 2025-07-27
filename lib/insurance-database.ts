import { supabase } from "./supabase"

export interface InsuranceLead {
  id: string
  full_name: string
  phone_number: string
  email?: string
  age?: number
  gender?: string
  occupation?: string
  annual_income?: number
  insurance_type: string
  insurance_category: string
  state: string
  city: string
  pincode?: string
  existing_insurance?: boolean
  sum_assured?: number
  premium_budget?: number
  policy_term?: number
  additional_info?: string
  lead_source: string
  status: "pending" | "contacted" | "qualified" | "converted" | "rejected" | "follow_up"
  priority: "low" | "medium" | "high" | "urgent"
  assigned_to?: string
  notes?: string
  follow_up_date?: string
  contacted_at?: string
  converted_at?: string
  ip_address?: string
  user_agent?: string
  referrer_url?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  created_at: string
  updated_at: string
}

export interface InsuranceStats {
  total: number
  pending: number
  contacted: number
  qualified: number
  converted: number
  rejected: number
  follow_up: number
}

export interface CreateInsuranceLeadData {
  full_name: string
  phone_number: string
  insurance_type: string
  insurance_category: string
  city: string
  state?: string
  email?: string
  age?: number
  gender?: string
  occupation?: string
  annual_income?: number
  sum_assured?: number
  premium_budget?: number
  policy_term?: number
  additional_info?: string
  existing_insurance?: boolean
  pincode?: string
  lead_source?: string
  ip_address?: string
  user_agent?: string
  referrer_url?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
}

export async function createInsuranceLead(data: CreateInsuranceLeadData): Promise<InsuranceLead> {
  try {
    console.log("Creating insurance lead with data:", data)

    const leadData = {
      full_name: data.full_name.trim(),
      phone_number: data.phone_number.trim(),
      insurance_type: data.insurance_type,
      insurance_category: data.insurance_category,
      city: data.city,
      state: data.state || "Jharkhand",
      email: data.email?.trim() || null,
      age: data.age || null,
      gender: data.gender || null,
      occupation: data.occupation?.trim() || null,
      annual_income: data.annual_income || null,
      sum_assured: data.sum_assured || null,
      premium_budget: data.premium_budget || null,
      policy_term: data.policy_term || null,
      additional_info: data.additional_info?.trim() || null,
      existing_insurance: data.existing_insurance || false,
      pincode: data.pincode?.trim() || null,
      lead_source: data.lead_source || "website",
      ip_address: data.ip_address || null,
      user_agent: data.user_agent || null,
      referrer_url: data.referrer_url || null,
      utm_source: data.utm_source || null,
      utm_medium: data.utm_medium || null,
      utm_campaign: data.utm_campaign || null,
    }

    const { data: result, error } = await supabase.from("insurance_leads").insert([leadData]).select().single()

    if (error) {
      console.error("Supabase error creating insurance lead:", error)
      throw new Error(`Failed to create insurance lead: ${error.message}`)
    }

    if (!result) {
      throw new Error("No data returned from insurance lead creation")
    }

    console.log("Insurance lead created successfully:", result.id)
    return result as InsuranceLead
  } catch (error) {
    console.error("Error in createInsuranceLead:", error)
    throw error
  }
}

export async function getInsuranceLeads(filters?: {
  insurance_type?: string
  insurance_category?: string
  status?: string
  priority?: string
  search?: string
  assigned_to?: string
  limit?: number
  offset?: number
}): Promise<InsuranceLead[]> {
  try {
    let query = supabase.from("insurance_leads").select("*").order("created_at", { ascending: false })

    if (filters?.insurance_type) {
      query = query.eq("insurance_type", filters.insurance_type)
    }

    if (filters?.insurance_category) {
      query = query.eq("insurance_category", filters.insurance_category)
    }

    if (filters?.status) {
      query = query.eq("status", filters.status)
    }

    if (filters?.priority) {
      query = query.eq("priority", filters.priority)
    }

    if (filters?.assigned_to) {
      query = query.eq("assigned_to", filters.assigned_to)
    }

    if (filters?.search) {
      query = query.or(
        `full_name.ilike.%${filters.search}%,phone_number.ilike.%${filters.search}%,email.ilike.%${filters.search}%`,
      )
    }

    if (filters?.limit) {
      query = query.limit(filters.limit)
    }

    if (filters?.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 50) - 1)
    }

    const { data, error } = await query

    if (error) {
      console.error("Error fetching insurance leads:", error)
      throw new Error(`Failed to fetch insurance leads: ${error.message}`)
    }

    return (data || []) as InsuranceLead[]
  } catch (error) {
    console.error("Error in getInsuranceLeads:", error)
    throw error
  }
}

export async function updateInsuranceLeadStatus(
  id: string,
  status: InsuranceLead["status"],
  notes?: string,
  assigned_to?: string,
): Promise<InsuranceLead> {
  try {
    const updateData: any = {
      status,
      updated_at: new Date().toISOString(),
    }

    if (notes) {
      updateData.notes = notes
    }

    if (assigned_to) {
      updateData.assigned_to = assigned_to
    }

    if (status === "contacted") {
      updateData.contacted_at = new Date().toISOString()
    }

    if (status === "converted") {
      updateData.converted_at = new Date().toISOString()
    }

    const { data, error } = await supabase.from("insurance_leads").update(updateData).eq("id", id).select().single()

    if (error) {
      console.error("Error updating insurance lead status:", error)
      throw new Error(`Failed to update insurance lead: ${error.message}`)
    }

    return data as InsuranceLead
  } catch (error) {
    console.error("Error in updateInsuranceLeadStatus:", error)
    throw error
  }
}

export async function getInsuranceStats(): Promise<InsuranceStats> {
  try {
    const { data, error } = await supabase.from("insurance_leads").select("status")

    if (error) {
      console.error("Error fetching insurance stats:", error)
      throw new Error(`Failed to fetch insurance stats: ${error.message}`)
    }

    const stats = (data || []).reduce(
      (acc, lead) => {
        acc.total++
        if (lead.status in acc) {
          acc[lead.status as keyof InsuranceStats]++
        }
        return acc
      },
      {
        total: 0,
        pending: 0,
        contacted: 0,
        qualified: 0,
        converted: 0,
        rejected: 0,
        follow_up: 0,
      },
    )

    return stats
  } catch (error) {
    console.error("Error in getInsuranceStats:", error)
    return {
      total: 0,
      pending: 0,
      contacted: 0,
      qualified: 0,
      converted: 0,
      rejected: 0,
      follow_up: 0,
    }
  }
}

export async function getInsuranceStatsByCategory() {
  try {
    const { data, error } = await supabase.from("insurance_leads").select("insurance_category, status")

    if (error) {
      console.error("Error fetching insurance stats by category:", error)
      throw new Error(`Failed to fetch insurance stats by category: ${error.message}`)
    }

    const statsByCategory: Record<string, InsuranceStats> = {}
    ;(data || []).forEach((lead) => {
      if (!statsByCategory[lead.insurance_category]) {
        statsByCategory[lead.insurance_category] = {
          total: 0,
          pending: 0,
          contacted: 0,
          qualified: 0,
          converted: 0,
          rejected: 0,
          follow_up: 0,
        }
      }
      statsByCategory[lead.insurance_category].total++
      if (lead.status in statsByCategory[lead.insurance_category]) {
        statsByCategory[lead.insurance_category][lead.status as keyof InsuranceStats]++
      }
    })

    return statsByCategory
  } catch (error) {
    console.error("Error in getInsuranceStatsByCategory:", error)
    return {}
  }
}

export function exportInsuranceLeadsToCSV(leads: InsuranceLead[]) {
  try {
    const headers = [
      "Name",
      "Phone",
      "Email",
      "Insurance Type",
      "Category",
      "City",
      "State",
      "Status",
      "Priority",
      "Sum Assured",
      "Premium Budget",
      "Created At",
      "Updated At",
    ]

    const csvContent = [
      headers.join(","),
      ...leads.map((lead) =>
        [
          `"${lead.full_name}"`,
          `"${lead.phone_number}"`,
          `"${lead.email || ""}"`,
          `"${lead.insurance_type}"`,
          `"${lead.insurance_category}"`,
          `"${lead.city}"`,
          `"${lead.state}"`,
          `"${lead.status}"`,
          `"${lead.priority}"`,
          `"${lead.sum_assured || ""}"`,
          `"${lead.premium_budget || ""}"`,
          `"${new Date(lead.created_at).toLocaleDateString()}"`,
          `"${new Date(lead.updated_at).toLocaleDateString()}"`,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `insurance-leads-${new Date().toISOString().split("T")[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error("Error exporting CSV:", error)
    alert("Failed to export CSV. Please try again.")
  }
}

export function getClientInfo() {
  if (typeof window === "undefined") {
    return {
      user_agent: "",
      referrer_url: "",
    }
  }

  return {
    user_agent: window.navigator.userAgent,
    referrer_url: document.referrer,
  }
}

export function getUTMParameters() {
  if (typeof window === "undefined") return {}

  const urlParams = new URLSearchParams(window.location.search)
  return {
    utm_source: urlParams.get("utm_source") || undefined,
    utm_medium: urlParams.get("utm_medium") || undefined,
    utm_campaign: urlParams.get("utm_campaign") || undefined,
  }
}
