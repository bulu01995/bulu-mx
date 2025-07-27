-- Labour service booking platform tables for Ranchi, Jharkhand

-- Labour profiles table
CREATE TABLE IF NOT EXISTS labour_profiles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    city VARCHAR(50) DEFAULT 'Ranchi',
    area VARCHAR(100) NOT NULL,
    profile_image TEXT,
    rating DECIMAL(2,1) DEFAULT 0.0,
    total_jobs INTEGER DEFAULT 0,
    is_verified BOOLEAN DEFAULT false,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Labour services table
CREATE TABLE IF NOT EXISTS labour_services (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    labour_id UUID REFERENCES labour_profiles(id) ON DELETE CASCADE,
    service_type VARCHAR(50) NOT NULL,
    description TEXT,
    min_rate INTEGER NOT NULL,
    max_rate INTEGER NOT NULL,
    available BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookings table
CREATE TABLE IF NOT EXISTS labour_bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    client_name VARCHAR(100) NOT NULL,
    client_phone VARCHAR(15) NOT NULL,
    service_type VARCHAR(50) NOT NULL,
    preferred_date DATE NOT NULL,
    time_slot VARCHAR(20) NOT NULL,
    area VARCHAR(100) NOT NULL,
    urgency VARCHAR(20) DEFAULT 'Normal',
    notes TEXT,
    labour_id UUID REFERENCES labour_profiles(id),
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Work history table
CREATE TABLE IF NOT EXISTS work_history (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    labour_id UUID REFERENCES labour_profiles(id) ON DELETE CASCADE,
    booking_id UUID REFERENCES labour_bookings(id) ON DELETE CASCADE,
    client_name VARCHAR(100) NOT NULL,
    service_type VARCHAR(50) NOT NULL,
    work_date DATE NOT NULL,
    feedback TEXT,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample labour profiles
INSERT INTO labour_profiles (name, phone, area, rating, total_jobs, is_verified, is_available) VALUES
('Rajesh Kumar', '+91 98765 43210', 'Harmu', 4.8, 45, true, true),
('Sunita Devi', '+91 87654 32109', 'Kanke', 4.9, 32, true, true),
('Amit Singh', '+91 76543 21098', 'Doranda', 4.7, 28, true, false),
('Priya Sharma', '+91 65432 10987', 'Lalpur', 4.6, 22, true, true),
('Ravi Prasad', '+91 54321 09876', 'Bariatu', 4.8, 38, true, true),
('Meera Kumari', '+91 43210 98765', 'Morabadi', 4.5, 19, true, true);

-- Insert sample services
INSERT INTO labour_services (labour_id, service_type, min_rate, max_rate) VALUES
((SELECT id FROM labour_profiles WHERE name = 'Rajesh Kumar'), 'Electrician', 500, 800),
((SELECT id FROM labour_profiles WHERE name = 'Rajesh Kumar'), 'AC Repair', 600, 1000),
((SELECT id FROM labour_profiles WHERE name = 'Sunita Devi'), 'House Cleaning', 300, 500),
((SELECT id FROM labour_profiles WHERE name = 'Sunita Devi'), 'House Help', 400, 600),
((SELECT id FROM labour_profiles WHERE name = 'Amit Singh'), 'Plumber', 400, 700),
((SELECT id FROM labour_profiles WHERE name = 'Priya Sharma'), 'Carpenter', 500, 900),
((SELECT id FROM labour_profiles WHERE name = 'Ravi Prasad'), 'Painter', 350, 600),
((SELECT id FROM labour_profiles WHERE name = 'Meera Kumari'), 'Deep Cleaning', 250, 400);
