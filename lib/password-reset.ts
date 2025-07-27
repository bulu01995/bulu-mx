import { supabase } from "./supabase"
import { hashPassword } from "./auth"
// import crypto from "crypto" // REMOVED

export type PasswordResetRequest = {
  email: string
}

export type PasswordResetConfirm = {
  token: string
  newPassword: string
}

// Generate a cryptographically secure random hex token (64 chars)
function generateResetToken(): string {
  const bytes = new Uint8Array(32) // 32 bytes  =>  64-char hex
  crypto.getRandomValues(bytes) // Web Crypto API (built-in in browsers)
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("")
}

// Request password reset
export async function requestPasswordReset(email: string): Promise<{ success: boolean; error: string | null }> {
  try {
    console.log("Processing password reset request for:", email)

    // Check if user exists
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("id, full_name, email")
      .eq("email", email.toLowerCase().trim())
      .maybeSingle()

    if (userError) {
      console.error("Error checking user:", userError)
      return { success: false, error: "Database error occurred" }
    }

    if (!user) {
      // Don't reveal if email exists or not for security
      return { success: true, error: null }
    }

    // Generate reset token
    const token = generateResetToken()
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000) // 1 hour from now

    // Store reset token
    const { error: tokenError } = await supabase.from("password_reset_tokens").insert([
      {
        user_id: user.id,
        token: token,
        expires_at: expiresAt.toISOString(),
      },
    ])

    if (tokenError) {
      console.error("Error storing reset token:", tokenError)
      return { success: false, error: "Failed to process reset request" }
    }

    // In a real app, you would send an email here
    // For now, we'll log the reset link
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/reset-password?token=${token}`
    console.log("Password reset link:", resetLink)
    console.log("Reset token for testing:", token)

    return { success: true, error: null }
  } catch (error: any) {
    console.error("Unexpected error in requestPasswordReset:", error)
    return { success: false, error: error.message || "An unexpected error occurred" }
  }
}

// Verify reset token
export async function verifyResetToken(
  token: string,
): Promise<{ valid: boolean; userId?: string; error: string | null }> {
  try {
    const { data: resetToken, error } = await supabase
      .from("password_reset_tokens")
      .select("user_id, expires_at, used")
      .eq("token", token)
      .eq("used", false)
      .maybeSingle()

    if (error) {
      console.error("Error verifying reset token:", error)
      return { valid: false, error: "Database error occurred" }
    }

    if (!resetToken) {
      return { valid: false, error: "Invalid or expired reset token" }
    }

    // Check if token is expired
    if (new Date(resetToken.expires_at) < new Date()) {
      return { valid: false, error: "Reset token has expired" }
    }

    return { valid: true, userId: resetToken.user_id, error: null }
  } catch (error: any) {
    console.error("Unexpected error in verifyResetToken:", error)
    return { valid: false, error: error.message || "An unexpected error occurred" }
  }
}

// Reset password with token
export async function resetPassword(
  token: string,
  newPassword: string,
): Promise<{ success: boolean; error: string | null }> {
  try {
    console.log("Processing password reset with token")

    // Verify token first
    const { valid, userId, error: verifyError } = await verifyResetToken(token)
    if (!valid || !userId) {
      return { success: false, error: verifyError || "Invalid reset token" }
    }

    // Hash new password
    const passwordHash = await hashPassword(newPassword)

    // Update user password
    const { error: updateError } = await supabase.from("users").update({ password_hash: passwordHash }).eq("id", userId)

    if (updateError) {
      console.error("Error updating password:", updateError)
      return { success: false, error: "Failed to update password" }
    }

    // Mark token as used
    const { error: tokenError } = await supabase
      .from("password_reset_tokens")
      .update({
        used: true,
        used_at: new Date().toISOString(),
      })
      .eq("token", token)

    if (tokenError) {
      console.error("Error marking token as used:", tokenError)
      // Don't fail the request if we can't mark token as used
    }

    console.log("Password reset successful for user:", userId)
    return { success: true, error: null }
  } catch (error: any) {
    console.error("Unexpected error in resetPassword:", error)
    return { success: false, error: error.message || "An unexpected error occurred" }
  }
}

// Clean up expired tokens (utility function)
export async function cleanupExpiredTokens(): Promise<void> {
  try {
    const { error } = await supabase.from("password_reset_tokens").delete().lt("expires_at", new Date().toISOString())

    if (error) {
      console.error("Error cleaning up expired tokens:", error)
    }
  } catch (error) {
    console.error("Unexpected error cleaning up tokens:", error)
  }
}
