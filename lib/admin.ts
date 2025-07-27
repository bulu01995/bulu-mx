import { supabase } from "./supabase"

// Admin User Types
export interface AdminUser {
  id: string
  email: string
  full_name: string
  role: "super_admin" | "admin" | "moderator" | "viewer"
  is_active: boolean
  last_login: string | null
  created_at: string
  updated_at: string
}

export interface AdminActivityLog {
  id: string
  admin_user_id: string | null
  action: string
  resource_type: string | null
  resource_id: string | null
  details: any
  ip_address: string | null
  user_agent: string | null
  created_at: string
}

export interface SystemSetting {
  id: string
  setting_key: string
  setting_value: string | null
  setting_type: "string" | "number" | "boolean" | "json"
  description: string | null
  is_public: boolean
  created_at: string
  updated_at: string
}

export interface AdminNotification {
  id: string
  admin_user_id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  is_read: boolean
  action_url: string | null
  created_at: string
}

// Admin Users Functions
export async function getAdminUsers() {
  const { data, error } = await supabase.from("admin_users").select("*").order("created_at", { ascending: false })

  if (error) throw error
  return data as AdminUser[]
}

export async function createAdminUser(user: Omit<AdminUser, "id" | "created_at" | "updated_at" | "last_login">) {
  const { data, error } = await supabase.from("admin_users").insert([user]).select().single()

  if (error) throw error
  return data as AdminUser
}

export async function updateAdminUser(id: string, updates: Partial<AdminUser>) {
  const { data, error } = await supabase.from("admin_users").update(updates).eq("id", id).select().single()

  if (error) throw error
  return data as AdminUser
}

export async function deleteAdminUser(id: string) {
  const { error } = await supabase.from("admin_users").delete().eq("id", id)

  if (error) throw error
}

// Activity Log Functions
export async function logAdminActivity(activity: Omit<AdminActivityLog, "id" | "created_at">) {
  const { data, error } = await supabase.from("admin_activity_log").insert([activity]).select().single()

  if (error) throw error
  return data as AdminActivityLog
}

export async function getAdminActivityLog(limit = 100) {
  const { data, error } = await supabase
    .from("admin_activity_log")
    .select(`
      *,
      admin_users(full_name, email)
    `)
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error) throw error
  return data
}

// System Settings Functions
export async function getSystemSettings() {
  const { data, error } = await supabase.from("system_settings").select("*").order("setting_key")

  if (error) throw error
  return data as SystemSetting[]
}

export async function getSystemSetting(key: string) {
  const { data, error } = await supabase.from("system_settings").select("*").eq("setting_key", key).single()

  if (error) throw error
  return data as SystemSetting
}

export async function updateSystemSetting(key: string, value: string) {
  const { data, error } = await supabase
    .from("system_settings")
    .update({ setting_value: value })
    .eq("setting_key", key)
    .select()
    .single()

  if (error) throw error
  return data as SystemSetting
}

// Admin Notifications Functions
export async function getAdminNotifications(adminUserId: string) {
  const { data, error } = await supabase
    .from("admin_notifications")
    .select("*")
    .eq("admin_user_id", adminUserId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data as AdminNotification[]
}

export async function createAdminNotification(notification: Omit<AdminNotification, "id" | "created_at">) {
  const { data, error } = await supabase.from("admin_notifications").insert([notification]).select().single()

  if (error) throw error
  return data as AdminNotification
}

export async function markNotificationAsRead(id: string) {
  const { data, error } = await supabase
    .from("admin_notifications")
    .update({ is_read: true })
    .eq("id", id)
    .select()
    .single()

  if (error) throw error
  return data as AdminNotification
}

// Dashboard Stats Functions
export async function getAdminDashboardStats() {
  try {
    // Get user count
    const { count: userCount } = await supabase.from("users").select("*", { count: "exact", head: true })

    // Get loan applications count
    const { count: loanCount } = await supabase.from("loan_applications").select("*", { count: "exact", head: true })

    // Get pending loans count
    const { count: pendingLoans } = await supabase
      .from("loan_applications")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending")

    // Get today's applications
    const today = new Date().toISOString().split("T")[0]
    const { count: todayApplications } = await supabase
      .from("loan_applications")
      .select("*", { count: "exact", head: true })
      .gte("created_at", today)

    return {
      totalUsers: userCount || 0,
      totalLoans: loanCount || 0,
      pendingLoans: pendingLoans || 0,
      todayApplications: todayApplications || 0,
    }
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    return {
      totalUsers: 0,
      totalLoans: 0,
      pendingLoans: 0,
      todayApplications: 0,
    }
  }
}
