-- =====================================================
-- Supabase PostgreSQL Schema for Kapil's Portfolio
-- Run this SQL in: Supabase Dashboard → SQL Editor
-- =====================================================

-- Create the recruiter_messages table
CREATE TABLE IF NOT EXISTS public.recruiter_messages (
  id           TEXT PRIMARY KEY,
  name         TEXT NOT NULL,
  company      TEXT NOT NULL DEFAULT 'Confidential',
  email        TEXT NOT NULL,
  role         TEXT NOT NULL DEFAULT 'General Opportunity',
  message      TEXT NOT NULL,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  status       TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewed'))
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.recruiter_messages ENABLE ROW LEVEL SECURITY;

-- Policy: Allow the service role (used by server-side API) full access
-- The service role key bypasses RLS by default, so no explicit policy needed for it.

-- Policy: Deny all direct access from the anon/public role
-- (The frontend never talks to Supabase directly — all requests go through /api routes)
CREATE POLICY "No public access" ON public.recruiter_messages
  FOR ALL
  TO anon
  USING (false);

-- =====================================================
-- Seed Data (your existing messages)
-- =====================================================

INSERT INTO public.recruiter_messages (id, name, company, email, role, message, created_at, status)
VALUES
  (
    'msg_1791696215358_mxu2f',
    'Google Staff Recruiter',
    'Google DeepMind',
    'recruiter@deepmind.com',
    'AI Research Fellow',
    'Hello Kapil, impressive portfolio and certifications. We would love to connect.',
    '2026-10-11T05:23:35.358Z',
    'new'
  ),
  (
    'msg_seed_1',
    'Priya Sharma',
    'NextGen AI Labs',
    'priya.sharma@nextgenai.tech',
    'Machine Learning Research Intern',
    'Hi Kapil, we reviewed your work on RailSync AI and were impressed by your grasp of ML regression and data pipelines. We would love to discuss a 6-month research internship.',
    '2026-10-08T14:30:00.000Z',
    'reviewed'
  )
ON CONFLICT (id) DO NOTHING;
