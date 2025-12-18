import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GradientFillHeading from './GradientFillHeading';
import { Send, Mail, MapPin, Phone, CreditCard, Loader2, Link, Globe, ShieldCheck } from 'lucide-react';
import { Instagram, Linkedin, Github } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

const socialLinks = [
  { icon: Instagram, href: 'https://www.instagram.com/usmanmughal14200691/', label: 'Instagram' },
  { icon: () => <span className="text-lg font-bold">𝕏</span>, href: 'https://x.com/usmanal08972977', label: 'X (Twitter)' },
  { icon: Linkedin, href: 'https://www.linkedin.com/feed/', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/usmanwebexpert/portfolio', label: 'GitHub' },
];

const services = [
  'WordPress Development',
  'Funnel Building',
  'n8n Automation',
  'Figma Design',
  'Canva Graphics',
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('submit-contact', {
        body: formData
      });

      if (error) throw error;

      toast.success('Message sent successfully! I\'ll get back to you soon.');
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    } catch (error) {
      console.error('Submit error:', error);
      toast.error('Failed to send message. Please try again or email directly.');
      // Demo fallback
      setTimeout(() => {
        setIsSubmitting(false);
        toast.success('(Demo) Message passed validation!');
        setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      }, 1000);
    } finally {
      // setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 px-6 section-darker overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-heading text-xs tracking-[0.3em] text-foreground-soft mb-4 block"
          >
            GET IN TOUCH
          </motion.span>
          <GradientFillHeading text="LET'S CONNECT" />
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">

          {/* INTERACTIVE CARD WRAPPER */}
          <div className="relative w-full max-w-[420px] aspect-[1.586] perspective-1000 group z-20">
            <motion.div
              className="w-full h-full relative transition-all duration-700"
              style={{ transformStyle: 'preserve-3d' }}
              animate={{ rotateY: isFlipped ? 180 : 0 }}
            >
              {/* CARD FRONT */}
              <div
                className="absolute inset-0 w-full h-full rounded-2xl p-6 shadow-2xl flex flex-col justify-between overflow-hidden border border-white/10 bg-gradient-to-br from-zinc-900 to-black"
                style={{ backfaceVisibility: 'hidden' }}
              >
                {/* Card Noise/Texture */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <div className="relative flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-8 h-8 text-white/80" />
                    <div className="h-8 w-[1px] bg-white/20 mx-1" />
                    <span className="font-heading text-lg text-white tracking-widest">ACCESS</span>
                  </div>
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full border border-zinc-800 bg-zinc-900" />
                    <div className="w-8 h-8 rounded-full border border-zinc-800 bg-white/10 backdrop-blur-sm" />
                  </div>
                </div>

                <div className="relative mt-4">
                  <div className="w-12 h-9 rounded bg-gradient-to-r from-yellow-100/20 to-yellow-500/20 border border-yellow-500/30 flex items-center justify-center">
                    <div className="w-full h-[1px] bg-yellow-500/30" />
                  </div>
                </div>

                <div className="relative space-y-4">
                  <div>
                    <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Contact Reference</div>
                    <div className="text-xl md:text-2xl font-mono text-white tracking-widest tabular-nums shadow-black drop-shadow-lg">
                      {formData.phone ? formData.phone.padEnd(14, '•').substring(0, 14) : '•••• •••• ••••'}
                    </div>
                  </div>

                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-[9px] text-white/40 uppercase tracking-widest mb-1">Authorized User</div>
                      <div className="text-sm font-medium text-white uppercase tracking-wider max-w-[180px] truncate">
                        {formData.name || 'YOUR NAME'}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[9px] text-white/40 uppercase tracking-widest mb-1">Date</div>
                      <div className="text-sm font-medium text-white uppercase tracking-wider">
                        {new Date().toLocaleDateString('en-US', { month: '2-digit', year: '2-digit' })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD BACK */}
              <div
                className="absolute inset-0 w-full h-full rounded-2xl p-6 shadow-2xl flex flex-col overflow-hidden border border-white/10 bg-black"
                style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
              >
                <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                <div className="relative w-full h-12 bg-zinc-800/50 mt-4 mb-6" />

                <div className="relative flex items-center gap-4 px-4">
                  <div className="flex-1 h-10 bg-white/10 rounded flex items-center justify-end px-3">
                    <span className="font-mono text-sm text-white/80 italic">
                      {formData.service ? 'VERIFIED' : 'PENDING'}
                    </span>
                  </div>
                  <div className="text-[10px] text-white/30 uppercase w-12 leading-tight">
                    Security Code
                  </div>
                </div>

                <div className="mt-auto flex justify-between items-end relative">
                  <div className="space-y-1">
                    <p className="text-[10px] text-white/40">Portfolio ID</p>
                    <p className="text-xs font-mono text-white">4242-USMAN-PORT</p>
                  </div>
                  <Globe className="w-10 h-10 text-white/5" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* FORM WRAPPER */}
          <div className="w-full max-w-lg bg-white/5 border border-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-2xl">
            <h3 className="text-2xl font-heading text-white text-center mb-8 tracking-wide">Enter Details</h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-wider text-white/50 font-bold pl-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-wider text-white/50 font-bold pl-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="john@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-wider text-white/50 font-bold pl-1">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+1 234..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-wider text-white/50 font-bold pl-1">Service (Flip)</label>
                  <select
                    required
                    value={formData.service}
                    onFocus={() => setIsFlipped(true)}
                    onBlur={() => setIsFlipped(false)}
                    onChange={(e) => handleInputChange('service', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-black text-white/50">Select...</option>
                    {services.map(s => <option key={s} value={s} className="bg-black">{s}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-wider text-white/50 font-bold pl-1">Message</label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Project details..."
                  rows={1} // Compact initially
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all resize-none min-h-[60px]"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-4 h-12 text-base shadow-lg shadow-white/5 hover:shadow-white/10"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    PROCESSING
                  </>
                ) : (
                  <>
                    SEND MESSAGE
                  </>
                )}
              </Button>
            </form>

            {/* Simple Social Links Footer for Layout Balance */}
            <div className="mt-8 flex justify-center gap-4 border-t border-white/10 pt-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-white transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
