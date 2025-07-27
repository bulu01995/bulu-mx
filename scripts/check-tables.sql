-- Check if our required tables exist
SELECT table_name, table_type 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('loan_applications', 'insurance_applications', 'users')
ORDER BY table_name;
