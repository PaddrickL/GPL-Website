-- Create bracket table
CREATE TABLE bracket (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  revealed BOOLEAN DEFAULT false,
  matches JSONB,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable Row Level Security for bracket
ALTER TABLE bracket ENABLE ROW LEVEL SECURITY;

-- Allow public read access to bracket
CREATE POLICY "Allow public read access to bracket" ON bracket FOR SELECT USING (true);

-- Allow public update access to bracket (for admin)
CREATE POLICY "Allow public update access to bracket" ON bracket FOR UPDATE USING (true);

-- Allow public insert access to bracket (for admin)
CREATE POLICY "Allow public insert access to bracket" ON bracket FOR INSERT WITH CHECK (true);
