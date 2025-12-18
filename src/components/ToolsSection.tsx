import { useRef } from 'react';
import { motion } from 'framer-motion';
import GradientFillHeading from './GradientFillHeading';
import { SpotlightCard } from './ui/spotlight-card';

const tools = [
  { name: 'Figma', category: 'Design', icon: 'https://i.postimg.cc/x1zcCtYB/figma.png', desc: 'UI/UX Prototyping' },
  { name: 'WordPress', category: 'CMS', icon: 'https://i.postimg.cc/rwMwVcn1/wordpress.png', desc: 'Custom Development' },
  { name: 'GoHighLevel', category: 'Funnel', icon: 'https://i.postimg.cc/B6V02fBF/gohighlevel.png', desc: 'Marketing Automation' },
  { name: 'n8n', category: 'Automation', icon: 'https://i.postimg.cc/G3zjbhmd/n8n.png', desc: 'Workflow Automation' },
  { name: 'JavaScript', category: 'Code', icon: 'https://i.postimg.cc/vBFQKsVd/js.png', desc: 'Interactive Logic' },
  { name: 'HTML5', category: 'Code', icon: 'https://i.postimg.cc/WzYCQGHm/html.png', desc: 'Semantic Structure' },
  { name: 'CSS3', category: 'Code', icon: 'https://i.postimg.cc/HxwBwwms/css.png', desc: 'Advanced Styling' },
  { name: 'Teachable', category: 'LMS', icon: 'https://i.postimg.cc/LXfcggh2/click-funnel.png', desc: 'Course Platforms' },
];

export default function ToolsSection() {
  return (
    <section id="tools" className="relative py-32 px-6 section-darker">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-heading text-xs tracking-[0.3em] text-foreground-soft mb-4 block"
          >
            MY ARSENAL
          </motion.span>
          <GradientFillHeading text="TOOLS OF TRADE" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {tools.map((tool, index) => (
            <SpotlightCard key={index} delay={index * 0.1} className="flex flex-col items-center text-center p-8 group">
              <div className="relative w-16 h-16 mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">
                <div className="absolute inset-0 bg-white/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img src={tool.icon} alt={tool.name} className="relative w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500" />
              </div>
              <h3 className="text-lg font-heading text-white mb-2">{tool.name}</h3>
              <p className="text-xs font-medium text-white/50 uppercase tracking-wider mb-2">{tool.category}</p>
              <div className="text-sm text-white/40 group-hover:text-white/70 transition-colors">
                {tool.desc}
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
