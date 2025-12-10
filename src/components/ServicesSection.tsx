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
    description: 'I create high-converting funnels using GoHighLevel, ClickFunnels, and Teachable. From lead capture to sales, every step is optimized to maximize conversions and engagement.',
  },
  {
    number: '03',
    title: 'N8N\nAUTOMATION',
    description: 'I design automation workflows with n8n to connect apps, automate repetitive tasks, and streamline your business processes, saving time and reducing errors.',
  },
  {
    number: '04',
    title: 'FIGMA\nDESIGN',
    description: 'I create visually appealing UI and funnel designs in Figma. My layouts are intuitive, user-friendly, and ready for WordPress implementation or development.',
  },
  {
    number: '05',
    title: 'CANVA\nDESIGN',
    description: 'I design professional graphics in Canva, including social posts, marketing materials, and assets for funnels and websites, ensuring a consistent and branded visual presence.',
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
        <div className="mb-16">
          <GradientFillHeading text="SERVICES" />
        </div>
        
        {/* Desktop: Horizontal overlapping cards */}
        <div className="hidden lg:block">
          <div className="flex items-center relative py-8">
            {services.map((service, index) => {
              const isActive = activeIndex === index;
              const offset = index * -200; // Overlap amount
              
              return (
                <motion.div
                  key={service.number}
                  className="service-card flex-shrink-0 w-[450px] h-[500px] relative"
                  style={{ 
                    marginLeft: index === 0 ? 0 : '-200px',
                    zIndex: isActive ? 10 : index,
                  }}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  animate={{
                    backgroundColor: isActive ? 'hsl(0 0% 96%)' : 'hsl(0 0% 10%)',
                    color: isActive ? 'hsl(0 0% 4%)' : 'hsl(0 0% 96%)',
                    y: isActive ? -8 : 0,
                    scale: isActive ? 1.02 : 1,
                  }}
                >
                  {/* Card number */}
                  <span 
                    className="absolute top-8 right-8 text-7xl font-display opacity-15"
                  >
                    {service.number}
                  </span>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-heading text-5xl leading-none mb-6 whitespace-pre-line">
                      {service.title}
                    </h3>
                    <p className="text-base leading-relaxed opacity-80 max-w-xs mb-8">
                      {service.description}
                    </p>
                    <motion.button
                      className="px-8 py-3 rounded-full border-2 border-current font-semibold text-sm tracking-wider"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isActive ? 1 : 0 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      READ MORE
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
        
        {/* Mobile: Stacked cards */}
        <div className="lg:hidden grid gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.number}
              className="service-card p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              style={{
                backgroundColor: index === 0 ? 'hsl(0 0% 96%)' : 'hsl(0 0% 10%)',
                color: index === 0 ? 'hsl(0 0% 4%)' : 'hsl(0 0% 96%)',
              }}
            >
              <span className="absolute top-6 right-6 text-5xl font-display opacity-15">
                {service.number}
              </span>
              
              <h3 className="text-heading text-3xl leading-none mb-4 whitespace-pre-line">
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed opacity-80 mb-6">
                {service.description}
              </p>
              <button className="px-6 py-2 rounded-full border-2 border-current font-semibold text-xs tracking-wider">
                READ MORE
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
