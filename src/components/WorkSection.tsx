import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Github, Eye, Layers, Grid3X3, Sparkles, Filter, X } from 'lucide-react';
import GradientFillHeading from './GradientFillHeading';
import { Button } from './ui/button';

const portfolioItems = [
  {
    id: '01',
    image: 'https://i.imghippo.com/files/Ru8121U.png',
    title: 'FITNESS ONE',
    category: 'BRANDING',
    tech: 'React / GSAP',
    description: 'Complete brand identity and digital presence for a modern fitness studio.',
    tags: ['Branding', 'Web Design', 'Motion'],
    featured: true
  },
  {
    id: '02',
    image: 'https://i.imghippo.com/files/DP5337EdE.png',
    title: '100M WOMAN',
    category: 'ART DIRECTION',
    tech: 'Next.js / WebGL',
    description: 'Art direction and immersive web experience for a global women empowerment campaign.',
    tags: ['Art Direction', '3D', 'Campaign'],
    featured: true
  },
  {
    id: '03',
    image: 'https://i.imghippo.com/files/nFAY8010HLU.png',
    title: 'COLIN ESTATE',
    category: 'WEB APP',
    tech: 'Vue / Firebase',
    description: 'Full-stack property management platform with real-time analytics dashboard.',
    tags: ['Real Estate', 'Dashboard', 'CRM'],
    featured: true
  },
  {
    id: '04',
    image: 'https://i.imghippo.com/files/PXUi3588rlo.png',
    title: 'AGENCY X',
    category: 'DESIGN SYSTEM',
    tech: 'Figma / Storybook',
    description: 'Comprehensive design system and component library for a creative agency.',
    tags: ['Design System', 'UI Kit', 'Documentation'],
    featured: false
  },
  {
    id: '05',
    image: 'https://i.imghippo.com/files/Cokp3232KW.png',
    title: 'AUTO SERVICE',
    category: 'UI/UX',
    tech: 'React Native',
    description: 'Mobile-first service booking app with integrated payment processing.',
    tags: ['Mobile App', 'Booking', 'Payments'],
    featured: false
  },
  {
    id: '06',
    image: 'https://i.imghippo.com/files/cO6833Ag.png',
    title: 'E-COMMERCE',
    category: 'FULL STACK',
    tech: 'Shopify / Liquid',
    description: 'Custom e-commerce solution with advanced product customization features.',
    tags: ['E-commerce', 'Shopify', 'Customization'],
    featured: false
  },
];

const categories = ['ALL', 'BRANDING', 'ART DIRECTION', 'WEB APP', 'DESIGN SYSTEM', 'UI/UX', 'FULL STACK'];

const ProjectCard = ({ item }: { item: typeof portfolioItems[0] }) => {
  const [isHovered, setIsHovered] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll effect when hovered
  useEffect(() => {
    if (isHovered && imageRef.current) {
      const scrollImage = () => {
        if (imageRef.current) {
          // Reset scroll position
          imageRef.current.scrollTop = 0;
          
          // Auto-scroll after a delay
          scrollIntervalRef.current = setTimeout(() => {
            let scrollPosition = 0;
            const scrollStep = 1;
            const maxScroll = imageRef.current!.scrollHeight - imageRef.current!.clientHeight;
            
            const interval = setInterval(() => {
              if (scrollPosition < maxScroll && isHovered) {
                scrollPosition += scrollStep;
                if (imageRef.current) {
                  imageRef.current.scrollTop = scrollPosition;
                }
              } else if (!isHovered) {
                clearInterval(interval);
              } else {
                // Reset to top when reaching bottom
                scrollPosition = 0;
                if (imageRef.current) {
                  imageRef.current.scrollTop = 0;
                }
              }
            }, 30);
            
            // Clear interval when unmounting or unhovering
            return () => clearInterval(interval);
          }, 500);
        }
      };
      
      // Start auto-scroll after a short delay
      const timer = setTimeout(scrollImage, 300);
      return () => {
        clearTimeout(timer);
        if (scrollIntervalRef.current) {
          clearTimeout(scrollIntervalRef.current);
        }
      };
    }
  }, [isHovered]);

  return (
    <div 
      className="group relative h-[450px] w-full rounded-2xl overflow-hidden bg-gray-900 border border-white/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background image with auto-scroll */}
      <div 
        ref={imageRef}
        className="absolute inset-0 transition-all duration-700 overflow-y-auto scrollbar-hide"
        style={{ scrollBehavior: 'smooth' }}
      >
        <img
          src={item.image}
          alt={item.title}
          className="w-full object-cover transition-all duration-700"
          style={{ 
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            filter: isHovered ? 'grayscale(0%) brightness(1.05)' : 'grayscale(60%) brightness(0.7)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-8 z-10">
        {/* Featured badge */}
        {item.featured && (
          <div className="absolute top-6 left-6">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white text-black text-xs font-bold tracking-wider">
              <Sparkles className="w-3 h-3" />
              FEATURED
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {item.tags.map((tag, index) => (
            <span 
              key={index}
              className="px-3 py-1 text-xs font-mono tracking-wider rounded-full bg-white/10 backdrop-blur-sm text-white/90 border border-white/20"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title and category */}
        <div className="mb-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-2xl font-bold text-white tracking-tight">{item.title}</h3>
            <div className="flex gap-3">
              <Eye className="w-5 h-5 text-white/60 hover:text-white transition-colors cursor-pointer" />
              <Github className="w-5 h-5 text-white/60 hover:text-white transition-colors cursor-pointer" />
            </div>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm font-mono text-white tracking-widest">{item.category}</span>
            <div className="w-1 h-1 rounded-full bg-white/40" />
            <span className="text-sm font-mono text-white/70">{item.tech}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-base text-white/90 mb-6 leading-relaxed">
          {item.description}
        </p>
      </div>

      {/* Project ID badge */}
      <div className="absolute top-6 right-6">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-sm border border-white/20">
          <Layers className="w-4 h-4 text-white" />
          <span className="text-sm font-mono text-white/80 tracking-wider">ID: {item.id}</span>
        </div>
      </div>

      {/* Hover effect - subtle glow */}
      <div className={`absolute inset-0 rounded-2xl pointer-events-none transition-all duration-500 ${
        isHovered ? 'shadow-[0_0_30px_rgba(255,255,255,0.3)]' : 'shadow-none'
      }`} />
    </div>
  );
};

export default function WorkSection() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [filteredProjects, setFilteredProjects] = useState(portfolioItems);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter projects based on category
  useEffect(() => {
    if (activeCategory === 'ALL') {
      setFilteredProjects(portfolioItems);
    } else {
      setFilteredProjects(portfolioItems.filter(project => project.category === activeCategory));
    }
  }, [activeCategory]);

  return (
    <section id="work" className="relative py-32 px-6 section-darker overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)] opacity-50" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-24 gap-8">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <Sparkles className="w-6 h-6 text-white animate-pulse" />
                <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-white animate-ping" />
              </div>
              <span className="text-xs font-mono text-white/70 tracking-[0.3em]">PORTFOLIO</span>
            </div>
            <GradientFillHeading text="FEATURED PROJECTS" />
          </div>

          {/* Filter controls */}
          <div className="flex flex-col items-end gap-4">
            <Button 
              variant="outline" 
              className="border-white/30 bg-black/60 text-white hover:bg-white hover:text-black font-mono text-sm tracking-widest h-12 px-6 rounded-lg flex items-center gap-2 transition-all duration-300"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter className="w-4 h-4" />
              FILTER PROJECTS
              {isFilterOpen ? <X className="w-4 h-4" /> : <Grid3X3 className="w-4 h-4" />}
            </Button>
            
            {isFilterOpen && (
              <motion.div 
                className="flex flex-wrap gap-3 justify-end"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                      activeCategory === category
                        ? 'bg-white text-black'
                        : 'bg-black/50 text-white border border-white/20 hover:bg-white/10'
                    }`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredProjects.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ProjectCard item={item} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}