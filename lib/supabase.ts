import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type LoanApplication = {
  id: string
  full_name: string
  phone_number: string
  loan_type: string
  state: string
  city: string
  status: "pending" | "approved" | "rejected"
  created_at: string
}
