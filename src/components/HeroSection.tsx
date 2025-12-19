import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronDown, Zap } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection(props: { id?: string }) {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const [activeWord, setActiveWord] = useState(0)

  const roles = [
    'WordPress Developer',
    'Funnel Builder',
    'Automation Expert',
    'Digital Architect',
    'Linus Library',
  ]

  /* ===============================
     Scroll fade animation
  =============================== */
  useEffect(() => {
    const section = sectionRef.current
    const content = contentRef.current
    if (!section || !content) return

    const tl = gsap.to(content, {
      opacity: 0,
      y: -50,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=400',
        scrub: 1,
      },
    })

    return () => {
      tl.scrollTrigger?.kill()
    }
  }, [])

  /* ===============================
     Rotating roles text
  =============================== */
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWord((prev) => (prev + 1) % roles.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section
      ref={sectionRef}
      id={props.id || 'hero-section'}
      className="w-full h-screen overflow-hidden z-0"
    >
      {/* ===============================
          Fixed Video Background
      =============================== */}
      <div className="fixed inset-0 w-full h-full z-0">
        <iframe
          src="https://player.vimeo.com/video/1148116381?background=1&autoplay=1&loop=1&byline=0&title=0&portrait=0&mute=1&transparent=0&responsive=1"
          className="w-full h-full object-cover pointer-events-none"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        ></iframe>

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* ===============================
          Main Content
      =============================== */}
      <div
        ref={contentRef}
        className="relative z-30 h-full flex flex-col items-start justify-center text-left px-6 md:px-12 lg:px-24"
      >
        {/* Headings */}
        <div className="mb-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-[14vw] sm:text-[12vw] md:text-[10vw] lg:text-[9vw] leading-[0.85] font-extrabold tracking-tight"
          >
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white to-accent">
              USMAN
            </span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-[14vw] sm:text-[12vw] md:text-[10vw] lg:text-[9vw] leading-[0.85] font-extrabold tracking-tight -mt-2"
          >
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-accent to-white">
              ALI
            </span>
          </motion.h2>
        </div>

        {/* Rotating roles */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mb-10 h-8"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={activeWord}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-xl md:text-2xl italic text-foreground-muted"
            >
              {roles[activeWord]}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 mb-16"
        >
          <button
            className="px-8 py-4 rounded-full bg-accent text-black font-bold tracking-wider hover:bg-white transition-all transform hover:scale-105 flex items-center gap-2"
            onClick={() => {
              const lenis = (window as any).lenis;
              const workSection = document.getElementById('work');
              if (lenis && workSection) {
                lenis.scrollTo(workSection, { offset: -80 });
              } else if (workSection) {
                workSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <Zap className="w-5 h-5" />
            VIEW PROJECTS
          </button>

          <button
            className="px-8 py-4 rounded-full border-2 border-white text-white font-bold tracking-wider hover:bg-white hover:text-black transition-all transform hover:scale-105"
            onClick={() => {
              const lenis = (window as any).lenis;
              const contactSection = document.getElementById('contact');
              if (lenis && contactSection) {
                lenis.scrollTo(contactSection, { offset: -80 });
              } else if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            GET IN TOUCH
          </button>
        </motion.div>
      </div>

      {/* ===============================
          Scroll Indicator
      =============================== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center"
      >
        <span className="text-[10px] tracking-[0.3em] mb-2 text-foreground-muted">
          SCROLL TO EXPLORE
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-foreground-muted" />
        </motion.div>
      </motion.div>

      {/* Decorative blobs */}
      <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full bg-white/5 blur-3xl" />
    </section>
  )
}
