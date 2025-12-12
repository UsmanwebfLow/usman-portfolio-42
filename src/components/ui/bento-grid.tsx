import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { ReactNode } from "react";

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[18rem] md:auto-rows-[22rem] grid-cols-1 md:grid-cols-3 gap-4",
        className
      )}
    >
      {children}
    </div>
  );
}

interface BentoCardProps {
  name: string;
  className?: string;
  background?: ReactNode;
  Icon: React.ComponentType<{ className?: string }>;
  description: string;
  href: string;
  cta: string;
}

export function BentoCard({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
}: BentoCardProps) {
  return (
    <div
      className={cn(
        "group relative col-span-1 md:col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
        "bg-[#111] border border-white/10",
        "transform-gpu transition-all duration-300 hover:border-white/20 hover:shadow-lg hover:shadow-cyan-500/5",
        className
      )}
    >
      <div>{background}</div>
      <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
        <Icon className="h-12 w-12 origin-left transform-gpu text-cyan-400 transition-all duration-300 ease-in-out group-hover:scale-75" />
        <h3 className="text-xl font-semibold text-white font-heading tracking-wider">
          {name}
        </h3>
        <p className="max-w-lg text-gray-400 text-sm">{description}</p>
      </div>

      <div
        className={cn(
          "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        )}
      >
        <a
          href={href}
          className="pointer-events-auto inline-flex items-center gap-2 text-sm text-cyan-400 font-heading tracking-wider hover:text-cyan-300 transition-colors"
        >
          {cta}
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
      <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-gradient-to-t group-hover:from-cyan-500/5 group-hover:to-transparent" />
    </div>
  );
}
