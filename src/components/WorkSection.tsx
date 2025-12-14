import { motion } from 'framer-motion';
import GradientFillHeading from './GradientFillHeading';

const portfolioItems = [
  { image: 'https://i.imghippo.com/files/Ru8121U.png', title: 'Real Estate', category: 'Visual / Branding' },
  { image: 'https://i.imghippo.com/files/DP5337EdE.png', title: '100 Million Woman', category: 'Art Direction' },
  { image: 'https://i.imghippo.com/files/nFAY8010HLU.png', title: 'Fashion Shoot', category: 'Photography' },
  { image: 'https://i.imghippo.com/files/PXUi3588rlo.png', title: 'Postorganic', category: 'Design / Branding' },
  { image: 'https://i.imghippo.com/files/Cokp3232KW.png', title: 'Minimal Design', category: 'UI/UX' },
  { image: 'https://i.imghippo.com/files/cO6833Ag.png', title: 'Brand Identity', category: 'Branding' },
];

export default function WorkSection() {
  return (
    <section 
      id="work"
      className="relative py-32 px-6 section-dark"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-heading text-xs tracking-[0.3em] text-foreground-soft mb-4 block"
            >
              FEATURED WORK
            </motion.span>
            <GradientFillHeading text="PROJECTS" />
          </div>
          
          <motion.a
            href="#"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ x: 10 }}
            className="hidden md:inline-flex items-center gap-4 text-heading text-xs tracking-[0.2em] text-foreground group"
          >
            ALL PROJECTS
            <span className="w-8 h-px bg-foreground group-hover:w-16 transition-all duration-300" />
          </motion.a>
        </div>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-body-light text-foreground-muted mb-12 max-w-2xl"
        >
          Please explore my selected projects below. Click on each one for an overview
        </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="portfolio-frame h-[400px] mb-4 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-500"
                  loading="lazy"
                />
                
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-background/90 text-foreground text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  ↓ Scrolling...
                </div>
              </div>
              
              <h3 className="text-heading text-xl tracking-wider text-foreground group-hover:text-accent transition-colors mb-1">
                {item.title}
              </h3>
              <p className="text-xs text-foreground-soft tracking-wider">
                {item.category}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
