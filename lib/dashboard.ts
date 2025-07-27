import { supabase } from "./supabase"

export type Notification = {
  id: string
  user_id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  is_read: boolean
  action_url?: string
  created_at: string
}

export type UserPreferences = {
  id: string
  user_id: string
  email_notifications: boolean
  sms_notifications: boolean
  marketing_emails: boolean
  language: string
  theme: string
  currency: string
  created_at: string
  updated_at: string
}

export type UserDocument = {
  id: string
  user_id: string
  document_type: string
  document_name: string
  file_url: string
  file_size?: number
  mime_type?: string
  verification_status: "pending" | "verified" | "rejected"
  uploaded_at: string
  verified_at?: string
  verified_by?: string
}

export type LoanStatusHistory = {
  id: string
  loan_application_id: string
  old_status?: string
  new_status: string
  changed_by?: string
  change_reason?: string
  created_at: string
}

export type UserActivity = {
  id: string
  user_id: string
  activity_type: string
  description?: string
  ip_address?: string
  user_agent?: string
  created_at: string
}

// Dashboard Statistics
export async function getDashboardStats(userId: string) {
  try {
    // Get loan applications count
    const { data: loanApps, error: loanError } = await supabase
      .from("loan_applications")
      .select("id, status")
      .eq("user_id", userId)

    if (loanError) throw loanError

    // Get documents count
    const { data: documents, error: docError } = await supabase
      .from("user_documents")
      .select("id, verification_status")
      .eq("user_id", userId)

    if (docError) throw docError

    // Get unread notifications count
    const { data: notifications, error: notifError } = await supabase
      .from("notifications")
      .select("id")
      .eq("user_id", userId)
      .eq("is_read", false)

    if (notifError) throw notifError

    return {
      totalLoans: loanApps?.length || 0,
      activeLoans: loanApps?.filter((loan) => loan.status === "approved").length || 0,
      pendingLoans: loanApps?.filter((loan) => loan.status === "pending").length || 0,
      totalDocuments: documents?.length || 0,
      verifiedDocuments: documents?.filter((doc) => doc.verification_status === "verified").length || 0,
      pendingDocuments: documents?.filter((doc) => doc.verification_status === "pending").length || 0,
      unreadNotifications: notifications?.length || 0,
    }
  } catch (error: any) {
    console.error("Error fetching dashboard stats:", error)
    throw error
  }
}

// Notifications
export async function getUserNotifications(userId: string, limit = 10) {
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error) throw error
  return data as Notification[]
}

export async function markNotificationAsRead(notificationId: string) {
  const { data, error } = await supabase
    .from("notifications")
    .update({ is_read: true })
    .eq("id", notificationId)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function createNotification(notification: Omit<Notification, "id" | "created_at">) {
  const { data, error } = await supabase.from("notifications").insert([notification]).select().single()

  if (error) throw error
  return data
}

// User Preferences
export async function getUserPreferences(userId: string) {
  const { data, error } = await supabase.from("user_preferences").select("*").eq("user_id", userId).maybeSingle()

  if (error) throw error
  return data as UserPreferences | null
}

export async function updateUserPreferences(userId: string, preferences: Partial<UserPreferences>) {
  const { data, error } = await supabase
    .from("user_preferences")
    .upsert({
      user_id: userId,
      ...preferences,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single()

  if (error) throw error
  return data
}

// User Documents
export async function getUserDocuments(userId: string) {
  const { data, error } = await supabase
    .from("user_documents")
    .select("*")
    .eq("user_id", userId)
    .order("uploaded_at", { ascending: false })

  if (error) throw error
  return data as UserDocument[]
}

export async function uploadUserDocument(document: Omit<UserDocument, "id" | "uploaded_at">) {
  const { data, error } = await supabase.from("user_documents").insert([document]).select().single()

  if (error) throw error
  return data
}

// Loan Status History
export async function getLoanStatusHistory(loanApplicationId: string) {
  const { data, error } = await supabase
    .from("loan_status_history")
    .select(`
      *,
      changed_by_user:users!loan_status_history_changed_by_fkey(full_name)
    `)
    .eq("loan_application_id", loanApplicationId)
    .order("created_at", { ascending: true })

  if (error) throw error
  return data
}

// User Activity Log
export async function logUserActivity(activity: Omit<UserActivity, "id" | "created_at">) {
  const { data, error } = await supabase.from("user_activity_log").insert([activity]).select().single()

  if (error) throw error
  return data
}

export async function getUserActivityLog(userId: string, limit = 20) {
  const { data, error } = await supabase
    .from("user_activity_log")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error) throw error
  return data as UserActivity[]
}

// Enhanced Loan Applications with Status History
export async function getUserLoanApplicationsWithHistory(userId: string) {
  const { data, error } = await supabase
    .from("loan_applications")
    .select(`
      *,
      status_history:loan_status_history(
        id,
        old_status,
        new_status,
        change_reason,
        created_at,
        changed_by_user:users!loan_status_history_changed_by_fkey(full_name)
      )
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}
