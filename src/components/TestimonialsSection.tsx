import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import GradientFillHeading from './GradientFillHeading';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    number: '01',
    text: "One of the best template I've ever had. I love it! It's fully customizable, well coded, fast and responsive.",
    author: '— Wironimo',
  },
  {
    number: '02',
    text: "Brilliant template. Tons of options, many concepts, design flexibility, code quality.",
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
    text: "I found a bug on iPhone and iPad and the author fixed it very quickly.",
    author: '— Admante',
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
      className="relative py-32 px-6 section-muted"
    >
      <div className="max-w-2xl mx-auto">
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
                <span className="absolute top-6 left-6 text-base font-heading tracking-wider text-foreground-muted/50">
                  {testimonial.number}
                </span>
                
                <p className="text-base md:text-lg leading-relaxed italic text-foreground-soft mt-10 mb-4">
                  "{testimonial.text}"
                </p>
                
                <span className="text-xs tracking-wider text-foreground-muted">
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
