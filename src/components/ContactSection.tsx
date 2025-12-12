import { useState } from 'react';
import { motion } from 'framer-motion';
import GradientFillHeading from './GradientFillHeading';
import { Send, Mail, MapPin, Phone, CreditCard } from 'lucide-react';
import { Instagram, Linkedin, Github } from 'lucide-react';

const socialLinks = [
  { icon: Instagram, href: 'https://www.instagram.com/usmanmughal14200691/', label: 'Instagram' },
  { icon: () => <span className="text-lg font-bold">𝕏</span>, href: 'https://x.com/usmanal08972977', label: 'X (Twitter)' },
  { icon: Linkedin, href: 'https://www.linkedin.com/feed/', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/usmanwebexpert/portfolio', label: 'GitHub' },
];

const services = [
  'WordPress Development',
  'Funnel Building (GHL/ClickFunnels)',
  'n8n Automation',
  'Figma Design',
  'Canva Graphics',
  'Landing Page Design',
];

// Visa Card Component
const VisaCard = ({ formData }: { formData: { name: string; email: string; phone: string; service: string } }) => {
  return (
    <motion.div
      initial={{ rotateY: -15, rotateX: 5 }}
      animate={{ rotateY: [-15, 15, -15], rotateX: [5, -5, 5] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="relative w-full max-w-[320px] h-[200px] mx-auto perspective-1000"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 rounded-2xl shadow-2xl p-6 flex flex-col justify-between overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
        </div>
        
        {/* Top section */}
        <div className="relative flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div className="w-10 h-7 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded" />
            <CreditCard className="w-5 h-5 text-white/70" />
          </div>
          <span className="text-white font-bold text-lg tracking-wider">VISA</span>
        </div>
        
        {/* Card details */}
        <div className="relative space-y-3">
          <div className="text-white/90 text-lg font-mono tracking-[0.25em]">
            •••• •••• •••• 4242
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[10px] text-white/60 uppercase tracking-wider">Card Holder</p>
              <p className="text-white font-medium text-sm truncate max-w-[150px]">
                {formData.name || 'YOUR NAME'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-white/60 uppercase tracking-wider">Service</p>
              <p className="text-white font-medium text-xs truncate max-w-[100px]">
                {formData.service ? formData.service.split(' ')[0] : 'SELECT'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! I will get back to you soon.');
  };

  return (
    <section 
      id="contact"
      className="relative py-16 md:py-32 px-4 md:px-6 section-dark"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-heading text-xs tracking-[0.3em] text-foreground-soft mb-4 block"
          >
            GET IN TOUCH
          </motion.span>
          <GradientFillHeading text="LET'S TALK" />
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-start">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6 md:space-y-8 order-2 lg:order-1"
          >
            <p className="text-body-light text-base md:text-lg text-foreground-muted leading-relaxed">
              Ready to start your project? Let's collaborate and bring your vision to life. 
              I'm available for WordPress development, funnel building, and automation projects.
            </p>
            
            <div className="space-y-4 md:space-y-6">
              {[
                { icon: Mail, label: 'Email', value: 'usman755781@gmail.com', href: 'mailto:usman755781@gmail.com' },
                { icon: Phone, label: 'Phone', value: '+92 308 286 0795', href: 'tel:+923082860795' },
                { icon: MapPin, label: 'Location', value: 'Lahore, Pakistan', href: null },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 md:gap-6"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 border border-border flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-4 h-4 md:w-5 md:h-5 text-foreground" />
                  </div>
                  <div>
                    <div className="text-[10px] md:text-xs text-foreground-soft tracking-wider uppercase">{item.label}</div>
                    {item.href ? (
                      <a href={item.href} className="text-sm md:text-base text-foreground hover:text-accent transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <div className="text-sm md:text-base text-foreground">{item.value}</div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="pt-4 md:pt-6">
              <h4 className="text-xs text-foreground-soft tracking-wider uppercase mb-4">Follow Me</h4>
              <div className="flex gap-3 md:gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 md:w-12 md:h-12 border border-border flex items-center justify-center text-foreground-muted hover:text-foreground hover:border-foreground transition-all"
                    title={social.label}
                  >
                    <social.icon className="w-4 h-4 md:w-5 md:h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Contact Form with Visa Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            {/* Visa Card Preview */}
            <div className="mb-8">
              <VisaCard formData={formData} />
            </div>
            
            <div className="bg-background-muted border border-border p-6 md:p-8">
              <h4 className="text-lg md:text-xl font-heading tracking-wider text-foreground text-center mb-6">
                SEND A MESSAGE
              </h4>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-medium text-foreground-soft uppercase tracking-wider mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-foreground transition-colors text-sm md:text-base"
                  />
                </div>
                
                <div>
                  <label className="block text-[10px] font-medium text-foreground-soft uppercase tracking-wider mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-foreground transition-colors text-sm md:text-base"
                  />
                </div>
                
                <div>
                  <label className="block text-[10px] font-medium text-foreground-soft uppercase tracking-wider mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-foreground transition-colors text-sm md:text-base"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-medium text-foreground-soft uppercase tracking-wider mb-2">
                    What Service Do You Need? *
                  </label>
                  <select
                    required
                    value={formData.service}
                    onChange={(e) => handleInputChange('service', e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-border text-foreground focus:outline-none focus:border-foreground transition-colors text-sm md:text-base"
                  >
                    <option value="">Select a service...</option>
                    {services.map((service) => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-[10px] font-medium text-foreground-soft uppercase tracking-wider mb-2">
                    Your Message *
                  </label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Tell me about your project..."
                    rows={4}
                    className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-foreground transition-colors resize-none text-sm md:text-base"
                  />
                </div>
                
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-foreground text-background font-heading tracking-wider flex items-center justify-center gap-3 mt-4 hover:bg-foreground/90 transition-colors text-sm md:text-base"
                >
                  <Send className="w-4 h-4" />
                  SEND MESSAGE
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
