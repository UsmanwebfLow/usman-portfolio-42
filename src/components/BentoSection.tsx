import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import GradientFillHeading from './GradientFillHeading';
import { SpotlightCard } from './ui/spotlight-card';
import {
  FileText,
  Bell,
  Share2,
  Calendar as CalendarIcon,
  ArrowRight
} from 'lucide-react';

const features = [
  {
    Icon: FileText,
    name: "Save your files",
    description: "We automatically save your files as you type.",
    href: "#services",
    cta: "Learn more",
    className: "col-span-1 md:col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50 transition-opacity duration-500 group-hover:opacity-100" />
    ),
  },
  {
    Icon: Bell,
    name: "Notifications",
    description: "Get notified when something happens.",
    href: "#work",
    cta: "Learn more",
    className: "col-span-1 md:col-span-3 lg:col-span-2",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
    ),
  },
  {
    Icon: Share2,
    name: "Integrations",
    description: "Supports 100+ integrations and counting.",
    href: "#tools",
    cta: "Learn more",
    className: "col-span-1 md:col-span-3 lg:col-span-2",
    background: (
      <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-50 transition-opacity duration-500">
        <div className="w-[80%] h-[80%] bg-gradient-to-tr from-white/5 via-white/10 to-transparent rounded-full blur-3xl" />
      </div>
    ),
  },
  {
    Icon: CalendarIcon,
    name: "Calendar",
    description: "Use the calendar to filter your files by date.",
    className: "col-span-1 md:col-span-3 lg:col-span-1",
    href: "#contact",
    cta: "Learn more",
    background: (
      <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
    ),
  },
];

export default function BentoSection() {
  return (
    <section id="capabilities" className="relative py-24 px-6 section-darker overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px] pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-heading text-xs tracking-[0.3em] text-foreground-soft mb-4 block"
          >
            WHAT I DELIVER
          </motion.span>
          <GradientFillHeading text="CAPABILITIES" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]">
          {features.map((feature, idx) => (
            <SpotlightCard
              key={idx}
              className={cn(feature.className, "p-0 overflow-hidden flex flex-col justify-between")}
              delay={idx * 0.1}
            >
              {/* Background Content */}
              <div className="absolute inset-0 z-0 h-full w-full">
                {feature.background}
              </div>

              {/* Futuristic Overlay Graphics */}
              <div className="absolute top-3 left-3 z-20 flex gap-1 opacity-50">
                <div className="h-0.5 w-0.5 bg-white" />
                <div className="h-0.5 w-0.5 bg-white" />
              </div>
              <div className="absolute top-3 right-3 z-20 text-[9px] font-mono text-white/30 tracking-widest">
                [0{idx + 1}]
              </div>

              {/* Foreground Content */}
              <div className="relative z-10 pointer-events-none p-6 pt-auto h-full flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center mb-4 border border-white/10 group-hover:bg-white group-hover:text-black transition-colors duration-300">
                  <feature.Icon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-heading mb-2 tracking-wide text-white">{feature.name}</h3>
                <p className="text-white/60 text-xs font-mono mb-4 leading-relaxed tracking-wide">{feature.description}</p>

                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 group-hover:text-white transition-colors">
                  <span className="font-mono">COMMAND</span>: {feature.cta}
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
