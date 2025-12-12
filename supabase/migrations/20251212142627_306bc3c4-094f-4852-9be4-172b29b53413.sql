-- Create contacts table for form submissions
CREATE TABLE public.contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  service TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS but allow public inserts (contact form)
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit contact form
CREATE POLICY "Anyone can submit contact form" 
ON public.contacts 
FOR INSERT 
WITH CHECK (true);

-- Only allow reading via backend
CREATE POLICY "No public read access" 
ON public.contacts 
FOR SELECT 
USING (false);