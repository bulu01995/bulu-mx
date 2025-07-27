import { supabase, type LoanApplication } from "./supabase"

// Create loan application
export async function createLoanApplication(application: Omit<LoanApplication, "id" | "created_at" | "status">) {
  const { data, error } = await supabase.from("loan_applications").insert([application]).select().single()

  if (error) throw error
  return data
}

// Get all loan applications
export async function getLoanApplications() {
  const { data, error } = await supabase.from("loan_applications").select("*").order("created_at", { ascending: false })

  if (error) throw error
  return data
}

// Update loan application status
export async function updateLoanApplicationStatus(id: string, status: LoanApplication["status"]) {
  const { data, error } = await supabase.from("loan_applications").update({ status }).eq("id", id).select().single()

  if (error) throw error
  return data
}
