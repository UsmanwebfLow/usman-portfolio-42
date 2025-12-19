import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the authorization header
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Missing authorization header" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Set the auth token
    supabase.auth.setAuth(authHeader.replace("Bearer ", ""));

    const { method } = req;
    const url = new URL(req.url);
    const projectId = url.searchParams.get("id");

    switch (method) {
      case "GET":
        // Get all projects or a specific project
        let query = supabase.from("projects").select("*");
        
        if (projectId) {
          query = query.eq("id", projectId);
        }
        
        const { data, error } = await query.order("created_at", { ascending: false });
        
        if (error) {
          throw error;
        }
        
        return new Response(
          JSON.stringify({ data }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );

      case "POST":
        // Create a new project
        const newProject = await req.json();
        
        const { data: insertData, error: insertError } = await supabase
          .from("projects")
          .insert(newProject)
          .select()
          .single();
        
        if (insertError) {
          throw insertError;
        }
        
        return new Response(
          JSON.stringify({ data: insertData }),
          { status: 201, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );

      case "PUT":
        // Update an existing project
        if (!projectId) {
          return new Response(
            JSON.stringify({ error: "Project ID is required for updates" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        
        const updateData = await req.json();
        
        const { data: updateDataResult, error: updateError } = await supabase
          .from("projects")
          .update(updateData)
          .eq("id", projectId)
          .select()
          .single();
        
        if (updateError) {
          throw updateError;
        }
        
        return new Response(
          JSON.stringify({ data: updateDataResult }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );

      case "DELETE":
        // Delete a project
        if (!projectId) {
          return new Response(
            JSON.stringify({ error: "Project ID is required for deletion" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        
        const { error: deleteError } = await supabase
          .from("projects")
          .delete()
          .eq("id", projectId);
        
        if (deleteError) {
          throw deleteError;
        }
        
        return new Response(
          JSON.stringify({ message: "Project deleted successfully" }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );

      default:
        return new Response(
          JSON.stringify({ error: `Method ${method} not allowed` }),
          { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    }
  } catch (error) {
    console.error("Manage projects error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});