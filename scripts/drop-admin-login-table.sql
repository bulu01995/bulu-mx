-- Drop admin login related tables
DROP TABLE IF EXISTS admin_sessions CASCADE;
DROP TABLE IF EXISTS admin_login_attempts CASCADE;

-- Drop related functions
DROP FUNCTION IF EXISTS update_admin_login_updated_at();
DROP FUNCTION IF EXISTS clean_expired_admin_sessions();

-- Remove any admin login related columns from admin_users table if they exist
ALTER TABLE admin_users DROP COLUMN IF EXISTS password_hash;
ALTER TABLE admin_users DROP COLUMN IF EXISTS session_token;
ALTER TABLE admin_users DROP COLUMN IF EXISTS session_expires_at;
ALTER TABLE admin_users DROP COLUMN IF EXISTS login_attempts;
ALTER TABLE admin_users DROP COLUMN IF EXISTS locked_until;

-- Verify tables are dropped
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('admin_sessions', 'admin_login_attempts');
