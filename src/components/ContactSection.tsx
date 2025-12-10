import { useState } from 'react';
import { motion } from 'framer-motion';
import GradientFillHeading from './GradientFillHeading';
import { Send, Mail, MapPin, Phone } from 'lucide-react';

export default function ContactSection() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiry: '',
    cvv: '',
  });

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : value;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleInputChange = (field: string, value: string) => {
    if (field === 'cardNumber') {
      value = formatCardNumber(value);
    } else if (field === 'expiry') {
      value = formatExpiry(value);
    }
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section 
      id="contact"
      className="relative py-32 px-6 section-dark overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[200px]" />
      
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 text-center">
          <GradientFillHeading text="LET'S TALK" />
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-heading text-3xl text-foreground mb-4">
                Ready to Start Your Project?
              </h3>
              <p className="text-foreground-muted text-lg">
                Let's collaborate and bring your vision to life. I'm always excited to work on new and challenging projects.
              </p>
            </div>
            
            <div className="space-y-6">
              {[
                { icon: Mail, label: 'Email', value: 'hello@example.com' },
                { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567' },
                { icon: MapPin, label: 'Location', value: 'San Francisco, CA' },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-foreground-soft">{item.label}</div>
                    <div className="text-foreground font-medium">{item.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* 3D Credit Card Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Credit Card */}
            <div className="credit-card-wrapper mb-[-60px] relative z-10">
              <div 
                className={`credit-card w-full h-[220px] relative ${isFlipped ? 'flipped' : ''}`}
              >
                {/* Front */}
                <div className="credit-card-face credit-card-front text-foreground">
                  {/* Logo */}
                  <div className="absolute top-4 right-6 flex">
                    <div className="w-8 h-8 rounded-full bg-orange-500/80" />
                    <div className="w-8 h-8 rounded-full bg-yellow-500/80 -ml-3" />
                  </div>
                  
                  {/* Chip */}
                  <div className="w-12 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg mb-5 relative overflow-hidden">
                    <div className="absolute top-1/2 left-1 right-1 h-px bg-black/20" />
                    <div className="absolute top-1 bottom-1 left-1/2 w-px bg-black/20" />
                  </div>
                  
                  {/* Card Number */}
                  <div className="text-xl font-mono tracking-widest mb-6">
                    {formData.cardNumber || '•••• •••• •••• ••••'}
                  </div>
                  
                  {/* Details */}
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-[10px] opacity-70 uppercase tracking-wider mb-1">Card Holder</div>
                      <div className="text-sm font-semibold uppercase tracking-wider">
                        {formData.cardHolder || 'YOUR NAME'}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] opacity-70 uppercase tracking-wider mb-1">Expires</div>
                      <div className="text-sm font-semibold">
                        {formData.expiry || 'MM/YY'}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Back */}
                <div className="credit-card-face credit-card-back text-foreground">
                  {/* Magnetic strip */}
                  <div className="absolute top-6 left-0 right-0 h-12 bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-900" />
                  
                  {/* CVV */}
                  <div className="mt-24 flex items-center gap-4">
                    <span className="text-xs opacity-70 uppercase tracking-wider">CVV</span>
                    <div className="flex-1 h-10 bg-white rounded-md flex items-center justify-end pr-4">
                      <span className="text-lg font-mono text-black/80 italic tracking-widest">
                        {formData.cvv || '•••'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Logo */}
                  <div className="absolute bottom-4 right-6 flex">
                    <div className="w-6 h-6 rounded-full bg-orange-500/80" />
                    <div className="w-6 h-6 rounded-full bg-yellow-500/80 -ml-2" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Form */}
            <div className="bg-foreground/95 rounded-3xl p-8 pt-20 shadow-elevated">
              <h4 className="text-2xl font-heading text-background text-center mb-6">
                Payment Details
              </h4>
              
              <form className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-background/60 uppercase tracking-wider mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={formData.cardNumber}
                    onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className="w-full px-4 py-3 rounded-xl bg-background/10 border border-background/20 text-background placeholder:text-background/40 focus:outline-none focus:border-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-semibold text-background/60 uppercase tracking-wider mb-2">
                    Card Holder Name
                  </label>
                  <input
                    type="text"
                    value={formData.cardHolder}
                    onChange={(e) => handleInputChange('cardHolder', e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl bg-background/10 border border-background/20 text-background placeholder:text-background/40 focus:outline-none focus:border-primary"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-background/60 uppercase tracking-wider mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      value={formData.expiry}
                      onChange={(e) => handleInputChange('expiry', e.target.value)}
                      placeholder="MM/YY"
                      maxLength={5}
                      className="w-full px-4 py-3 rounded-xl bg-background/10 border border-background/20 text-background placeholder:text-background/40 focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-background/60 uppercase tracking-wider mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      value={formData.cvv}
                      onChange={(e) => handleInputChange('cvv', e.target.value)}
                      onFocus={() => setIsFlipped(true)}
                      onBlur={() => setIsFlipped(false)}
                      placeholder="•••"
                      maxLength={4}
                      className="w-full px-4 py-3 rounded-xl bg-background/10 border border-background/20 text-background placeholder:text-background/40 focus:outline-none focus:border-primary"
                    />
                    <span className="text-[10px] text-background/40 mt-1 block">
                      Focus to see card back
                    </span>
                  </div>
                </div>
                
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg flex items-center justify-center gap-2 mt-4"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
