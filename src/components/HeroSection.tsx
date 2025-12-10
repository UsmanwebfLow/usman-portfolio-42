import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import avatarImage from '@/assets/avatar.png';
import { Facebook, Dribbble, Youtube, Instagram } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const avatarRef = useRef<HTMLImageElement>(null);
  const bgMaskRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const name = nameRef.current;
    const subtitle = subtitleRef.current;
    const avatar = avatarRef.current;
    const bgMask = bgMaskRef.current;
    
    if (!section || !name || !subtitle || !avatar || !bgMask) return;

    // Pin the hero section
    ScrollTrigger.create({
      trigger: '#scroll-container',
      pin: '#hero-section',
      start: 'top top',
      end: '+=6000',
      pinSpacing: false,
    });

    // Animate background mask opening (like scooter)
    gsap.fromTo(bgMask, 
      { clipPath: 'inset(45% 0 45% 0)' },
      {
        clipPath: 'inset(0% 0 0% 0)',
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#scroll-container',
          start: 'top top',
          end: '+=400',
          scrub: 1,
        },
      }
    );

    // Animate name text scaling down
    gsap.to(name, {
      scale: 0,
      opacity: 0,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#scroll-container',
        start: '+=200',
        end: '+=400',
        scrub: 1,
      },
    });

    // Animate subtitle
    gsap.to(subtitle, {
      scale: 0,
      opacity: 0,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#scroll-container',
        start: '+=300',
        end: '+=400',
        scrub: 1,
      },
    });

    // Avatar animation - starts centered, then moves through sections
    // Initial: lift up and scale down
    gsap.fromTo(avatar,
      { scale: 1, y: 0, x: 0, opacity: 1 },
      {
        scale: 0.8,
        y: -150,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#scroll-container',
          start: '+=500',
          end: '+=700',
          scrub: 1,
        },
      }
    );

    // Move avatar to the right for About section
    gsap.to(avatar, {
      x: '30vw',
      y: -100,
      scale: 0.7,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: '#scroll-container',
        start: '+=1000',
        end: '+=800',
        scrub: 1,
      },
    });

    // Move avatar to the left for Services
    gsap.to(avatar, {
      x: '-25vw',
      y: 50,
      scale: 0.65,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: '#scroll-container',
        start: '+=2000',
        end: '+=800',
        scrub: 1,
      },
    });

    // Avatar fades for Work section
    gsap.to(avatar, {
      opacity: 0.3,
      x: '10vw',
      y: 100,
      scale: 0.5,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: '#scroll-container',
        start: '+=3000',
        end: '+=800',
        scrub: 1,
      },
    });

    // Avatar comes back for final sections
    gsap.to(avatar, {
      opacity: 1,
      x: 0,
      y: -50,
      scale: 0.6,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: '#scroll-container',
        start: '+=4500',
        end: '+=800',
        scrub: 1,
      },
    });

    // Final fade out
    gsap.to(avatar, {
      opacity: 0,
      y: -200,
      scale: 0.4,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#scroll-container',
        start: '+=5500',
        end: '+=500',
        scrub: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="hero-section"
      className="relative h-screen w-full overflow-hidden section-dark"
    >
      {/* Background mask (like scooter demo) */}
      <div 
        ref={bgMaskRef}
        className="masked-bg"
      />
      
      {/* Avatar image - pinned and animated */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <img
          ref={avatarRef}
          src={avatarImage}
          alt="Portrait"
          className="h-[85vh] w-auto object-contain grayscale"
        />
      </div>
      
      {/* Social links - left side */}
      <div className="social-links-vertical hidden md:flex">
        {[Facebook, Dribbble, Instagram, Youtube].map((Icon, index) => (
          <motion.a
            key={index}
            href="#"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 + index * 0.1 }}
            className="text-foreground-muted hover:text-foreground transition-colors"
          >
            <Icon className="w-4 h-4" />
          </motion.a>
        ))}
      </div>
      
      {/* Main content */}
      <div className="relative z-30 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.h1
          ref={nameRef}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-display text-[15vw] md:text-[12vw] lg:text-[10vw] text-foreground leading-none"
        >
          <span className="block">JESPER</span>
          <span className="block">DIETRICH</span>
        </motion.h1>
        
        <motion.p
          ref={subtitleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-heading text-sm md:text-base tracking-[0.3em] text-foreground-muted mt-8"
        >
          OVER 15 YEARS OF EXPERIENCE
          <br />
          <span className="text-foreground-soft">IN THE DESIGN INDUSTRY</span>
        </motion.p>
      </div>
      
      {/* Scroll indicator - circular text */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 right-10 z-40"
      >
        <div className="relative w-24 h-24">
          <svg 
            viewBox="0 0 100 100" 
            className="w-full h-full animate-spin-slow"
          >
            <defs>
              <path
                id="circlePath"
                d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
              />
            </defs>
            <text className="fill-foreground-muted text-[9px] uppercase tracking-[0.2em]">
              <textPath href="#circlePath">
                - Scroll to Explore - Scroll to Explore 
              </textPath>
            </text>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-foreground"
            >
              ↓
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
