-- First, let's check what tables currently exist and their structure
-- This script will help identify inconsistencies and missing elements

-- Check if insurance_leads table exists, if not create it
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'insurance_leads') THEN
        -- Create the comprehensive insurance_leads table
        CREATE TABLE insurance_leads (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            full_name VARCHAR(255) NOT NULL,
            phone_number VARCHAR(20) NOT NULL,
            email VARCHAR(255),
            age INTEGER,
            gender VARCHAR(10),
            occupation VARCHAR(100),
            annual_income DECIMAL(15,2),
            insurance_type VARCHAR(100) NOT NULL,
            insurance_category VARCHAR(50) NOT NULL,
            state VARCHAR(100) DEFAULT 'Jharkhand',
            city VARCHAR(100) NOT NULL,
            pincode VARCHAR(10),
            existing_insurance BOOLEAN DEFAULT false,
            sum_assured DECIMAL(15,2),
            premium_budget DECIMAL(10,2),
            policy_term INTEGER,
            additional_info TEXT,
            lead_source VARCHAR(50) DEFAULT 'website',
            status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'qualified', 'converted', 'rejected', 'follow_up')),
            priority VARCHAR(10) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
            assigned_to VARCHAR(100),
            notes TEXT,
            follow_up_date TIMESTAMP WITH TIME ZONE,
            contacted_at TIMESTAMP WITH TIME ZONE,
            converted_at TIMESTAMP WITH TIME ZONE,
            ip_address INET,
            user_agent TEXT,
            referrer_url TEXT,
            utm_source VARCHAR(100),
            utm_medium VARCHAR(100),
            utm_campaign VARCHAR(100),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        -- Create indexes
        CREATE INDEX idx_insurance_leads_type ON insurance_leads(insurance_type);
        CREATE INDEX idx_insurance_leads_category ON insurance_leads(insurance_category);
        CREATE INDEX idx_insurance_leads_status ON insurance_leads(status);
        CREATE INDEX idx_insurance_leads_priority ON insurance_leads(priority);
        CREATE INDEX idx_insurance_leads_created_at ON insurance_leads(created_at);
        CREATE INDEX idx_insurance_leads_phone ON insurance_leads(phone_number);
        CREATE INDEX idx_insurance_leads_city ON insurance_leads(city);
        
        -- Enable RLS
        ALTER TABLE insurance_leads ENABLE ROW LEVEL SECURITY;
        CREATE POLICY "Allow all operations on insurance_leads" ON insurance_leads FOR ALL USING (true);
    END IF;
END $$;

-- Check if loan_applications table has proper structure
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'loan_applications' AND column_name = 'user_id') THEN
        -- Add missing user_id column to loan_applications if it doesn't exist
        ALTER TABLE loan_applications ADD COLUMN user_id UUID REFERENCES users(id);
    END IF;
END $$;

-- Ensure all required tables exist with proper structure
CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password_hash VARCHAR(255) NOT NULL,
    email_verified BOOLEAN DEFAULT FALSE,
    phone_verified BOOLEAN DEFAULT FALSE,
    role VARCHAR(20) DEFAULT 'customer' CHECK (role IN ('customer', 'admin', 'professional')),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
    profile_image_url TEXT,
    date_of_birth DATE,
    gender VARCHAR(10) CHECK (gender IN ('male', 'female', 'other')),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(10),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login_at TIMESTAMP WITH TIME ZONE
);

-- Insert sample data for testing
INSERT INTO insurance_leads (
    full_name, phone_number, insurance_type, insurance_category, city, 
    email, age, gender, occupation, annual_income, sum_assured, premium_budget, status
) VALUES
('Ajay Kumar', '9142647797', 'car-insurance', 'vehicle', 'Khunti', 'ajay@example.com', 32, 'male', 'Engineer', 800000, 500000, 15000, 'pending'),
('Priya Sharma', '8765432109', 'health-insurance', 'health', 'Ranchi', 'priya@example.com', 28, 'female', 'Teacher', 600000, 300000, 12000, 'contacted'),
('Rahul Singh', '7654321098', 'term-insurance', 'life', 'Dhanbad', 'rahul@example.com', 35, 'male', 'Business', 1200000, 1000000, 25000, 'qualified'),
('Sunita Devi', '9876543210', 'investment-plans', 'investment', 'Jamshedpur', 'sunita@example.com', 40, 'female', 'Doctor', 1500000, 800000, 30000, 'converted'),
('Ravi Kumar', '9988776655', 'bike-insurance', 'vehicle', 'Bokaro', 'ravi@example.com', 26, 'male', 'Student', 300000, 100000, 8000, 'pending'),
('Anita Singh', '8877665544', 'family-health-insurance', 'health', 'Deoghar', 'anita@example.com', 35, 'female', 'Housewife', 500000, 500000, 20000, 'follow_up'),
('Manoj Gupta', '7766554433', 'business-insurance', 'business', 'Hazaribagh', 'manoj@example.com', 42, 'male', 'Business Owner', 2000000, 1500000, 50000, 'contacted'),
('Kavita Devi', '6655443322', 'guaranteed-return-plans', 'investment', 'Giridih', 'kavita@example.com', 38, 'female', 'Government Employee', 900000, 600000, 18000, 'rejected')
ON CONFLICT (phone_number) DO NOTHING;

-- Insert sample loan applications
INSERT INTO loan_applications (
    full_name, phone_number, loan_type, state, city, 
    loan_amount, monthly_income, employment_type, status
) VALUES
('Amit Sharma', '9876543210', 'Personal Loan', 'Jharkhand', 'Ranchi', 500000, 50000, 'Salaried', 'pending'),
('Neha Gupta', '8765432109', 'Home Loan', 'Jharkhand', 'Dhanbad', 2500000, 80000, 'Salaried', 'approved'),
('Rajesh Kumar', '7654321098', 'Business Loan', 'Jharkhand', 'Jamshedpur', 1000000, 120000, 'Self Employed', 'under_review'),
('Pooja Singh', '6543210987', 'Car Loan', 'Jharkhand', 'Bokaro', 800000, 60000, 'Salaried', 'rejected'),
('Vikash Yadav', '5432109876', 'Education Loan', 'Jharkhand', 'Deoghar', 300000, 40000, 'Student', 'pending')
ON CONFLICT DO NOTHING;

-- Create admin users if not exists
INSERT INTO admin_users (email, password_hash, full_name, role) VALUES
('admin@bulu.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6hsxq5S/kS', 'System Administrator', 'super_admin'),
('manager@bulu.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6hsxq5S/kS', 'Insurance Manager', 'admin')
ON CONFLICT (email) DO NOTHING;
