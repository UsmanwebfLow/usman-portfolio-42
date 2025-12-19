import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Code2, Palette, Zap, Globe, Sparkles, User, MapPin, Calendar, Briefcase, Award, Github, Linkedin, Twitter, Mail, Star, Target, Heart } from 'lucide-react';
import { SpotlightCard } from './ui/spotlight-card';
import profileImage from '@/assets/profile.png';

export default function AboutSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-32 px-6 overflow-hidden section-darker"
    >
      {/* Bento Grid Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px] pointer-events-none" />
      
      {/* Animated Background Elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, 100, 0],
          y: [0, -50, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[8%] right-[8%] w-[500px] h-[500px] bg-accent/15 rounded-full blur-[100px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
          x: [0, -100, 0],
          y: [0, 50, 0]
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[8%] left-[8%] w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-lg mb-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent"></div>
            <Sparkles className="w-4 h-4 text-white animate-pulse" />
            <span className="text-xs font-heading tracking-widest text-foreground-muted uppercase">Discover My Story</span>
          </div>
          <div className="h-8"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
          {/* Profile Image Card */}
          <div className="lg:col-span-1">
            <SpotlightCard className="h-full p-0 overflow-hidden" delay={0.1}>
              <div className="h-full flex flex-col justify-between relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                <div className="w-full h-full relative group">
                  <img
                    src={profileImage}
                    alt="Usman Ali"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10"></div>
                </div>
                <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-[10px] font-bold text-white uppercase tracking-widest">AVAILABLE NOW</span>
                  </div>
                  <h3 className="text-white font-heading text-xl tracking-wide mb-1">USMAN ALI</h3>
                  <p className="text-foreground-muted font-heading text-sm tracking-wide">DIGITAL ARCHITECT</p>
                  <div className="flex items-center gap-1 mt-2">
                    <MapPin className="w-3 h-3 text-accent" />
                    <p className="text-white font-heading text-xs tracking-wide">LAHORE, PK</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 z-20">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
              </div>
            </SpotlightCard>
          </div>
          
          {/* Content Section */}
          <div className="lg:col-span-2 flex flex-col gap-6 h-full">
            {/* Bio Card */}
            <div className="flex-1">
              <SpotlightCard className="h-full p-8" delay={0.2}>
                <div className="h-full flex flex-col">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-opacity duration-500">
                    <Code2 className="w-32 h-32 rotate-12 text-accent/20" />
                  </div>
                  <div className="relative z-10 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-3 h-3 rounded-full bg-accent animate-pulse"></div>
                      <h3 className="text-2xl font-heading tracking-wide text-white">DIGITAL ARCHITECT & CREATIVE DEVELOPER</h3>
                    </div>
                    <p className="text-foreground-muted text-lg leading-relaxed mb-8 max-w-3xl font-light relative flex-1">
                      I don't just write code; I craft ecosystem-driven solutions. From high-converting <span className="text-accent underline underline-offset-4 decoration-accent/30">Funnels</span> to complex <span className="text-white underline underline-offset-4 decoration-white/30">Automations</span>,
                      I bridge the gap between creative design and technical excellence. My passion lies in transforming ideas into seamless digital experiences that drive results.
                      <div className="absolute -left-2 top-0 w-1 h-full bg-gradient-to-b from-accent to-transparent rounded-full"></div>
                    </p>
                    <div className="flex flex-wrap gap-4 relative z-10 mt-auto">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm">
                        <Heart className="w-4 h-4 text-red-400" />
                        <span className="text-xs font-heading tracking-wider text-foreground-muted uppercase">Passionate Creator</span>
                      </div>
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm">
                        <Target className="w-4 h-4 text-blue-400" />
                        <span className="text-xs font-heading tracking-wider text-foreground-muted uppercase">Results Focused</span>
                      </div>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </div>
            
            {/* Stats and Skills */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Experience Card */}
              <div>
                <SpotlightCard className="h-full p-6" delay={0.3}>
                  <div className="h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                        <Briefcase className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h4 className="text-xl font-heading tracking-wide text-white">3+</h4>
                        <p className="text-sm text-foreground-muted uppercase tracking-widest">Years Experience</p>
                      </div>
                    </div>
                    <p className="text-foreground-muted text-sm leading-relaxed mt-4">
                      Crafting digital experiences with precision and innovation
                    </p>
                  </div>
                </SpotlightCard>
              </div>
              
              {/* Projects Card */}
              <div>
                <SpotlightCard className="h-full p-6" delay={0.4}>
                  <div className="h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                        <Star className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h4 className="text-xl font-heading tracking-wide text-white">50+</h4>
                        <p className="text-sm text-foreground-muted uppercase tracking-widest">Projects Done</p>
                      </div>
                    </div>
                    <p className="text-foreground-muted text-sm leading-relaxed mt-4">
                      Successful implementations that exceeded client expectations
                    </p>
                  </div>
                </SpotlightCard>
              </div>
              
              {/* Clients Card */}
              <div>
                <SpotlightCard className="h-full p-6" delay={0.5}>
                  <div className="h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                        <Heart className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h4 className="text-xl font-heading tracking-wide text-white">30+</h4>
                        <p className="text-sm text-foreground-muted uppercase tracking-widest">Happy Clients</p>
                      </div>
                    </div>
                    <p className="text-foreground-muted text-sm leading-relaxed mt-4">
                      Long-term partnerships built on trust and quality delivery
                    </p>
                  </div>
                </SpotlightCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
