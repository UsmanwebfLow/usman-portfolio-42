-- Create testimonials table
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  company TEXT,
  content TEXT NOT NULL,
  avatar_url TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Allow public read access for featured testimonials
CREATE POLICY "Public can view featured testimonials" 
ON public.testimonials 
FOR SELECT 
USING (featured = true);

-- Allow authenticated users to insert/update/delete
CREATE POLICY "Authenticated users can manage testimonials" 
ON public.testimonials 
FOR ALL 
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- Grant permissions
GRANT SELECT ON public.testimonials TO anon;
GRANT ALL ON public.testimonials TO authenticated;