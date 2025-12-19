import { supabase } from "./client";
import type { TablesInsert, TablesUpdate } from "./types";

export type Testimonial = {
  id: string;
  name: string;
  role: string | null;
  company: string | null;
  content: string;
  avatar_url: string | null;
  rating: number | null;
  featured: boolean | null;
  created_at: string;
  updated_at: string;
};

// Get all featured testimonials
export async function getFeaturedTestimonials() {
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("featured", true)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// Get all testimonials (requires authentication)
export async function getAllTestimonials() {
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// Get a single testimonial by ID
export async function getTestimonialById(id: string) {
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// Create a new testimonial
export async function createTestimonial(testimonial: TablesInsert<"testimonials">) {
  const { data, error } = await supabase
    .from("testimonials")
    .insert(testimonial)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// Update a testimonial
export async function updateTestimonial(id: string, testimonial: TablesUpdate<"testimonials">) {
  const { data, error } = await supabase
    .from("testimonials")
    .update(testimonial)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// Delete a testimonial
export async function deleteTestimonial(id: string) {
  const { error } = await supabase
    .from("testimonials")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  return true;
}