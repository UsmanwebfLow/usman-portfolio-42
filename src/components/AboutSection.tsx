import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import profileImage from '@/assets/profile.png';

const stats = [
  { value: '3+', label: 'YEARS EXPERIENCE' },
  { value: '50+', label: 'PROJECTS COMPLETED' },
  { value: '30+', label: 'HAPPY CLIENTS' },
];

export default function AboutSection() {
  return (
    <section 
      id="about"
      className="relative min-h-screen py-32 px-6 section-darker"
    >
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-display text-5xl md:text-6xl lg:text-7xl text-center mb-20 tracking-wider"
        >
          ABOUT ME
        </motion.h2>
        
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Profile Image with decorative elements */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Decorative dots - top right */}
            <div className="absolute -top-8 -right-4 md:right-0 grid grid-cols-3 gap-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-foreground-muted/40" />
              ))}
            </div>
            
            {/* Profile image */}
            <div className="relative">
              <img 
                src={profileImage} 
                alt="Usman Ali - Creative Developer" 
                className="w-full max-w-md h-auto object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            
            {/* Decorative dots - bottom left */}
            <div className="absolute -bottom-8 -left-4 md:left-0 grid grid-cols-3 gap-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-foreground-muted/40" />
              ))}
            </div>
          </motion.div>
          
          {/* Right: Content */}
          <div className="lg:pt-8">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-heading text-xl md:text-2xl tracking-[0.15em] text-foreground mb-6"
            >
              CREATIVE DEVELOPER & DESIGNER
            </motion.h3>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-body-light text-foreground-muted leading-relaxed mb-6"
            >
              I'm a passionate creative developer specializing in building exceptional digital 
              experiences. With expertise in WordPress development, funnel building, and 
              automation, I help businesses transform their online presence.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-body-light text-foreground-soft leading-relaxed mb-6"
            >
              My approach combines clean code with stunning design, ensuring every project 
              not only looks beautiful but performs flawlessly. I believe in creating solutions 
              that are as functional as they are visually compelling.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-body-light text-foreground-soft leading-relaxed mb-10"
            >
              When I'm not coding, you'll find me exploring new design trends, learning 
              emerging technologies, and pushing the boundaries of what's possible on the web.
            </motion.p>
            
            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <a
                href="/resume.pdf"
                download="Usman_Ali_Resume.pdf"
                className="inline-flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-cyan-500 to-cyan-400 text-background font-medium rounded-full hover:opacity-90 transition-opacity text-sm tracking-wide"
              >
                <Download className="w-4 h-4" />
                Download CV
              </a>
              
              <a
                href="#contact"
                className="inline-flex items-center gap-3 px-8 py-3 border border-orange-500 text-orange-500 font-medium rounded-full hover:bg-orange-500 hover:text-background transition-all text-sm tracking-wide"
              >
                Let's Talk
              </a>
            </motion.div>
            
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-8 md:gap-12"
            >
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <span className="text-display text-3xl md:text-4xl bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">
                    {stat.value}
                  </span>
                  <p className="text-xs tracking-[0.15em] text-foreground-muted mt-1 uppercase">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
