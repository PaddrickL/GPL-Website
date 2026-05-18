-- Create teams table
CREATE TABLE teams (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  team_name VARCHAR(255) NOT NULL,
  captain_name VARCHAR(255) NOT NULL,
  captain_email VARCHAR(255) NOT NULL,
  captain_phone VARCHAR(20) NOT NULL,
  player2_name VARCHAR(255) NOT NULL,
  player3_name VARCHAR(255) NOT NULL,
  player4_name VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable Row Level Security
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;

-- Allow public read access (you can restrict this later)
CREATE POLICY "Allow public read access" ON teams FOR SELECT USING (true);

-- Allow public insert access (for registration)
CREATE POLICY "Allow public insert access" ON teams FOR INSERT WITH CHECK (true);

-- Allow public delete access (for admin)
CREATE POLICY "Allow public delete access" ON teams FOR DELETE USING (true);

-- Create index on team_name for faster searches
CREATE INDEX idx_team_name ON teams(team_name);

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
