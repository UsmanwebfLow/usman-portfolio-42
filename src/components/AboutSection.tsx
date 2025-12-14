import { motion } from 'framer-motion';
import GradientFillHeading from './GradientFillHeading';
import { Download, MapPin, Mail, Phone } from 'lucide-react';
import profileImage from '@/assets/profile.png';

const stats = [
  { value: '50+', label: 'Projects Completed' },
  { value: '30+', label: 'Happy Clients' },
  { value: '3+', label: 'Years Experience' },
  { value: '100%', label: 'Client Satisfaction' },
];

export default function AboutSection() {
  return (
    <section 
      id="about"
      className="relative min-h-screen py-32 px-6 section-darker"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Left: Section title */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-heading text-xs tracking-[0.3em] text-foreground-soft mb-4 block"
            >
              ABOUT ME
            </motion.span>
            
            <GradientFillHeading text="WORDPRESS" className="mb-2" />
            <GradientFillHeading text="DEVELOPER" className="mb-2" />
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-heading text-xl md:text-2xl tracking-[0.1em] text-foreground-muted mt-6"
            >
              BASED IN LAHORE, PAKISTAN
            </motion.p>
            
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="mt-10 space-y-3"
            >
              {[
                { icon: Mail, text: 'usman755781@gmail.com' },
                { icon: Phone, text: '+92 3259 438 262' },
                { icon: MapPin, text: 'Darogawala, Lahore' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-foreground-muted">
                  <item.icon className="w-4 h-4 text-accent" />
                  <span className="text-sm">{item.text}</span>
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* Right: Description + Profile Image */}
          <div className="lg:pt-20">
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-10 flex justify-center lg:justify-start"
            >
              <div className="relative">
                <img 
                  src={profileImage} 
                  alt="Usman Ali" 
                  className="w-48 h-60 md:w-56 md:h-72 object-cover object-top grayscale hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 border border-accent/30 -translate-x-3 -translate-y-3 pointer-events-none" />
              </div>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-body-light text-lg md:text-xl text-foreground-muted leading-relaxed mb-8"
            >
              Motivated and detail-oriented developer specializing in WordPress, 
              GoHighLevel, ClickFunnels, and automation workflows using tools like n8n.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-body-light text-base text-foreground-soft leading-relaxed mb-12"
            >
              Skilled in creating responsive websites, building high-converting funnels, 
              and designing clean UI/UX using Figma and Canva. Currently working with 
              Power Pack Technologies, contributing to modern digital solutions that 
              boost business performance.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="/resume.pdf"
                download="Usman_Ali_Resume.pdf"
                className="inline-flex items-center gap-3 px-6 py-3 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-300 text-heading text-xs tracking-[0.2em]"
              >
                <Download className="w-4 h-4" />
                DOWNLOAD CV
              </a>
              
              <a
                href="#work"
                className="inline-flex items-center gap-4 px-6 py-3 text-heading text-xs tracking-[0.2em] text-foreground group"
              >
                VIEW WORK
                <span className="w-8 h-px bg-foreground group-hover:w-12 transition-all duration-300" />
              </a>
            </motion.div>
          </div>
        </div>
        
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 pt-16 border-t border-border"
        >
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <span className="text-display text-4xl md:text-5xl text-foreground">{stat.value}</span>
              <p className="text-xs tracking-[0.2em] text-foreground-muted mt-2 uppercase">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
