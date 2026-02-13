-- SSES Strategic Growth Matrix - Supabase Schema
-- Run this in Supabase SQL Editor

-- Enable RLS
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create votes table
CREATE TABLE IF NOT EXISTS votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  segment_id TEXT NOT NULL,
  voted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id) -- ensures one vote per user (upsert)
);

-- Enable RLS on votes
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

-- Policy: Only admin can view votes
CREATE POLICY "Admin can view votes"
ON votes FOR SELECT
USING (
  auth.uid() IN (
    SELECT user_id FROM admin_users
  )
);

-- Policy: Users can insert their own vote
CREATE POLICY "Users can insert vote"
ON votes FOR INSERT
WITH CHECK (
  auth.uid() = user_id
);

-- Policy: Users can update their own vote
CREATE POLICY "Users can update vote"
ON votes FOR UPDATE
USING (
  auth.uid() = user_id
);

-- Policy: Users can delete their own vote
CREATE POLICY "Users can delete vote"
ON votes FOR DELETE
USING (
  auth.uid() = user_id
);

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on admin_users
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Policy: Only admins can view admin_users
CREATE POLICY "Only admins can view admin_users"
ON admin_users FOR SELECT
USING (
  auth.uid() IN (
    SELECT user_id FROM admin_users
  )
);

-- Function to get vote results (admin only)
CREATE OR REPLACE FUNCTION get_vote_results()
RETURNS TABLE (
  segment_id TEXT,
  vote_count BIGINT
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    v.segment_id,
    COUNT(*)::BIGINT as vote_count
  FROM votes v
  GROUP BY v.segment_id
  ORDER BY vote_count DESC;
END;
$$;

-- Function to get user's vote
CREATE OR REPLACE FUNCTION get_user_vote(p_user_id UUID)
RETURNS TABLE (
  segment_id TEXT,
  voted_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    v.segment_id,
    v.voted_at
  FROM votes v
  WHERE v.user_id = p_user_id;
END;
$$;

-- Insert admin user (replace with your email)
-- Run this after creating your user account:
-- INSERT INTO admin_users (user_id, email) 
-- SELECT id, email 
-- FROM auth.users 
-- WHERE email = 'your-email@example.com';
