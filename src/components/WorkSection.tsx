import { motion } from 'framer-motion';
import GradientFillHeading from './GradientFillHeading';

const portfolioItems = [
  { image: 'https://i.imghippo.com/files/Ru8121U.png', title: 'Website Design 1' },
  { image: 'https://i.imghippo.com/files/DP5337EdE.png', title: 'Website Design 2' },
  { image: 'https://i.imghippo.com/files/nFAY8010HLU.png', title: 'Website Design 3' },
  { image: 'https://i.imghippo.com/files/PXUi3588rlo.png', title: 'Website Design 4' },
  { image: 'https://i.imghippo.com/files/Cokp3232KW.png', title: 'Website Design 5' },
  { image: 'https://i.imghippo.com/files/cO6833Ag.png', title: 'Website Design 6' },
];

export default function WorkSection() {
  return (
    <section 
      id="work"
      className="relative py-32 px-6 section-dark overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <GradientFillHeading text="MY WORK" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="portfolio-frame h-[500px] cursor-pointer relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-auto"
                  loading="lazy"
                />
                
                {/* Hover indicator */}
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full bg-background/80 backdrop-blur-sm text-foreground text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  ↓ Scrolling...
                </div>
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              {/* Project info */}
              <div className="mt-4">
                <h3 className="text-heading text-xl text-foreground group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-foreground-soft text-sm mt-1">Web Design</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* View all button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 rounded-full border border-primary text-primary font-semibold text-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            View All Projects
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
