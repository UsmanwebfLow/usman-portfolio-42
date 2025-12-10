import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import avatarImage from '@/assets/avatar.png';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollAnimatedAvatar() {
  const avatarRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const avatar = avatarRef.current;
    const container = containerRef.current;
    if (!avatar || !container) return;

    // Set initial state
    gsap.set(avatar, {
      scale: 1,
      x: 0,
      y: 0,
      opacity: 1,
    });

    // Create master timeline for scroll animation
    const masterTimeline = gsap.timeline();

    // Part 1: Initial state to lifting up (scroll 0 - 800)
    ScrollTrigger.create({
      trigger: '#scroll-container',
      start: 'top top',
      end: '+=800',
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.to(avatar, {
          scale: 0.85 - progress * 0.1,
          y: -100 * progress,
          duration: 0.1,
          ease: 'none',
        });
      },
    });

    // Part 2: Move to right side for About section (scroll 800 - 1600)
    ScrollTrigger.create({
      trigger: '#scroll-container',
      start: '+=800',
      end: '+=800',
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const viewportWidth = window.innerWidth;
        gsap.to(avatar, {
          x: viewportWidth * 0.25 * progress,
          y: -100 - 50 * progress,
          scale: 0.75 - progress * 0.1,
          duration: 0.1,
          ease: 'none',
        });
      },
    });

    // Part 3: Move to left side for Services (scroll 1600 - 2800)
    ScrollTrigger.create({
      trigger: '#scroll-container',
      start: '+=1600',
      end: '+=1200',
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const viewportWidth = window.innerWidth;
        gsap.to(avatar, {
          x: viewportWidth * 0.25 - viewportWidth * 0.5 * progress,
          y: -150 + 100 * progress,
          scale: 0.65 + progress * 0.1,
          duration: 0.1,
          ease: 'none',
        });
      },
    });

    // Part 4: Move to center bottom for Work section (scroll 2800 - 4000)
    ScrollTrigger.create({
      trigger: '#scroll-container',
      start: '+=2800',
      end: '+=1200',
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const viewportWidth = window.innerWidth;
        gsap.to(avatar, {
          x: -viewportWidth * 0.25 + viewportWidth * 0.25 * progress,
          y: -50 + 200 * progress,
          scale: 0.75 - progress * 0.2,
          opacity: 1 - progress * 0.3,
          duration: 0.1,
          ease: 'none',
        });
      },
    });

    // Part 5: Fade back in for Tools section (scroll 4000 - 5000)
    ScrollTrigger.create({
      trigger: '#scroll-container',
      start: '+=4000',
      end: '+=1000',
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.to(avatar, {
          x: 0,
          y: 150 - 200 * progress,
          scale: 0.55 + progress * 0.15,
          opacity: 0.7 + progress * 0.3,
          duration: 0.1,
          ease: 'none',
        });
      },
    });

    // Part 6: Final position for Contact (scroll 5000 - 6000)
    ScrollTrigger.create({
      trigger: '#scroll-container',
      start: '+=5000',
      end: '+=1000',
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.to(avatar, {
          y: -50 - 100 * progress,
          scale: 0.7 - progress * 0.1,
          opacity: 1 - progress * 0.5,
          duration: 0.1,
          ease: 'none',
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="avatar-container fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] max-w-[600px] h-auto z-20"
    >
      <img
        ref={avatarRef}
        src={avatarImage}
        alt="Avatar"
        className="avatar-image w-full h-auto grayscale"
      />
    </div>
  );
}
