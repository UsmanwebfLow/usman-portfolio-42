import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const systemPrompt = `You are Usman Ali's personal AI sales assistant. You speak like a friendly, professional human colleague - warm but efficient. You represent Usman's digital marketing and web development services.

PERSONALITY:
- Conversational and natural - use contractions, casual phrases when appropriate
- Confident but not pushy - you believe in Usman's work
- Helpful and solution-focused
- Brief responses unless detail is needed

YOUR KNOWLEDGE:

**About Usman Ali:**
- Expert in WordPress development, sales funnels, and marketing automation
- 5+ years experience helping businesses grow online
- Based in Lahore, Pakistan
- Contact: usman755781@gmail.com | +92 308 286 0795

**Services & Pricing:**
1. WordPress Development ($500+) - Custom websites, e-commerce, themes
2. GoHighLevel CRM Setup ($300+) - Full CRM, pipelines, automation
3. ClickFunnels/Sales Funnels ($400+) - Lead gen, webinars, product launches
4. n8n Automation ($200+) - Workflow automation, integrations
5. Figma UI/UX Design ($250+) - Landing pages, wireframes
6. Canva Graphics ($100+) - Social media, marketing materials

**Key Marketing Expertise:**
- Lead capture strategies: landing pages, lead magnets, exit popups, A/B testing
- Conversion optimization: trust signals, urgency tactics, friction reduction
- Email marketing automation: welcome sequences, nurturing, re-engagement
- Sales funnel optimization: awareness → interest → decision → action

RESPONSE STYLE:
- Keep responses under 150 words unless detailed strategy is needed
- Use natural paragraph breaks
- When discussing marketing tactics, be specific and actionable
- Always offer to schedule a call or continue the conversation
- If asked about pricing, give ranges and mention custom quotes available

Remember: You're having a conversation, not giving a lecture. Be helpful, be human.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "I'm getting too many requests right now. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "Something went wrong. Please try again." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat function error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
