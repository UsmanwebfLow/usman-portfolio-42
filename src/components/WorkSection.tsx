import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, Github, ExternalLink, Terminal, Cpu, Scan } from 'lucide-react';
import GradientFillHeading from './GradientFillHeading';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

const portfolioItems = [
  {
    id: '01',
    image: 'https://i.imghippo.com/files/Ru8121U.png',
    title: 'FITNESS ONE',
    category: 'BRANDING',
    tech: 'React / GSAP'
  },
  {
    id: '02',
    image: 'https://i.imghippo.com/files/DP5337EdE.png',
    title: '100M WOMAN',
    category: 'ART DIRECTION',
    tech: 'Next.js / WebGL'
  },
  {
    id: '03',
    image: 'https://i.imghippo.com/files/nFAY8010HLU.png',
    title: 'COLIN ESTATE',
    category: 'WEB APP',
    tech: 'Vue / Firebase'
  },
  {
    id: '04',
    image: 'https://i.imghippo.com/files/PXUi3588rlo.png',
    title: 'AGENCY X',
    category: 'DESIGN SYSTEM',
    tech: 'Figma / Storybook'
  },
  {
    id: '05',
    image: 'https://i.imghippo.com/files/Cokp3232KW.png',
    title: 'AUTO SERVICE',
    category: 'UI/UX',
    tech: 'React Native'
  },
  {
    id: '06',
    image: 'https://i.imghippo.com/files/cO6833Ag.png',
    title: 'E-COMMERCE',
    category: 'FULL STACK',
    tech: 'Shopify / Liquid'
  },
];

const ProjectCard = ({ item }: { item: typeof portfolioItems[0] }) => {
  return (
    <div className="group relative h-[400px] w-full perspective-1000">
      <div
        className="relative h-full w-full transition-all duration-500 preserve-3d group-hover:[transform:rotateX(10deg)_rotateY(-10deg)_translateZ(50px)]"
      >
        {/* Card Border/Glow */}
        <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-white/20 to-white/0 opacity-50 group-hover:opacity-100 transition-opacity" />

        {/* Main Card Content */}
        <div className="absolute inset-0 h-full w-full overflow-hidden rounded-xl bg-black border border-white/10">
          {/* Futuristic Overlay Graphics */}
          <div className="absolute top-4 left-4 z-20 flex gap-2">
            <div className="h-1 w-1 bg-white/50" />
            <div className="h-1 w-1 bg-white/50" />
            <div className="h-1 w-1 bg-white/50" />
          </div>
          <div className="absolute bottom-4 right-4 z-20 font-mono text-[9px] text-white/50 tracking-widest">
            SYS.ID.{item.id}
          </div>

          <div className="relative h-full w-full">
            <div className="absolute inset-0 bg-black/20 z-10 group-hover:bg-transparent transition-colors" />
            <img
              src={item.image}
              alt={item.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
            />
          </div>

          {/* Info Panel that Slides Up */}
          <div className="absolute inset-x-0 bottom-0 z-20 translate-y-full bg-black/80 backdrop-blur-md border-t border-white/10 p-6 transition-transform duration-300 group-hover:translate-y-0">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-heading text-white tracking-widest mb-1">{item.title}</h3>
                <p className="text-xs font-mono text-white/60 tracking-wider">[{item.category}]</p>
              </div>
              <ArrowUpRight className="w-5 h-5 text-white" />
            </div>
            <div className="mt-4 flex items-center gap-2 text-[10px] text-white/40 font-mono uppercase border-t border-white/5 pt-2">
              <Terminal className="w-3 h-3" />
              {item.tech}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function WorkSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse rotation logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section
      id="work"
      className="relative py-32 px-6 section-darker overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={containerRef}
      style={{ perspective: 1500 }}
    >
      {/* 3D Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d'
        }}
      >
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-24 gap-6" style={{ transform: 'translateZ(20px)' }}>
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Scan className="w-5 h-5 text-white animate-pulse" />
              <span className="text-xs font-mono text-white/50 tracking-[0.3em]">SYSTEM.PROJECTS.LOADED</span>
            </div>
            <GradientFillHeading text="SELECTED WORKS" />
          </div>

          <div className="hidden md:block">
            <Button variant="outline" className="border-white/10 bg-black/50 text-white hover:bg-white hover:text-black font-mono text-xs tracking-widest h-12 px-8">
              VIEW ARCHIVE [ALL]
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, z: -100 }}
              whileInView={{ opacity: 1, z: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ProjectCard item={item} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
