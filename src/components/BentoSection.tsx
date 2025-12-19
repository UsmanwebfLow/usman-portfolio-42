import { motion } from 'framer-motion';
import GradientFillHeading from './GradientFillHeading';
import MagicBento from './MagicBento';

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

        <MagicBento />
      </div>
    </section>
  );
}
