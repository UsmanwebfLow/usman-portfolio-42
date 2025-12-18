import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionTemplate, useMotionValue } from 'framer-motion';
import { ArrowUpRight, Code2, Palette, Zap, Globe, Sparkles } from 'lucide-react';
import { SpotlightCard } from './ui/spotlight-card';
import profileImage from '@/assets/profile.png';

const stats = [
  { value: '3+', label: 'Years Exp.' },
  { value: '50+', label: 'Projects' },
  { value: '30+', label: 'Clients' },
];

const skills = [
  { name: 'Target', icon: Zap, label: 'Funnel Building' },
  { name: 'Wordpress', icon: Globe, label: 'WordPress Dev' },
  { name: 'Automation', icon: Code2, label: 'n8n Automation' },
  { name: 'Design', icon: Palette, label: 'UI/UX Design' },
];

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
      {/* Animated Background Elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 100, 0],
          y: [0, -50, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] right-[10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
          x: [0, -100, 0],
          y: [0, 50, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[10%] left-[10%] w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6">
            <Sparkles className="w-3 h-3 text-white" />
            <span className="text-[10px] font-heading tracking-[0.2em] text-foreground-muted uppercase">Discover More</span>
          </div>
          <h2 className="text-display text-6xl md:text-8xl bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
            ABOUT <span className="text-white">ME</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(180px,auto)]">
          {/* 1. Bio Card (Large) */}
          <SpotlightCard className="md:col-span-8 p-8 md:p-12" delay={0.1}>
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-opacity duration-500">
              <Code2 className="w-32 h-32 rotate-12" />
            </div>
            <h3 className="text-3xl font-heading mb-6 tracking-wide text-white">DIGITAL ARCHITECT</h3>
            <p className="text-foreground-muted text-lg md:text-xl leading-relaxed mb-10 max-w-2xl font-light">
              I don't just write code; I craft ecosystem-driven solutions. From high-converting <span className="text-accent underline underline-offset-4 decoration-accent/30">Funnels</span> to complex <span className="text-white underline underline-offset-4 decoration-white/30">Automations</span>,
              I bridge the gap between creative design and technical excellence.
            </p>
            <div className="flex flex-wrap gap-4 relative z-10">
              {/* Buttons removed as per user request */}
            </div>
          </SpotlightCard>

          {/* 2. Photo Card */}
          <SpotlightCard className="md:col-span-4 row-span-2 !p-0" delay={0.2}>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
            <motion.div
              className="w-full h-full"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={profileImage}
                alt="Usman Ali"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            </motion.div>
            <div className="absolute bottom-0 left-0 p-8 z-20">
              <div className="flex items-center gap-2 mb-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest">Online Now</span>
              </div>
              <p className="text-white font-heading text-2xl tracking-wide">LAHORE, PK</p>
            </div>
          </SpotlightCard>

          {/* 3. Stats Card */}
          <SpotlightCard className="md:col-span-4 bg-gradient-to-br from-accent to-accent-warm text-accent-foreground border-none" delay={0.3}>
            <div className="relative z-10 p-8 h-full flex flex-col justify-between">
              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat, i) => (
                  <div key={i} className="text-center group/stat">
                    <div className="text-3xl md:text-4xl font-display font-bold mb-1 group-hover/stat:scale-110 transition-transform">{stat.value}</div>
                    <div className="text-[10px] uppercase tracking-wider opacity-80">{stat.label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-black/10 flex justify-between items-center">
                <span className="text-xs font-bold tracking-widest">IMPACT</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
            {/* Decorative circles */}
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/20 rounded-full blur-3xl" />
            <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-black/10 rounded-full blur-3xl" />
          </SpotlightCard>

          {/* 4. Skills/Tech Stack */}
          <SpotlightCard className="md:col-span-4 p-8" delay={0.4}>
            <div className="h-full flex flex-col justify-between">
              <div>
                <h4 className="text-lg font-heading mb-6 text-white/80 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-accent" />
                  POWERHOUSE
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {skills.map((skill, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group/skill cursor-default border border-white/5 hover:border-white/20">
                      <div className="w-8 h-8 rounded-lg bg-black/40 flex items-center justify-center text-accent group-hover/skill:scale-110 transition-transform">
                        <skill.icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs text-foreground-muted font-medium group-hover/skill:text-foreground transition-colors">{skill.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
