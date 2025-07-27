-- Drop existing table if it exists to recreate with better structure
DROP TABLE IF EXISTS insurance_applications CASCADE;

-- Create comprehensive insurance_leads table
CREATE TABLE IF NOT EXISTS insurance_leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  email VARCHAR(255),
  age INTEGER,
  gender VARCHAR(10),
  occupation VARCHAR(100),
  annual_income DECIMAL(15,2),
  insurance_type VARCHAR(100) NOT NULL,
  insurance_category VARCHAR(50) NOT NULL, -- car, health, term, investment, etc.
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

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_insurance_leads_type ON insurance_leads(insurance_type);
CREATE INDEX IF NOT EXISTS idx_insurance_leads_category ON insurance_leads(insurance_category);
CREATE INDEX IF NOT EXISTS idx_insurance_leads_status ON insurance_leads(status);
CREATE INDEX IF NOT EXISTS idx_insurance_leads_priority ON insurance_leads(priority);
CREATE INDEX IF NOT EXISTS idx_insurance_leads_created_at ON insurance_leads(created_at);
CREATE INDEX IF NOT EXISTS idx_insurance_leads_phone ON insurance_leads(phone_number);
CREATE INDEX IF NOT EXISTS idx_insurance_leads_city ON insurance_leads(city);
CREATE INDEX IF NOT EXISTS idx_insurance_leads_assigned ON insurance_leads(assigned_to);

-- Create composite indexes for common queries
CREATE INDEX IF NOT EXISTS idx_insurance_leads_status_priority ON insurance_leads(status, priority);
CREATE INDEX IF NOT EXISTS idx_insurance_leads_type_status ON insurance_leads(insurance_type, status);

-- Enable RLS (Row Level Security)
ALTER TABLE insurance_leads ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (adjust based on your auth requirements)
CREATE POLICY "Allow all operations on insurance_leads" ON insurance_leads
FOR ALL USING (true);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_insurance_leads_updated_at 
    BEFORE UPDATE ON insurance_leads 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data for testing
INSERT INTO insurance_leads (
  full_name, phone_number, insurance_type, insurance_category, city, 
  email, age, gender, occupation, annual_income, sum_assured, premium_budget
) VALUES
('Ajay Kumar', '9142647797', 'car-insurance', 'vehicle', 'Khunti', 'ajay@example.com', 32, 'male', 'Engineer', 800000, 500000, 15000),
('Priya Sharma', '8765432109', 'health-insurance', 'health', 'Ranchi', 'priya@example.com', 28, 'female', 'Teacher', 600000, 300000, 12000),
('Rahul Singh', '7654321098', 'term-insurance', 'life', 'Dhanbad', 'rahul@example.com', 35, 'male', 'Business', 1200000, 1000000, 25000),
('Sunita Devi', '9876543210', 'investment-plans', 'investment', 'Jamshedpur', 'sunita@example.com', 40, 'female', 'Doctor', 1500000, 800000, 30000);
