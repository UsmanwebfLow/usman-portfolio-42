import { useState } from 'react';
import { motion } from 'framer-motion';
import GradientFillHeading from './GradientFillHeading';

const services = [
  {
    number: '01',
    title: 'WORDPRESS\nDEVELOPMENT',
    description: 'I build clean, modern and responsive WordPress websites and landing pages. Every site is fully functional, easy to manage, and tailored to reflect your brand identity.',
  },
  {
    number: '02',
    title: 'FUNNEL\nBUILDING',
    description: 'I create high-converting funnels using GoHighLevel, ClickFunnels, and Teachable. From lead capture to sales, every step is optimized to maximize conversions.',
  },
  {
    number: '03',
    title: 'N8N\nAUTOMATION',
    description: 'I design automation workflows with n8n to connect apps, automate repetitive tasks, and streamline your business processes, saving time and reducing errors.',
  },
  {
    number: '04',
    title: 'FIGMA\nDESIGN',
    description: 'I create visually appealing UI and funnel designs in Figma. My layouts are intuitive, user-friendly, and ready for implementation.',
  },
  {
    number: '05',
    title: 'CANVA\nDESIGN',
    description: 'I design professional graphics in Canva, including social posts, marketing materials, and assets for funnels and websites.',
  },
];

export default function ServicesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const activeIndex = hoveredIndex !== null ? hoveredIndex : 0;

  return (
    <section 
      id="services"
      className="relative py-32 px-6 section-muted overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-heading text-xs tracking-[0.3em] text-foreground-soft mb-4 block"
          >
            WHAT I DO
          </motion.span>
          <GradientFillHeading text="SERVICES" />
        </div>
        
        {/* Desktop: Horizontal overlapping cards */}
        <div className="hidden lg:block">
          <div className="flex items-center relative py-8 overflow-x-auto">
            {services.map((service, index) => {
              const isActive = activeIndex === index;
              
              return (
                <motion.div
                  key={service.number}
                  className="service-card-jesper flex-shrink-0 w-[400px] min-h-[450px] relative"
                  style={{ 
                    marginLeft: index === 0 ? 0 : '-180px',
                    zIndex: isActive ? 10 : index,
                  }}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  animate={{
                    backgroundColor: isActive ? 'hsl(0 0% 98%)' : 'hsl(0 0% 6%)',
                    color: isActive ? 'hsl(0 0% 0%)' : 'hsl(0 0% 98%)',
                    y: isActive ? -10 : 0,
                    scale: isActive ? 1.02 : 1,
                  }}
                >
                  <span className="absolute top-8 right-8 text-6xl font-display opacity-10">
                    {service.number}
                  </span>
                  
                  <div className="relative z-10">
                    <h3 className="text-heading text-4xl leading-none mb-6 whitespace-pre-line tracking-wider">
                      {service.title}
                    </h3>
                    <p className="text-sm leading-relaxed opacity-70 max-w-xs mb-8">
                      {service.description}
                    </p>
                    <motion.button
                      className="text-heading text-xs tracking-[0.2em] flex items-center gap-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isActive ? 1 : 0 }}
                    >
                      READ MORE
                      <span className="w-8 h-px bg-current" />
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
        
        {/* Mobile: Stacked cards */}
        <div className="lg:hidden grid gap-4">
          {services.map((service, index) => (
            <motion.div
              key={service.number}
              className="service-card-jesper"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              style={{
                backgroundColor: index === 0 ? 'hsl(0 0% 98%)' : 'hsl(0 0% 6%)',
                color: index === 0 ? 'hsl(0 0% 0%)' : 'hsl(0 0% 98%)',
              }}
            >
              <span className="absolute top-6 right-6 text-4xl font-display opacity-10">
                {service.number}
              </span>
              
              <h3 className="text-heading text-2xl leading-none mb-4 whitespace-pre-line tracking-wider">
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed opacity-70 mb-4">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
