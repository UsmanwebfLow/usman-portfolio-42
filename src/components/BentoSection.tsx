import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { BentoCard, BentoGrid } from '@/components/ui/bento-grid';
import { Marquee } from '@/components/ui/marquee';
import GradientFillHeading from './GradientFillHeading';
import { Calendar } from '@/components/ui/calendar';
import { 
  FileText,
  Bell,
  Share2,
  Calendar as CalendarIcon
} from 'lucide-react';

const files = [
  { name: "bitcoin.pdf", body: "Bitcoin is a cryptocurrency invented in 2008 by an unknown person or group of people using the name Satoshi Nakamoto." },
  { name: "finances.xlsx", body: "A spreadsheet or worksheet is a file made of rows and columns that help sort data, arrange data easily, and calculate numerical data." },
  { name: "logo.svg", body: "Scalable Vector Graphics is an Extensible Markup Language-based vector image format for two-dimensional graphics with support for interactivity and animation." },
  { name: "keys.gpg", body: "GPG keys are used to encrypt and decrypt email, files, directories, and whole disk partitions and to authenticate messages." },
  { name: "seed.txt", body: "A seed phrase, seed recovery phrase or backup seed phrase is a list of words which store all the information needed to recover Bitcoin funds on-chain." },
];

const notifications = [
  { title: "Payment received", desc: "Magic UI - $2,000", time: "15m ago", color: "bg-green-500" },
  { title: "User signed up", desc: "john@example.com", time: "10m ago", color: "bg-blue-500" },
  { title: "New message", desc: "5 unread messages", time: "5m ago", color: "bg-purple-500" },
  { title: "Subscription created", desc: "Pro Plan - $99/mo", time: "2m ago", color: "bg-orange-500" },
  { title: "Task completed", desc: "Project deployment", time: "Just now", color: "bg-cyan-500" },
];

const integrations = [
  { name: "Google Drive", icon: "📁", color: "from-yellow-400 to-yellow-600" },
  { name: "Notion", icon: "📝", color: "from-gray-600 to-gray-800" },
  { name: "Slack", icon: "💬", color: "from-purple-500 to-purple-700" },
  { name: "Discord", icon: "🎮", color: "from-indigo-500 to-indigo-700" },
  { name: "Linear", icon: "📊", color: "from-blue-500 to-blue-700" },
  { name: "Figma", icon: "🎨", color: "from-pink-500 to-pink-700" },
];

const AnimatedList = ({ className }: { className?: string }) => (
  <div className={cn("flex flex-col gap-2 p-4", className)}>
    {notifications.map((item, idx) => (
      <motion.div
        key={idx}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: idx * 0.15, duration: 0.4 }}
        className={cn(
          "flex items-start gap-3 p-3 rounded-xl border backdrop-blur-sm",
          "border-white/20 bg-white/10 hover:bg-white/20",
          "transform-gpu transition-all duration-300 ease-out hover:scale-[1.02]"
        )}
      >
        <div className={cn("w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0", item.color)}>
          <Bell className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white truncate">{item.title}</p>
          <p className="text-xs text-white/70">{item.desc}</p>
        </div>
        <span className="text-xs text-white/50">{item.time}</span>
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
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: idx * 0.1, type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          className={cn(
            "w-14 h-14 rounded-xl flex items-center justify-center text-2xl cursor-pointer",
            "bg-gradient-to-br shadow-lg",
            int.color,
            "hover:shadow-xl transition-shadow"
          )}
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
              "border-white/20 bg-gradient-to-br from-cyan-500/20 to-purple-500/20",
              "hover:from-cyan-500/30 hover:to-purple-500/30",
              "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none"
            )}
          >
            <div className="flex flex-col">
              <figcaption className="text-sm font-medium text-white">
                {f.name}
              </figcaption>
            </div>
            <blockquote className="mt-2 text-xs text-white/70">{f.body}</blockquote>
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
    Icon: CalendarIcon,
    name: "Calendar",
    description: "Use the calendar to filter your files by date.",
    className: "col-span-1 md:col-span-3 lg:col-span-1",
    href: "#contact",
    cta: "Learn more",
    background: (
      <Calendar
        mode="single"
        selected={new Date(2022, 4, 11, 0, 0, 0)}
        className="absolute top-10 right-0 origin-top scale-75 rounded-md border border-white/20 bg-white/5 [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-90 [&_.rdp-day]:text-white [&_.rdp-day_button:hover]:bg-white/20 [&_.rdp-head_cell]:text-white/60 [&_.rdp-caption]:text-white [&_.rdp-nav_button]:text-white [&_.rdp-day_selected]:bg-cyan-500"
      />
    ),
  },
];

export default function BentoSection() {
  return (
    <section id="capabilities" className="relative py-16 md:py-32 px-4 md:px-6 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-heading text-xs tracking-[0.3em] text-gray-400 mb-4 block"
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
