import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { BentoCard, BentoGrid } from '@/components/ui/bento-grid';
import { Marquee } from '@/components/ui/marquee';
import GradientFillHeading from './GradientFillHeading';
import { 
  Code, 
  Zap, 
  Share2, 
  Rocket,
  FileText,
  Bell,
  Calendar
} from 'lucide-react';

const files = [
  { name: "wordpress.pdf", body: "Custom WordPress themes and plugins development for modern businesses." },
  { name: "funnel-guide.pdf", body: "High-converting sales funnel strategies and implementation." },
  { name: "automation.xlsx", body: "n8n workflow templates for business process automation." },
  { name: "design-kit.fig", body: "UI/UX design systems and component libraries in Figma." },
  { name: "brand-assets.zip", body: "Complete brand identity packages including logos and guidelines." },
];

const notifications = [
  { title: "New Lead Captured", desc: "From landing page", time: "2m ago" },
  { title: "Funnel Conversion", desc: "+$499 sale", time: "5m ago" },
  { title: "Automation Complete", desc: "Email sequence sent", time: "10m ago" },
  { title: "Site Traffic Spike", desc: "+250 visitors", time: "15m ago" },
  { title: "New Client Inquiry", desc: "WordPress project", time: "25m ago" },
];

const integrations = [
  { name: "WordPress", icon: "WP" },
  { name: "Figma", icon: "FG" },
  { name: "ClickFunnels", icon: "CF" },
  { name: "n8n", icon: "N8" },
  { name: "GoHighLevel", icon: "GH" },
  { name: "Canva", icon: "CV" },
];

const AnimatedList = ({ className }: { className?: string }) => (
  <div className={cn("flex flex-col gap-2 p-4", className)}>
    {notifications.map((item, idx) => (
      <motion.div
        key={idx}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: idx * 0.2 }}
        className="flex items-start gap-3 p-3 rounded-lg bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700"
      >
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
          <Bell className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{item.title}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
        </div>
        <span className="text-xs text-gray-400 dark:text-gray-500">{item.time}</span>
      </motion.div>
    ))}
  </div>
);

const IntegrationBeam = ({ className }: { className?: string }) => (
  <div className={cn("flex items-center justify-center gap-6 p-8", className)}>
    <div className="grid grid-cols-3 gap-4">
      {integrations.map((int, idx) => (
        <motion.div
          key={idx}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: idx * 0.1 }}
          className="w-14 h-14 rounded-lg bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-300 hover:border-blue-500 hover:text-blue-500 transition-colors"
        >
          {int.icon}
        </motion.div>
      ))}
    </div>
  </div>
);

const features = [
  {
    Icon: FileText,
    name: "Save your files",
    description: "We automatically save your files as you type.",
    href: "#services",
    cta: "Learn more",
    className: "col-span-1 md:col-span-3 lg:col-span-1",
    background: (
      <Marquee
        pauseOnHover
        className="absolute top-10 [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] [--duration:20s]"
      >
        {files.map((f, idx) => (
          <figure
            key={idx}
            className={cn(
              "relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4 mx-2",
              "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
              "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
              "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none"
            )}
          >
            <div className="flex flex-col">
              <figcaption className="text-sm font-medium text-gray-900 dark:text-white">
                {f.name}
              </figcaption>
            </div>
            <blockquote className="mt-2 text-xs text-gray-600 dark:text-gray-400">{f.body}</blockquote>
          </figure>
        ))}
      </Marquee>
    ),
  },
  {
    Icon: Bell,
    name: "Notifications",
    description: "Get notified when something happens.",
    href: "#work",
    cta: "Learn more",
    className: "col-span-1 md:col-span-3 lg:col-span-2",
    background: (
      <AnimatedList className="absolute top-4 right-0 h-[300px] w-full [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)]" />
    ),
  },
  {
    Icon: Share2,
    name: "Integrations",
    description: "Supports 100+ integrations and counting.",
    href: "#tools",
    cta: "Learn more",
    className: "col-span-1 md:col-span-3 lg:col-span-2",
    background: (
      <IntegrationBeam className="absolute top-4 right-0 h-[300px] w-full [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)]" />
    ),
  },
  {
    Icon: Calendar,
    name: "Calendar",
    description: "Use the calendar to filter your files by date.",
    className: "col-span-1 md:col-span-3 lg:col-span-1",
    href: "#contact",
    cta: "Learn more",
    background: (
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-8xl opacity-20"
        >
          📅
        </motion.div>
      </div>
    ),
  },
];

export default function BentoSection() {
  return (
    <section id="capabilities" className="relative py-16 md:py-32 px-4 md:px-6 bg-white dark:bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-heading text-xs tracking-[0.3em] text-gray-500 dark:text-foreground-soft mb-4 block"
          >
            WHAT I DELIVER
          </motion.span>
          <GradientFillHeading text="CAPABILITIES" />
        </div>
        
        <BentoGrid className="lg:grid-rows-3">
          {features.map((feature, idx) => (
            <BentoCard key={idx} {...feature} />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
