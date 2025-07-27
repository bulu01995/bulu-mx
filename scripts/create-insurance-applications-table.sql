-- Create insurance_applications table
CREATE TABLE IF NOT EXISTS insurance_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  insurance_type VARCHAR(100) NOT NULL,
  state VARCHAR(100) DEFAULT 'Jharkhand',
  city VARCHAR(100) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'converted', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_insurance_applications_type ON insurance_applications(insurance_type);
CREATE INDEX IF NOT EXISTS idx_insurance_applications_status ON insurance_applications(status);
CREATE INDEX IF NOT EXISTS idx_insurance_applications_created_at ON insurance_applications(created_at);

-- Enable RLS (Row Level Security)
ALTER TABLE insurance_applications ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (adjust based on your auth requirements)
CREATE POLICY "Allow all operations on insurance_applications" ON insurance_applications
FOR ALL USING (true);

-- Insert some sample data for testing
INSERT INTO insurance_applications (full_name, phone_number, insurance_type, city) VALUES
('John Doe', '9876543210', 'car-insurance', 'Ranchi'),
('Jane Smith', '8765432109', 'health-insurance', 'Dhanbad'),
('Mike Johnson', '7654321098', 'term-insurance', 'Jamshedpur'),
('Sarah Wilson', '6543210987', 'investment-plans', 'Bokaro');
