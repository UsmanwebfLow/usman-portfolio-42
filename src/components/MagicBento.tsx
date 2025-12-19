 import React, { useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import './MagicBento.css';

// Define video sources for each card
const cardVideos = [
  '/videos/analytics.mp4',
  '/videos/dashboard.mp4',
  '/videos/collaboration.mp4',
  '/videos/automation.mp4',
  '/videos/integration.mp4',
  '/videos/security.mp4'
];

// Define animation types for each card based on context
const cardAnimations = [
  'data-flow',      // Analytics - data visualization
  'dashboard-ui',   // Dashboard - UI elements
  'team-connect',   // Collaboration - team interaction
  'process-chain',  // Automation - workflow automation
  'api-connect',    // Integration - API connections
  'shield-pulse'    // Security - protection animation
];

export interface BentoCardProps {
  color?: string;
  title?: string;
  description?: string;
  label?: string;
  textAutoHide?: boolean;
  disableAnimations?: boolean;
  video?: string;
  animationType?: string;
  videoLink?: string;
}

export interface BentoProps {
  textAutoHide?: boolean;
  enableStars?: boolean;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  disableAnimations?: boolean;
  spotlightRadius?: number;
  particleCount?: number;
  enableTilt?: boolean;
  glowColor?: string;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
}

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = '255, 255, 255'; // White color
const MOBILE_BREAKPOINT = 768;

const cardData: BentoCardProps[] = [
  {
    color: '#000000', // Black background
    title: 'Analytics',
    description: 'Track user behavior and engagement metrics with real-time insights',
    label: 'Insights',
    video: '/videos/analytics.mp4',
    animationType: 'data-flow-video',
    videoLink: 'https://streamable.com/oowo56'
  },
  {
    color: '#000000', // Black background
    title: 'Dashboard',
    description: 'Centralized data view with customizable widgets and controls',
    label: 'Overview',
    video: '/videos/dashboard.mp4',
    animationType: 'dashboard-ui-video',
    videoLink: 'https://streamable.com/8y6szg'
  },
  {
    color: '#000000', // Black background
    title: 'Collaboration',
    description: 'Work together seamlessly with real-time sharing and feedback',
    label: 'Teamwork',
    video: '/videos/collaboration.mp4',
    animationType: 'team-connect-video',
    videoLink: 'https://streamable.com/42tp4m'
  },
  {
    color: '#000000', // Black background
    title: 'Automation',
    description: 'Streamline workflows with intelligent process automation',
    label: 'Efficiency',
    video: '/videos/automation.mp4',
    animationType: 'process-chain-video',
    videoLink: 'https://streamable.com/m90aaa'
  },
  {
    color: '#000000', // Black background
    title: 'Integration',
    description: 'Connect favorite tools with seamless API integrations',
    label: 'Connectivity',
    video: '/videos/integration.mp4',
    animationType: 'api-connect-video',
    videoLink: 'https://streamable.com/83vsa2'
  },
  {
    color: '#000000', // Black background
    title: 'Security',
    description: 'Enterprise-grade protection with end-to-end encryption',
    label: 'Protection',
    video: '/videos/security.mp4',
    animationType: 'shield-pulse-video',
    videoLink: 'https://streamable.com/76q6it'
  }
];

const createParticleElement = (x: number, y: number, color: string = DEFAULT_GLOW_COLOR): HTMLDivElement => {
  const el = document.createElement('div');
  el.className = 'particle';
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const calculateSpotlightValues = (radius: number) => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75
});

const updateCardGlowProperties = (card: HTMLElement, mouseX: number, mouseY: number, glow: number, radius: number) => {
  const rect = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;

  card.style.setProperty('--glow-x', `${relativeX}%`);
  card.style.setProperty('--glow-y', `${relativeY}%`);
  card.style.setProperty('--glow-intensity', glow.toString());
  card.style.setProperty('--glow-radius', `${radius}px`);
};

const ParticleCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  disableAnimations?: boolean;
  style?: React.CSSProperties;
  particleCount?: number;
  glowColor?: string;
  enableTilt?: boolean;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
  videoSrc?: string;
  animationType?: string;
  videoLink?: string;
}> = (props) => {
  const {
    children,
    className = '',
    disableAnimations = false,
    style,
    particleCount = DEFAULT_PARTICLE_COUNT,
    glowColor = DEFAULT_GLOW_COLOR,
    enableTilt = true,
    clickEffect = false,
    enableMagnetism = false,
    videoSrc,
    animationType = '',
    videoLink = ''
  } = props;
  const cardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const timeoutsRef = useRef<number[]>([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef<HTMLDivElement[]>([]);
  const particlesInitialized = useRef(false);
  const magnetismAnimationRef = useRef<gsap.core.Tween | null>(null);

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;

    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(Math.random() * width, Math.random() * height, glowColor)
    );
    particlesInitialized.current = true;
  }, [particleCount, glowColor]);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    magnetismAnimationRef.current?.kill();

    particlesRef.current.forEach(particle => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'back.in(1.7)',
        onComplete: () => {
          particle.parentNode?.removeChild(particle);
        }
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;

    if (!particlesInitialized.current) {
      initializeParticles();
    }

    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;

        const clone = particle.cloneNode(true) as HTMLDivElement;
        cardRef.current!.appendChild(clone);
        particlesRef.current.push(clone);

        gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });

        gsap.to(clone, {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: 'none',
          repeat: -1,
          yoyo: true
        });

        gsap.to(clone, {
          opacity: 0.3,
          duration: 1.5,
          ease: 'power2.inOut',
          repeat: -1,
          yoyo: true
        });
      }, index * 100);

      timeoutsRef.current.push(timeoutId);
    });
  }, [initializeParticles]);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;

    const element = cardRef.current;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      animateParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 5,
          rotateY: 5,
          duration: 0.3,
          ease: 'power2.out',
          transformPerspective: 1000
        });
      }
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }

      if (enableMagnetism) {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!enableTilt && !enableMagnetism) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(element, {
          rotateX,
          rotateY,
          duration: 0.1,
          ease: 'power2.out',
          transformPerspective: 1000
        });
      }

      if (enableMagnetism) {
        const magnetX = (x - centerX) * 0.05;
        const magnetY = (y - centerY) * 0.05;

        magnetismAnimationRef.current = gsap.to(element, {
          x: magnetX,
          y: magnetY,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (!clickEffect) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height)
      );

      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 1000;
      `;

      element.appendChild(ripple);

      gsap.fromTo(
        ripple,
        {
          scale: 0,
          opacity: 1
        },
        {
          scale: 1,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          onComplete: () => ripple.remove()
        }
      );
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('click', handleClick);

    return () => {
      isHoveredRef.current = false;
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('click', handleClick);
      clearAllParticles();
    };
  }, [animateParticles, clearAllParticles, disableAnimations, enableTilt, enableMagnetism, clickEffect, glowColor]);

  return (
    <div
      ref={cardRef}
      className={`${className} magic-bento-card particle-container`}
      style={{ ...style, position: 'relative', overflow: 'hidden', '--glow-color': glowColor } as React.CSSProperties}
    >
      {/* Video background */}
      <div className="magic-bento-video-container">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="magic-bento-video"
        >
          <source src={videoSrc || "/videos/background.mp4"} type="video/mp4" />
        </video>
      </div>
      <div className="magic-bento-video-overlay"></div>
      
      {/* Context-specific animations */}
      {animationType === 'data-flow' && (
        <div className="data-flow-animation">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="data-point" style={{
              left: `${10 + i * 20}%`,
              animationDelay: `${i * 0.2}s`
            }}></div>
          ))}
        </div>
      )}
      
      {animationType === 'data-flow-video' && (
        <div className="analytics-video-background">
          <div style={{ position: 'relative', width: '100%', height: '0px', paddingBottom: '75.000%' }}>
            <iframe 
              allow="fullscreen;autoplay" 
              allowFullScreen 
              height="100%" 
              src="https://streamable.com/e/oowo56?autoplay=1&muted=1&nocontrols=1" 
              width="100%" 
              style={{ border: 'none', width: '100%', height: '100%', position: 'absolute', left: '0px', top: '0px', overflow: 'hidden' }}
            />
          </div>
        </div>
      )}
      
      {animationType === 'dashboard-ui' && (
        <div className="dashboard-ui-animation">
          <div className="ui-grid">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="ui-element" style={{
                animationDelay: `${i * 0.1}s`
              }}></div>
            ))}
          </div>
        </div>
      )}
      
      {animationType === 'dashboard-ui-video' && (
        <div className="dashboard-video-background">
          <div style={{ position: 'relative', width: '100%', height: '0px', paddingBottom: '56.250%' }}>
            <iframe 
              allow="fullscreen;autoplay" 
              allowFullScreen 
              height="100%" 
              src="https://streamable.com/e/zv6k4s?autoplay=1&muted=1&nocontrols=1" 
              width="100%" 
              style={{ border: 'none', width: '100%', height: '100%', position: 'absolute', left: '0px', top: '0px', overflow: 'hidden' }}
            />
          </div>
        </div>
      )}
      
      {animationType === 'team-connect' && videoLink && (
        <a 
          href={videoLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="team-connect-link"
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            zIndex: 10,
            padding: '4px 8px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '4px',
            fontSize: '10px',
            color: 'white',
            textDecoration: 'none',
            backdropFilter: 'blur(4px)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          View Demo
        </a>
      )}
      
      {animationType === 'team-connect' && (
        <div className="team-connect-animation">
          <div className="team-members">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="team-member" style={{
                left: `${20 + i * 30}%`,
                animationDelay: `${i * 0.3}s`
              }}></div>
            ))}
          </div>
          <div className="connection-lines"></div>
        </div>
      )}
      
      {animationType === 'team-connect-video' && videoLink && (
        <div className="team-video-overlay">
          <div style={{ position: 'relative', width: '100%', height: '0px', paddingBottom: '56.250%' }}>
            <iframe 
              allow="fullscreen;autoplay" 
              allowFullScreen 
              height="100%" 
              src="https://streamable.com/e/42tp4m?autoplay=1&muted=1&nocontrols=1" 
              width="100%" 
              style={{ border: 'none', width: '100%', height: '100%', position: 'absolute', left: '0px', top: '0px', overflow: 'hidden' }}
            />
          </div>
        </div>
      )}
      
      {animationType === 'process-chain' && (
        <div className="process-chain-animation">
          <div className="process-elements">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="process-element" style={{
                left: `${15 + i * 25}%`,
                animationDelay: `${i * 0.4}s`
              }}>
                <div className="gear-icon"></div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {animationType === 'process-chain-video' && (
        <div className="automation-video-background">
          <div style={{ position: 'relative', width: '100%', height: '0px', paddingBottom: '54.147%' }}>
            <iframe 
              allow="fullscreen;autoplay" 
              allowFullScreen 
              height="100%" 
              src="https://streamable.com/e/m90aaa?autoplay=1&muted=1&nocontrols=1&speed=1.2" 
              width="100%" 
              style={{ border: 'none', width: '100%', height: '100%', position: 'absolute', left: '0px', top: '0px', overflow: 'hidden' }}
            />
          </div>
        </div>
      )}
      
      {animationType === 'api-connect' && (
        <div className="api-connect-animation">
          <div className="api-nodes">
            <div className="api-node node-1"></div>
            <div className="api-node node-2"></div>
            <div className="api-node node-3"></div>
            <div className="api-connections"></div>
          </div>
        </div>
      )}
      
      {animationType === 'api-connect-video' && (
        <div className="integration-video-background">
          <div style={{ position: 'relative', width: '100%', height: '0px', paddingBottom: '56.250%' }}>
            <iframe 
              allow="fullscreen;autoplay" 
              allowFullScreen 
              height="100%" 
              src="https://streamable.com/e/83vsa2?autoplay=1&muted=1&nocontrols=1" 
              width="100%" 
              style={{ border: 'none', width: '100%', height: '100%', position: 'absolute', left: '0px', top: '0px', overflow: 'hidden' }}
            />
          </div>
        </div>
      )}
      
      {animationType === 'shield-pulse' && (
        <div className="shield-pulse-animation">
          <div className="shield-icon"></div>
          <div className="pulse-waves">
            <div className="pulse-wave wave-1"></div>
            <div className="pulse-wave wave-2"></div>
            <div className="pulse-wave wave-3"></div>
          </div>
        </div>
      )}
      
      {animationType === 'shield-pulse-video' && (
        <div className="security-video-background">
          <div style={{ position: 'relative', width: '100%', height: '0px', paddingBottom: '56.250%' }}>
            <iframe 
              allow="fullscreen;autoplay" 
              allowFullScreen 
              height="100%" 
              src="https://streamable.com/e/76q6it?autoplay=1&muted=1&nocontrols=1" 
              width="100%" 
              style={{ border: 'none', width: '100%', height: '100%', position: 'absolute', left: '0px', top: '0px', overflow: 'hidden' }}
            />
          </div>
        </div>
      )}
      
      {children}
    </div>
  );
};

const GlobalSpotlight: React.FC<{
  gridRef: React.RefObject<HTMLDivElement | null>;
  disableAnimations?: boolean;
  enabled?: boolean;
  spotlightRadius?: number;
  glowColor?: string;
}> = ({
  gridRef,
  disableAnimations = false,
  enabled = true,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  glowColor = DEFAULT_GLOW_COLOR
}) => {
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const isInsideSection = useRef(false);

  useEffect(() => {
    if (disableAnimations || !gridRef?.current || !enabled) return;

    const spotlight = document.createElement('div');
    spotlight.className = 'global-spotlight';
    spotlight.style.cssText = `
      position: fixed;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${glowColor}, 0.15) 0%,
        rgba(${glowColor}, 0.08) 15%,
        rgba(${glowColor}, 0.04) 25%,
        rgba(${glowColor}, 0.02) 40%,
        rgba(${glowColor}, 0.01) 65%,
        transparent 70%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current || !gridRef.current) return;

      const section = gridRef.current.closest('.bento-section');
      const rect = section?.getBoundingClientRect();
      const mouseInside =
        rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;

      isInsideSection.current = mouseInside || false;
      const cards = gridRef.current.querySelectorAll('.magic-bento-card');

      if (!mouseInside) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
        cards.forEach(card => {
          (card as HTMLElement).style.setProperty('--glow-intensity', '0');
        });
        return;
      }

      const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius);

      gsap.to(spotlightRef.current, {
        x: e.clientX,
        y: e.clientY,
        opacity: 1,
        duration: 0.1,
        ease: 'power2.out'
      });

      cards.forEach(card => {
        const cardRect = card.getBoundingClientRect();
        const cardCenterX = cardRect.left + cardRect.width / 2;
        const cardCenterY = cardRect.top + cardRect.height / 2;
        const distance = Math.hypot(e.clientX - cardCenterX, e.clientY - cardCenterY);

        let glowIntensity = 0;
        if (distance < proximity) {
          glowIntensity = 1 - distance / proximity;
        } else if (distance < fadeDistance) {
          glowIntensity = 1 - (distance - proximity) / (fadeDistance - proximity);
        }

        updateCardGlowProperties(card as HTMLElement, e.clientX, e.clientY, glowIntensity, spotlightRadius);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (spotlightRef.current && spotlightRef.current.parentNode) {
        spotlightRef.current.parentNode.removeChild(spotlightRef.current);
      }
    };
  }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);

  return null;
};

const MagicBento: React.FC<BentoProps> = ({
  textAutoHide = false,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = DEFAULT_PARTICLE_COUNT,
  enableTilt = true,
  glowColor = DEFAULT_GLOW_COLOR,
  clickEffect = false,
  enableMagnetism = false
}) => {
  const gridRef = useRef<HTMLDivElement>(null);

  return (
    <div className="bento-section">
      <GlobalSpotlight
        gridRef={gridRef}
        disableAnimations={disableAnimations}
        enabled={enableSpotlight}
        spotlightRadius={spotlightRadius}
        glowColor={glowColor}
      />
      <div ref={gridRef} className="card-grid">
        {cardData.map((card, index) => (
          <ParticleCard
            key={index}
            disableAnimations={disableAnimations}
            particleCount={enableStars ? particleCount : 0}
            glowColor={glowColor}
            enableTilt={enableTilt}
            clickEffect={clickEffect}
            enableMagnetism={enableMagnetism}
            style={{ '--card-bg': card.color } as React.CSSProperties}
            className={`magic-bento-card ${enableBorderGlow ? 'magic-bento-card--border-glow' : ''} magic-bento-card--hover-text`}
            videoSrc={card.video}
            animationType={card.animationType}
            videoLink={card.videoLink}
          >
            <div className="magic-bento-card__header">
              <div className="magic-bento-card__label">{card.label}</div>
            </div>
            <div className="magic-bento-card__content">
              <h3 className="magic-bento-card__title">{card.title}</h3>
              <p className="magic-bento-card__description">{card.description}</p>
            </div>
          </ParticleCard>
        ))}
      </div>
    </div>
  );
};

export default MagicBento;