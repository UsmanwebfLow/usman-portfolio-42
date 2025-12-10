import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import GradientFillHeading from './GradientFillHeading';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    number: '01',
    text: "One of the best template I've ever had. I love it! It's fully customizable, well coded, fast and responsive - fitting for all kind of devices.",
    author: '— Wironimo',
  },
  {
    number: '02',
    text: "Brilliant template. Tons of options, many concepts, design flexibility, code quality, explanatory comments in each section for easy styling.",
    author: '— Gneto',
  },
  {
    number: '03',
    text: "Easy to customize, plenty of choices to display your portfolio, fast loading times. Excellent support.",
    author: '— Brendck',
  },
  {
    number: '04',
    text: "Very nice design and well organised and commented code. Also good customer service.",
    author: '— Gazzzz',
  },
  {
    number: '05',
    text: "I found a bug on iPhone and iPad and the author fixed it very quickly. I appreciated his efforts and fast response.",
    author: '— Admante',
  },
];

export default function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
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
      className="relative py-32 px-6 section-muted overflow-hidden"
    >
      <div className="max-w-3xl mx-auto">
        <div className="mb-16 text-center">
          <GradientFillHeading text="TESTIMONIALS" />
        </div>
        
        <div 
          ref={containerRef}
          className="relative space-y-10"
          style={{ '--cards-count': testimonials.length } as React.CSSProperties}
        >
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
                {/* Number badge */}
                <span className="absolute top-4 left-4 text-lg font-semibold text-foreground-soft">
                  {testimonial.number}
                </span>
                
                {/* Quote */}
                <p className="text-lg leading-relaxed italic text-foreground-muted mt-8 mb-4">
                  "{testimonial.text}"
                </p>
                
                {/* Author */}
                <span className="text-sm text-foreground-soft">
                  {testimonial.author}
                </span>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
