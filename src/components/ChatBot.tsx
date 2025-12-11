import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const expertise = {
  wordpress: {
    title: 'WordPress Development',
    description: 'I build clean, modern and responsive WordPress websites and landing pages. Every site is fully functional, easy to manage, and tailored to reflect your brand identity. I can help with theme customization, plugin development, and performance optimization.',
  },
  ghl: {
    title: 'GoHighLevel (GHL)',
    description: 'I create high-converting funnels and automated workflows using GoHighLevel. From CRM setup to email marketing automation, I help businesses streamline their sales and marketing processes.',
  },
  clickfunnels: {
    title: 'ClickFunnels',
    description: 'I design and build high-converting sales funnels using ClickFunnels. From lead capture to sales pages, every step is optimized to maximize conversions and revenue.',
  },
  n8n: {
    title: 'n8n Automation',
    description: 'I design automation workflows with n8n to connect apps, automate repetitive tasks, and streamline your business processes. This saves time and reduces errors while improving efficiency.',
  },
  figma: {
    title: 'Figma Design',
    description: 'I create visually appealing UI and funnel designs in Figma. My layouts are intuitive, user-friendly, and ready for WordPress implementation or development.',
  },
  canva: {
    title: 'Canva Design',
    description: 'I design professional graphics in Canva, including social posts, marketing materials, and assets for funnels and websites, ensuring a consistent and branded visual presence.',
  },
};

const marketingStrategies = {
  leadCapture: `**Landing Page Lead Capture Strategy:**

For capturing leads effectively, I implement a comprehensive approach:

**1. High-Converting Landing Page Design**
• Clean, distraction-free layout with single CTA focus
• Compelling headline addressing the visitor's pain point
• Social proof (testimonials, client logos, case studies)
• Clear value proposition above the fold

**2. Lead Magnet Strategy**
• Free resource (ebook, checklist, template)
• Exclusive webinar or training access
• Free consultation/audit offer
• Discount or special offer

**3. Form Optimization**
• Minimal fields (name, email, phone)
• Progress indicators for multi-step forms
• Exit-intent popups for abandoning visitors
• A/B testing different form placements

**4. Follow-up Automation**
• Immediate welcome email sequence
• SMS follow-up (if phone provided)
• Retargeting ads for non-converters
• Lead scoring and nurturing workflow

**5. Traffic Generation**
• Paid ads (Facebook, Google, LinkedIn)
• SEO-optimized content marketing
• Social media campaigns
• Referral programs

Would you like me to create a custom lead capture funnel for your business?`,
  
  conversion: `**Conversion Optimization Tactics:**

**1. Trust Building**
• Display client testimonials prominently
• Show real results with case studies
• Add trust badges and certifications
• Include money-back guarantee

**2. Urgency & Scarcity**
• Limited-time offers with countdown timers
• Limited spots/availability messaging
• Early bird pricing tiers
• Exclusive bonuses for quick action

**3. Clear Value Communication**
• Feature-to-benefit translation
• ROI calculations where applicable
• Before/after comparisons
• Video testimonials

**4. Friction Reduction**
• One-click signup options
• Mobile-optimized experience
• Fast page load times
• Clear pricing (no hidden fees)

Ready to boost your conversion rates?`,

  automation: `**Marketing Automation Strategy:**

Using n8n and GoHighLevel, I can set up:

**1. Lead Nurturing Sequences**
• Welcome email series
• Educational content drip campaigns
• Re-engagement workflows
• Abandoned cart recovery

**2. Sales Pipeline Automation**
• Automatic lead assignment
• Follow-up reminders
• Deal stage progression
• Win/loss tracking

**3. Customer Journey Automation**
• Onboarding sequences
• Milestone celebrations
• Review/referral requests
• Upsell/cross-sell campaigns

**4. Reporting & Analytics**
• Automated daily/weekly reports
• Lead source tracking
• Conversion rate monitoring
• ROI dashboards

Would you like me to design a custom automation workflow?`,
};

const initialMessage: Message = {
  id: '1',
  role: 'assistant',
  content: "👋 Hi! I'm Usman's virtual sales assistant. I can help you:\n\n• **Learn about services** - WordPress, Funnels, Automation\n• **Discuss marketing strategies** - Lead capture, conversions\n• **Schedule a meeting** - Book a free consultation\n• **Get pricing info** - Custom quotes available\n\nWhat brings you here today?",
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase();
    
    // Meeting/Schedule handling
    if (msg.includes('schedule') || msg.includes('meeting') || msg.includes('book') || msg.includes('call') || msg.includes('consultation')) {
      return "Great! Let's schedule a meeting. Please provide:\n\n1. **Your Name**\n2. **Email**\n3. **Preferred date/time** (PKT timezone)\n4. **Brief project description**\n\n📧 Or email directly: **usman755781@gmail.com**\n📱 WhatsApp: **+92 308 286 0795**\n\nI typically respond within 2-4 hours during business hours!";
    }
    
    // Lead capture / Landing page marketing
    if (msg.includes('lead') || msg.includes('capture') || msg.includes('landing page') || msg.includes('marketing tactic') || msg.includes('marketing strategy')) {
      return marketingStrategies.leadCapture;
    }
    
    // Conversion optimization
    if (msg.includes('conversion') || msg.includes('convert') || msg.includes('optimize') || msg.includes('improve')) {
      return marketingStrategies.conversion;
    }
    
    // Automation strategy
    if (msg.includes('automate') || msg.includes('automation') || msg.includes('workflow') || msg.includes('n8n')) {
      return marketingStrategies.automation;
    }
    
    // WordPress
    if (msg.includes('wordpress') || msg.includes('website') || msg.includes('wp')) {
      return `**${expertise.wordpress.title}**\n\n${expertise.wordpress.description}\n\n**What I can build:**\n• Business websites\n• E-commerce stores (WooCommerce)\n• Membership sites\n• Blog platforms\n• Portfolio websites\n\n💰 Starting from $500\n⏱️ Turnaround: 1-3 weeks\n\nWould you like to schedule a free consultation?`;
    }
    
    // GHL
    if (msg.includes('ghl') || msg.includes('gohighlevel') || msg.includes('high level') || msg.includes('crm')) {
      return `**${expertise.ghl.title}**\n\n${expertise.ghl.description}\n\n**GHL Services:**\n• Full CRM setup & configuration\n• Sales pipeline creation\n• Email/SMS automation\n• Appointment booking\n• Reputation management\n\n💰 Starting from $300\n⏱️ Setup time: 3-7 days\n\nWant me to show you some case studies?`;
    }
    
    // Funnels
    if (msg.includes('clickfunnel') || msg.includes('funnel') || msg.includes('sales page')) {
      return `**${expertise.clickfunnels.title}**\n\n${expertise.clickfunnels.description}\n\n**Funnel Types I Build:**\n• Lead generation funnels\n• Webinar registration funnels\n• Product launch funnels\n• Tripwire funnels\n• High-ticket application funnels\n\n💰 Starting from $400\n⏱️ Delivery: 5-10 days\n\nReady to boost your conversions?`;
    }
    
    // Design
    if (msg.includes('figma') || msg.includes('design') || msg.includes('ui') || msg.includes('ux')) {
      return `**${expertise.figma.title}**\n\n${expertise.figma.description}\n\n**Design Services:**\n• Landing page designs\n• Funnel wireframes\n• UI/UX mockups\n• Brand style guides\n• Mobile-responsive designs\n\n💰 Starting from $250\n⏱️ Delivery: 2-5 days\n\nShall I show you my design portfolio?`;
    }
    
    // Canva
    if (msg.includes('canva') || msg.includes('graphic') || msg.includes('social media')) {
      return `**${expertise.canva.title}**\n\n${expertise.canva.description}\n\n**What I Create:**\n• Social media posts & stories\n• Ad creatives\n• Presentation decks\n• Lead magnets (ebooks, checklists)\n• Marketing materials\n\n💰 Starting from $100\n⏱️ Quick turnaround: 1-3 days\n\nNeed branded graphics?`;
    }
    
    // Pricing
    if (msg.includes('price') || msg.includes('cost') || msg.includes('rate') || msg.includes('pricing') || msg.includes('how much')) {
      return "**Pricing Overview:**\n\n| Service | Starting Price |\n|---------|---------------|\n| WordPress Website | $500 |\n| GoHighLevel Setup | $300 |\n| ClickFunnels Funnel | $400 |\n| n8n Automation | $200 |\n| Figma Design | $250 |\n| Canva Graphics | $100 |\n\n✅ All projects include 1 month free support\n✅ Revisions included\n✅ 100% satisfaction guarantee\n\nWant a custom quote for your specific project?";
    }
    
    // Contact
    if (msg.includes('contact') || msg.includes('email') || msg.includes('phone') || msg.includes('reach')) {
      return "**Contact Information:**\n\n📧 **Email:** usman755781@gmail.com\n📱 **Phone/WhatsApp:** +92 308 286 0795\n📍 **Location:** Lahore, Pakistan\n\n**Working Hours:**\nMonday - Saturday\n9:00 AM - 8:00 PM (PKT)\n\n**Response Time:**\n• Email: Within 4-6 hours\n• WhatsApp: Within 1-2 hours\n\nPrefer to schedule a video call?";
    }
    
    // Greetings
    if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey') || msg.includes('good')) {
      return "Hello! 👋 Great to meet you!\n\nI'm here to help you with:\n\n🌐 **Web Development** - WordPress sites\n📈 **Sales Funnels** - GHL, ClickFunnels\n⚙️ **Automation** - n8n workflows\n🎨 **Design** - Figma, Canva\n\nWhat challenge are you trying to solve today?";
    }
    
    // Portfolio/Work
    if (msg.includes('portfolio') || msg.includes('work') || msg.includes('example') || msg.includes('case study')) {
      return "**My Portfolio Highlights:**\n\n🏆 **50+ WordPress Sites** delivered\n📊 **30+ Sales Funnels** built\n🔄 **100+ Automations** deployed\n\n**Recent Projects:**\n• E-commerce site with 40% conversion increase\n• Lead funnel generating 200+ leads/month\n• Automation saving client 20 hrs/week\n\nWant to see specific examples or discuss a similar project?";
    }
    
    // Thanks
    if (msg.includes('thank')) {
      return "You're welcome! 😊\n\nIs there anything else you'd like to know?\n\n• More about services?\n• Pricing details?\n• Schedule a call?\n\nI'm here to help!";
    }
    
    // How to achieve goal / strategy questions
    if (msg.includes('how') && (msg.includes('achieve') || msg.includes('goal') || msg.includes('grow') || msg.includes('increase') || msg.includes('get more'))) {
      return "**Strategic Approach:**\n\nTo achieve your goals, I typically recommend:\n\n**1. Assessment Phase**\n• Analyze current situation\n• Identify bottlenecks\n• Define clear KPIs\n\n**2. Strategy Development**\n• Custom solution design\n• Technology selection\n• Timeline planning\n\n**3. Implementation**\n• Build & deploy solution\n• Testing & optimization\n• Training & handover\n\n**4. Growth & Scale**\n• Monitor performance\n• Continuous improvement\n• Scale what works\n\nCan you tell me more about your specific goal? I'll provide a tailored strategy!";
    }
    
    // Default response
    return "Thanks for your message! I can help you with:\n\n🌐 **WordPress** - Custom websites\n📈 **Funnels** - Lead capture & sales\n⚙️ **Automation** - n8n workflows\n🎨 **Design** - UI/UX & graphics\n\n**Quick Actions:**\n• Type 'pricing' for rates\n• Type 'schedule' to book a call\n• Type 'lead capture' for marketing strategies\n\nWhat would you like to explore?";
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 800));
    
    const response = generateResponse(input);
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response,
    };
    
    setMessages(prev => [...prev, assistantMessage]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-accent flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        initial={{ scale: 0 }}
        animate={{ scale: isOpen ? 0 : 1 }}
        whileHover={{ scale: 1.1 }}
      >
        <MessageCircle className="w-6 h-6 text-accent-foreground" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-50 w-[90vw] max-w-md h-[600px] bg-background-elevated border border-border rounded-lg shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-border bg-background-muted flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                  <span className="text-accent-foreground font-bold text-sm">UA</span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Usman's Sales Assistant</h3>
                  <p className="text-xs text-foreground-muted flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                    Online - Ready to help
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-foreground-muted hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-lg text-sm ${
                      message.role === 'user'
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-background-muted text-foreground'
                    }`}
                  >
                    <div className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ 
                      __html: message.content
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\n/g, '<br />')
                    }} />
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-background-muted p-3 rounded-lg flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-foreground-muted" />
                    <span className="text-sm text-foreground-muted">Typing...</span>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="px-4 py-2 flex gap-2 overflow-x-auto border-t border-border bg-background-muted">
              {['Schedule Meeting', 'Pricing', 'Lead Capture', 'Services'].map((action) => (
                <button
                  key={action}
                  onClick={() => setInput(action.toLowerCase())}
                  className="flex-shrink-0 px-3 py-1.5 text-xs border border-border rounded-full hover:bg-background-elevated transition-colors text-foreground-muted hover:text-foreground"
                >
                  {action}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border bg-background-muted">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about services, marketing strategies..."
                  className="flex-1 px-4 py-2 bg-background-elevated border border-border rounded-lg text-sm text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-accent"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="p-2 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}