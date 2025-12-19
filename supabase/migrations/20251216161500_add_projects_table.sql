-- Create projects table for portfolio items
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  project_url TEXT,
  github_url TEXT,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public can view projects" 
ON public.projects 
FOR SELECT 
USING (true);

-- Allow authenticated users to insert/update/delete
CREATE POLICY "Authenticated users can manage projects" 
ON public.projects 
FOR ALL 
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- Grant permissions
GRANT SELECT ON public.projects TO anon;
GRANT ALL ON public.projects TO authenticated;