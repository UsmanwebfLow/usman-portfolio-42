import { motion } from 'framer-motion';
import GradientFillHeading from './GradientFillHeading';

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
            
            <GradientFillHeading text="CREATIVE" className="mb-2" />
            <GradientFillHeading text="DESIGNER" className="mb-2" />
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-heading text-xl md:text-2xl tracking-[0.1em] text-foreground-muted mt-6"
            >
              BASED IN MELBOURNE
            </motion.p>
          </div>
          
          {/* Right: Description */}
          <div className="lg:pt-20">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-body-light text-lg md:text-xl text-foreground-muted leading-relaxed mb-8"
            >
              I am dedicated to developing innovative solutions and impactful 
              experiences that meet user needs and exceed expectations.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-body-light text-base text-foreground-soft leading-relaxed mb-12"
            >
              With expertise in WordPress development, funnel building, and workflow 
              automation, I help businesses transform their digital presence and 
              streamline their operations.
            </motion.p>
            
            <motion.a
              href="#work"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ x: 10 }}
              className="inline-flex items-center gap-4 text-heading text-sm tracking-[0.2em] text-foreground group"
            >
              READ MORE
              <span className="w-12 h-px bg-foreground group-hover:w-20 transition-all duration-300" />
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
