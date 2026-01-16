-- Intern Application Tracker Database Schema

-- Drop table if exists (for clean setup)
DROP TABLE IF EXISTS applications;

-- Create applications table
CREATE TABLE applications (
    id SERIAL PRIMARY KEY,
    company VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    status VARCHAR(50) NOT NULL CHECK (status IN ('Applied', 'Interview', 'Rejected', 'Offer')),
    date_applied DATE NOT NULL,
    link_to_posting TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance optimization
CREATE INDEX idx_status ON applications(status);
CREATE INDEX idx_date_applied ON applications(date_applied DESC);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to call the function before each update
CREATE TRIGGER update_applications_updated_at
    BEFORE UPDATE ON applications
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
