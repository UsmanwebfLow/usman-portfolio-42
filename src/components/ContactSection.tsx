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
      className="relative py-32 px-6 section-dark"
    >
      <div className="max-w-6xl mx-auto">
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
            <p className="text-body-light text-lg text-foreground-muted leading-relaxed">
              Ready to start your project? Let's collaborate and bring your vision to life.
            </p>
            
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
                  className="flex items-center gap-6"
                >
                  <div className="w-12 h-12 border border-border flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <div className="text-xs text-foreground-soft tracking-wider uppercase">{item.label}</div>
                    <div className="text-foreground">{item.value}</div>
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
            <div className="credit-card-wrapper mb-[-50px] relative z-10">
              <div className={`credit-card w-full h-[200px] relative ${isFlipped ? 'flipped' : ''}`}>
                {/* Front */}
                <div className="credit-card-face credit-card-front text-foreground">
                  <div className="absolute top-4 right-5 flex">
                    <div className="w-7 h-7 rounded-full bg-white/80" />
                    <div className="w-7 h-7 rounded-full bg-white/40 -ml-3" />
                  </div>
                  
                  <div className="w-10 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded mb-4" />
                  
                  <div className="text-lg font-mono tracking-widest mb-4">
                    {formData.cardNumber || '•••• •••• •••• ••••'}
                  </div>
                  
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-[9px] opacity-60 uppercase tracking-wider mb-1">Card Holder</div>
                      <div className="text-xs font-medium uppercase tracking-wider">
                        {formData.cardHolder || 'YOUR NAME'}
                      </div>
                    </div>
                    <div>
                      <div className="text-[9px] opacity-60 uppercase tracking-wider mb-1">Expires</div>
                      <div className="text-xs font-medium">{formData.expiry || 'MM/YY'}</div>
                    </div>
                  </div>
                </div>
                
                {/* Back */}
                <div className="credit-card-face credit-card-back text-foreground">
                  <div className="absolute top-5 left-0 right-0 h-10 bg-black/50" />
                  
                  <div className="mt-20 flex items-center gap-4">
                    <span className="text-[9px] opacity-60 uppercase tracking-wider">CVV</span>
                    <div className="flex-1 h-8 bg-white rounded flex items-center justify-end pr-3">
                      <span className="text-sm font-mono text-black/80 italic tracking-widest">
                        {formData.cvv || '•••'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Form */}
            <div className="bg-foreground/95 p-8 pt-16">
              <h4 className="text-xl font-heading tracking-wider text-background text-center mb-6">
                PAYMENT DETAILS
              </h4>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-[10px] font-medium text-background/50 uppercase tracking-wider mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={formData.cardNumber}
                    onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className="w-full px-4 py-3 bg-background/10 border border-background/20 text-background placeholder:text-background/30 focus:outline-none focus:border-background/50"
                  />
                </div>
                
                <div>
                  <label className="block text-[10px] font-medium text-background/50 uppercase tracking-wider mb-2">
                    Card Holder Name
                  </label>
                  <input
                    type="text"
                    value={formData.cardHolder}
                    onChange={(e) => handleInputChange('cardHolder', e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-background/10 border border-background/20 text-background placeholder:text-background/30 focus:outline-none focus:border-background/50"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-medium text-background/50 uppercase tracking-wider mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      value={formData.expiry}
                      onChange={(e) => handleInputChange('expiry', e.target.value)}
                      placeholder="MM/YY"
                      maxLength={5}
                      className="w-full px-4 py-3 bg-background/10 border border-background/20 text-background placeholder:text-background/30 focus:outline-none focus:border-background/50"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium text-background/50 uppercase tracking-wider mb-2">
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
                      className="w-full px-4 py-3 bg-background/10 border border-background/20 text-background placeholder:text-background/30 focus:outline-none focus:border-background/50"
                    />
                  </div>
                </div>
                
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-background text-foreground font-heading tracking-wider flex items-center justify-center gap-3 mt-4 hover:bg-background/90 transition-colors"
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
