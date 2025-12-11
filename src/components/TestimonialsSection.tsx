import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import GradientFillHeading from './GradientFillHeading';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    number: '01',
    text: "Usman delivered an outstanding WordPress website for my business. Fast, responsive, and exactly what I envisioned. His attention to detail is remarkable!",
    author: 'Ahmed Khan',
    role: 'Business Owner',
  },
  {
    number: '02',
    text: "The GoHighLevel funnel he built increased our conversion rate by 40%. His expertise in automation saved us countless hours of manual work.",
    author: 'Sarah Mitchell',
    role: 'Marketing Director',
  },
  {
    number: '03',
    text: "Professional, creative, and always delivers on time. Usman's n8n automations streamlined our entire lead management process.",
    author: 'Michael Chen',
    role: 'Startup Founder',
  },
  {
    number: '04',
    text: "His Figma designs are clean and modern. The website he created perfectly represents our brand identity. Highly recommended!",
    author: 'Lisa Anderson',
    role: 'E-commerce Manager',
  },
  {
    number: '05',
    text: "Working with Usman was a great experience. He understood our needs quickly and delivered a solution that exceeded expectations.",
    author: 'David Park',
    role: 'Agency Owner',
  },
];

export default function TestimonialsSection() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    
    cards.forEach((card, index) => {
      if (index === cards.length - 1 || !card) return;
      
      const nextCard = cards[index + 1];
      if (!nextCard) return;
      
      const cardInner = card.querySelector('.testimonial-card');
      if (!cardInner) return;
      
      const toScale = 1 - (cards.length - 1 - index) * 0.03;
      
      ScrollTrigger.create({
        trigger: nextCard,
        start: 'top bottom',
        end: 'top center',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set(cardInner, {
            scale: 1 - (1 - toScale) * progress,
            filter: `brightness(${1 - 0.4 * progress})`,
          });
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      id="testimonials"
      className="relative py-32 px-6 section-darker"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-heading text-xs tracking-[0.3em] text-foreground-soft mb-4 block"
          >
            CLIENT FEEDBACK
          </motion.span>
          <GradientFillHeading text="TESTIMONIALS" />
        </div>
        
        <div className="relative space-y-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.number}
              ref={(el) => (cardsRef.current[index] = el)}
              className="sticky top-0"
              style={{ paddingTop: `${20 + index * 20}px` }}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="testimonial-card relative"
              >
                <Quote className="absolute top-6 right-6 w-8 h-8 text-background/20" />
                
                <span className="absolute top-6 left-6 text-base font-heading tracking-wider text-background/30">
                  {testimonial.number}
                </span>
                
                <p className="text-base md:text-lg leading-relaxed italic text-background/80 mt-12 mb-6">
                  "{testimonial.text}"
                </p>
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center">
                    <span className="text-background/60 text-sm font-bold">
                      {testimonial.author.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-background">
                      {testimonial.author}
                    </span>
                    <span className="text-xs text-background/60">
                      {testimonial.role}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
