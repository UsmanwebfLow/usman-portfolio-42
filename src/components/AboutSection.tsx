import { motion } from 'framer-motion';
import GradientFillHeading from './GradientFillHeading';

export default function AboutSection() {
  return (
    <section 
      id="about"
      className="relative min-h-screen py-32 px-6 section-darker overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
      
      <div className="max-w-6xl mx-auto">
        <GradientFillHeading text="ABOUT ME" className="mb-16" />
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image/Visual side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Decorative frame */}
              <div className="absolute inset-0 border-2 border-primary/30 rounded-3xl transform rotate-3" />
              <div className="absolute inset-0 border-2 border-foreground/10 rounded-3xl transform -rotate-3" />
              
              {/* Main container */}
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-background-elevated to-background-muted p-1">
                <div className="rounded-3xl overflow-hidden bg-background-muted aspect-square flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <span className="text-5xl font-display text-primary-foreground">JD</span>
                    </div>
                    <p className="text-foreground-muted">Your Avatar Here</p>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-4 -right-4 px-4 py-2 bg-primary rounded-full text-primary-foreground text-sm font-semibold"
              >
                5+ Years
              </motion.div>
              
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                className="absolute -bottom-4 -left-4 px-4 py-2 bg-background-elevated border border-border rounded-full text-foreground text-sm font-semibold"
              >
                100+ Projects
              </motion.div>
            </div>
          </motion.div>
          
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-heading text-3xl md:text-4xl text-foreground">
              Crafting Digital Experiences That Leave a Mark
            </h3>
            
            <p className="text-foreground-muted text-lg leading-relaxed">
              I'm a passionate creative developer specializing in building immersive web experiences. 
              With expertise in WordPress, funnel building, and automation, I help businesses 
              transform their digital presence.
            </p>
            
            <p className="text-foreground-muted text-lg leading-relaxed">
              My approach combines clean code with stunning visuals, ensuring every project 
              not only looks beautiful but performs flawlessly. I believe in the power of 
              thoughtful design and seamless user experiences.
            </p>
            
            <div className="grid grid-cols-2 gap-6 pt-6">
              {[
                { label: 'Projects Completed', value: '100+' },
                { label: 'Happy Clients', value: '50+' },
                { label: 'Years Experience', value: '5+' },
                { label: 'Awards Won', value: '12' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-4 rounded-2xl bg-background-muted border border-border"
                >
                  <div className="text-3xl font-display text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-foreground-soft">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
