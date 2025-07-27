import { supabase } from "./supabase"
import bcrypt from "bcryptjs"

export type User = {
  id: string
  full_name: string
  email: string
  phone?: string
  role: "customer" | "admin" | "professional"
  status: "active" | "inactive" | "suspended"
  email_verified: boolean
  phone_verified: boolean
  profile_image_url?: string
  created_at: string
  last_login_at?: string
}

export type SignUpData = {
  full_name: string
  email: string
  phone?: string
  password: string
}

export type SignInData = {
  email: string
  password: string
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12
  return await bcrypt.hash(password, saltRounds)
}

// Verify password
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword)
}

// Sign up new user
export async function signUp(userData: SignUpData): Promise<{ user: User | null; error: string | null }> {
  try {
    console.log("Starting sign up process for:", userData.email)

    // Check if user already exists
    const { data: existingUser, error: checkError } = await supabase
      .from("users")
      .select("id")
      .eq("email", userData.email)
      .maybeSingle()

    if (checkError) {
      console.error("Error checking existing user:", checkError)
      return { user: null, error: `Database error: ${checkError.message}` }
    }

    if (existingUser) {
      return { user: null, error: "User with this email already exists" }
    }

    // Hash password
    console.log("Hashing password...")
    const passwordHash = await hashPassword(userData.password)

    // Prepare user data
    const newUserData = {
      full_name: userData.full_name,
      email: userData.email.toLowerCase().trim(),
      phone: userData.phone?.trim(),
      password_hash: passwordHash,
      role: "customer" as const,
      status: "active" as const,
      email_verified: false,
      phone_verified: false,
    }

    console.log("Inserting user data:", { ...newUserData, password_hash: "[HIDDEN]" })

    // Create user
    const { data: user, error: insertError } = await supabase
      .from("users")
      .insert([newUserData])
      .select(`
        id,
        full_name,
        email,
        phone,
        role,
        status,
        email_verified,
        phone_verified,
        profile_image_url,
        created_at,
        last_login_at
      `)
      .single()

    if (insertError) {
      console.error("Error inserting user:", insertError)
      return { user: null, error: `Failed to create account: ${insertError.message}` }
    }

    if (!user) {
      return { user: null, error: "Failed to create account - no user returned" }
    }

    console.log("User created successfully:", user.id)
    return { user: user as User, error: null }
  } catch (error: any) {
    console.error("Unexpected error in signUp:", error)
    return { user: null, error: error.message || "An unexpected error occurred during sign up" }
  }
}

// Sign in user
export async function signIn(credentials: SignInData): Promise<{ user: User | null; error: string | null }> {
  try {
    console.log("Starting sign in process for:", credentials.email)

    // Get user by email
    const { data: user, error: fetchError } = await supabase
      .from("users")
      .select(`
        id,
        full_name,
        email,
        phone,
        password_hash,
        role,
        status,
        email_verified,
        phone_verified,
        profile_image_url,
        created_at,
        last_login_at
      `)
      .eq("email", credentials.email.toLowerCase().trim())
      .maybeSingle()

    if (fetchError) {
      console.error("Error fetching user:", fetchError)
      return { user: null, error: "Database error occurred" }
    }

    if (!user) {
      return { user: null, error: "Invalid email or password" }
    }

    // Check if account is active
    if (user.status !== "active") {
      return { user: null, error: "Account is inactive. Please contact support." }
    }

    // Verify password
    console.log("Verifying password...")
    const isValidPassword = await verifyPassword(credentials.password, user.password_hash)
    if (!isValidPassword) {
      return { user: null, error: "Invalid email or password" }
    }

    // Update last login
    await supabase.from("users").update({ last_login_at: new Date().toISOString() }).eq("id", user.id)

    // Remove password_hash from returned user object
    const { password_hash, ...userWithoutPassword } = user
    console.log("Sign in successful for user:", user.id)
    return { user: userWithoutPassword as User, error: null }
  } catch (error: any) {
    console.error("Unexpected error in signIn:", error)
    return { user: null, error: error.message || "An unexpected error occurred during sign in" }
  }
}

// Get user by ID
export async function getUserById(userId: string): Promise<{ user: User | null; error: string | null }> {
  try {
    const { data: user, error } = await supabase
      .from("users")
      .select(`
        id,
        full_name,
        email,
        phone,
        role,
        status,
        email_verified,
        phone_verified,
        profile_image_url,
        created_at,
        last_login_at
      `)
      .eq("id", userId)
      .single()

    if (error) {
      return { user: null, error: error.message }
    }

    return { user: user as User, error: null }
  } catch (error: any) {
    return { user: null, error: error.message || "An error occurred while fetching user" }
  }
}

// Update user profile
export async function updateUserProfile(
  userId: string,
  updates: Partial<Pick<User, "full_name" | "phone" | "profile_image_url">>,
): Promise<{ user: User | null; error: string | null }> {
  try {
    const { data: user, error } = await supabase
      .from("users")
      .update(updates)
      .eq("id", userId)
      .select(`
        id,
        full_name,
        email,
        phone,
        role,
        status,
        email_verified,
        phone_verified,
        profile_image_url,
        created_at,
        last_login_at
      `)
      .single()

    if (error) {
      return { user: null, error: error.message }
    }

    return { user: user as User, error: null }
  } catch (error: any) {
    return { user: null, error: error.message || "An error occurred while updating profile" }
  }
}

// Change password
export async function changePassword(
  userId: string,
  currentPassword: string,
  newPassword: string,
): Promise<{ success: boolean; error: string | null }> {
  try {
    // Get current password hash
    const { data: user, error } = await supabase.from("users").select("password_hash").eq("id", userId).single()

    if (error || !user) {
      return { success: false, error: "User not found" }
    }

    // Verify current password
    const isValidPassword = await verifyPassword(currentPassword, user.password_hash)
    if (!isValidPassword) {
      return { success: false, error: "Current password is incorrect" }
    }

    // Hash new password
    const newPasswordHash = await hashPassword(newPassword)

    // Update password
    const { error: updateError } = await supabase
      .from("users")
      .update({ password_hash: newPasswordHash })
      .eq("id", userId)

    if (updateError) {
      return { success: false, error: updateError.message }
    }

    return { success: true, error: null }
  } catch (error: any) {
    return { success: false, error: error.message || "An error occurred while changing password" }
  }
}
