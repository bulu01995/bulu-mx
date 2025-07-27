import { supabase } from "./supabase"
import type { User } from "./auth"

export type Session = {
  id: string
  user_id: string
  session_token: string
  expires_at: string
  created_at: string
  ip_address?: string
  user_agent?: string
}

// Create session
export async function createSession(
  userId: string,
  ipAddress?: string,
  userAgent?: string,
): Promise<{ session: Session | null; error: string | null }> {
  try {
    // Generate session token
    const sessionToken = generateSessionToken()

    // Set expiration to 30 days from now
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 30)

    const { data: session, error } = await supabase
      .from("user_sessions")
      .insert([
        {
          user_id: userId,
          session_token: sessionToken,
          expires_at: expiresAt.toISOString(),
          ip_address: ipAddress,
          user_agent: userAgent,
        },
      ])
      .select()
      .single()

    if (error) {
      return { session: null, error: error.message }
    }

    return { session: session as Session, error: null }
  } catch (error: any) {
    return { session: null, error: error.message || "An error occurred while creating session" }
  }
}

// Get session by token
export async function getSessionByToken(
  sessionToken: string,
): Promise<{ session: Session | null; user: User | null; error: string | null }> {
  try {
    const { data: session, error } = await supabase
      .from("user_sessions")
      .select(`
        *,
        users (
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
        )
      `)
      .eq("session_token", sessionToken)
      .gt("expires_at", new Date().toISOString())
      .single()

    if (error || !session) {
      return { session: null, user: null, error: "Invalid or expired session" }
    }

    return {
      session: session as Session,
      user: session.users as User,
      error: null,
    }
  } catch (error: any) {
    return { session: null, user: null, error: error.message || "An error occurred while validating session" }
  }
}

// Delete session
export async function deleteSession(sessionToken: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const { error } = await supabase.from("user_sessions").delete().eq("session_token", sessionToken)

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true, error: null }
  } catch (error: any) {
    return { success: false, error: error.message || "An error occurred while deleting session" }
  }
}

// Clean up expired sessions
export async function cleanupExpiredSessions(): Promise<{ success: boolean; error: string | null }> {
  try {
    const { error } = await supabase.from("user_sessions").delete().lt("expires_at", new Date().toISOString())

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true, error: null }
  } catch (error: any) {
    return { success: false, error: error.message || "An error occurred while cleaning up sessions" }
  }
}

// Generate secure session token
function generateSessionToken(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let result = ""
  for (let i = 0; i < 64; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}
