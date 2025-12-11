import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Calendar, Loader2 } from 'lucide-react';

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

const initialMessage: Message = {
  id: '1',
  role: 'assistant',
  content: "👋 Hi! I'm Usman's virtual assistant. I can help you learn about his services, schedule a meeting, or answer any questions. What would you like to know?\n\n**Services I can explain:**\n• WordPress Development\n• GoHighLevel (GHL)\n• ClickFunnels\n• n8n Automation\n• Figma & Canva Design\n\nOr type 'schedule' to book a meeting!",
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
    
    if (msg.includes('schedule') || msg.includes('meeting') || msg.includes('book') || msg.includes('call')) {
      return "Great! I'd love to schedule a meeting with you. Please provide your:\n\n1. **Name**\n2. **Email**\n3. **Preferred date/time**\n4. **Project brief**\n\nOr you can email directly at: **usman755781@gmail.com**\n\nI typically respond within 24 hours!";
    }
    
    if (msg.includes('wordpress') || msg.includes('website')) {
      return `**${expertise.wordpress.title}**\n\n${expertise.wordpress.description}\n\n💰 Pricing starts from $500 for a basic website.\n\nWould you like to schedule a consultation?`;
    }
    
    if (msg.includes('ghl') || msg.includes('gohighlevel') || msg.includes('high level')) {
      return `**${expertise.ghl.title}**\n\n${expertise.ghl.description}\n\n💰 GHL setup and automation starts from $300.\n\nWant to discuss your project?`;
    }
    
    if (msg.includes('clickfunnel') || msg.includes('funnel')) {
      return `**${expertise.clickfunnels.title}**\n\n${expertise.clickfunnels.description}\n\n💰 Funnel building starts from $400.\n\nReady to boost your conversions?`;
    }
    
    if (msg.includes('n8n') || msg.includes('automation') || msg.includes('automate')) {
      return `**${expertise.n8n.title}**\n\n${expertise.n8n.description}\n\n💰 Automation workflows start from $200.\n\nLet's streamline your business!`;
    }
    
    if (msg.includes('figma') || msg.includes('design') || msg.includes('ui')) {
      return `**${expertise.figma.title}**\n\n${expertise.figma.description}\n\n💰 UI/UX design starts from $250.\n\nShall I show you some examples?`;
    }
    
    if (msg.includes('canva') || msg.includes('graphic')) {
      return `**${expertise.canva.title}**\n\n${expertise.canva.description}\n\n💰 Graphic design packages start from $100.\n\nNeed branded materials?`;
    }
    
    if (msg.includes('price') || msg.includes('cost') || msg.includes('rate') || msg.includes('pricing')) {
      return "**Pricing Overview:**\n\n• WordPress Website: from $500\n• GoHighLevel Setup: from $300\n• ClickFunnels: from $400\n• n8n Automation: from $200\n• Figma Design: from $250\n• Canva Graphics: from $100\n\nAll projects include 1 month of free support. Custom quotes available for larger projects.\n\nWant a detailed quote for your project?";
    }
    
    if (msg.includes('contact') || msg.includes('email') || msg.includes('phone')) {
      return "**Contact Information:**\n\n📧 Email: usman755781@gmail.com\n📱 Phone: +92 3259 438 262\n📍 Location: Lahore, Pakistan\n\nI'm available Monday-Saturday, 9 AM - 8 PM PKT.\n\nWould you like to schedule a call?";
    }
    
    if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
      return "Hello! 👋 Welcome! How can I help you today?\n\nI can tell you about:\n• Our services and expertise\n• Pricing information\n• Schedule a meeting\n• Answer project questions\n\nWhat interests you?";
    }
    
    if (msg.includes('thank')) {
      return "You're welcome! 😊 Is there anything else you'd like to know? Feel free to ask about our services or schedule a meeting anytime!";
    }
    
    return "Thanks for your message! I can help you with:\n\n• **WordPress** - Website development\n• **GHL/ClickFunnels** - Funnel building\n• **n8n** - Workflow automation\n• **Figma/Canva** - Design services\n\nOr type 'schedule' to book a meeting, or 'pricing' for rates.\n\nWhat would you like to explore?";
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
    
    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    
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
                  <h3 className="text-sm font-semibold text-foreground">Usman's Assistant</h3>
                  <p className="text-xs text-foreground-muted flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                    Online now
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
                    className={`max-w-[80%] p-3 rounded-lg text-sm ${
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
              {['Schedule Meeting', 'Pricing', 'Services'].map((action) => (
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
                  placeholder="Ask about services, pricing, or schedule..."
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
