// Hand-drawn doodle accents — sketchy, anime notebook vibe.

const sketchProps = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function StarDoodle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} strokeWidth="1.4" {...sketchProps}>
      <path d="M12 3.5c.4 2.6 1.1 4.7 2.4 5.9 1.3 1.2 3.4 1.7 5.6 2-2.3.5-4.2 1.2-5.4 2.4-1.3 1.3-2 3.4-2.6 5.7-.5-2.3-1.2-4.4-2.5-5.6C8.2 12.7 6.1 12.2 4 11.7c2.2-.4 4.2-1 5.5-2.2 1.2-1.2 2-3.2 2.5-6z" />
    </svg>
  );
}

export function SparkDoodle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} strokeWidth="1.3" {...sketchProps}>
      <path d="M12 2.5v6M12 15.5v6M2.5 12h6M15.5 12h6" />
      <path d="M5.5 5.5l3.5 3.5M15 15l3.5 3.5M18.5 5.5L15 9M9 15l-3.5 3.5" opacity="0.7" />
    </svg>
  );
}

export function HeartDoodle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} strokeWidth="1.4" {...sketchProps}>
      <path d="M12 20s-7-4.4-7-10c0-2.8 2.2-5 5-5 1.4 0 2.6.6 3.4 1.6.8-1 2-1.6 3.4-1.6 2.8 0 5 2.2 5 5 0 5.6-7 10-7 10z" />
    </svg>
  );
}

export function ArrowDoodle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 40" className={className} strokeWidth="1.6" {...sketchProps}>
      <path d="M4 30 C 18 8, 38 6, 60 18" />
      <path d="M52 10 L60 18 L52 24" />
    </svg>
  );
}

export function ScribbleDoodle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 14" className={className} strokeWidth="1.6" {...sketchProps}>
      <path d="M2 8 Q 12 1, 22 8 T 42 8 T 62 8 T 82 8 T 98 8" />
    </svg>
  );
}

export function HandDoodle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} strokeWidth="1.7" {...sketchProps}>
      <path d="M22 38V18a3 3 0 016 0v16" />
      <path d="M28 34V14a3 3 0 016 0v20" />
      <path d="M34 34V16a3 3 0 016 0v22" />
      <path d="M40 38V22a3 3 0 016 0v18c0 8-5 14-13 14h-3c-6 0-10-3-12-8l-6-14a3 3 0 015-3l5 6" />
      <circle cx="50" cy="14" r="1.2" fill="currentColor" />
      <circle cx="14" cy="20" r="1" fill="currentColor" />
    </svg>
  );
}

export function FlowerDoodle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} strokeWidth="1.4" {...sketchProps}>
      <circle cx="20" cy="20" r="3" />
      <ellipse cx="20" cy="9"  rx="4" ry="6" />
      <ellipse cx="20" cy="31" rx="4" ry="6" />
      <ellipse cx="9"  cy="20" rx="6" ry="4" />
      <ellipse cx="31" cy="20" rx="6" ry="4" />
    </svg>
  );
}

export function CloudDoodle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 32" className={className} strokeWidth="1.5" {...sketchProps}>
      <path d="M10 24c-4 0-7-3-7-6s3-6 7-6c1-4 5-7 9-7s8 3 9 7c1-1 3-2 5-2 4 0 7 3 7 7 3 1 5 3 5 6s-3 6-7 6H10z" />
    </svg>
  );
}

export function FloatingDoodles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <StarDoodle    className="absolute top-[10%] left-[6%]  w-6 h-6 text-blush animate-float-slow" />
      <SparkDoodle   className="absolute top-[18%] right-[8%] w-7 h-7 text-peach animate-pulse-glow" />
      <HeartDoodle   className="absolute top-[42%] left-[4%]  w-5 h-5 text-coral/80 animate-float-soft" />
      <FlowerDoodle  className="absolute bottom-[14%] right-[10%] w-14 h-14 text-lilac/60 animate-spin-slow" />
      <StarDoodle    className="absolute bottom-[22%] left-[12%] w-4 h-4 text-lavender animate-pulse-glow" />
      <SparkDoodle   className="absolute top-[60%] right-[16%] w-5 h-5 text-blush/80 animate-float-slow" />
      <CloudDoodle   className="absolute top-[8%]  right-[28%] w-14 h-7 text-cream/40 animate-float-soft" />
      <ScribbleDoodle className="absolute bottom-[8%] left-[36%] w-24 h-3 text-lilac/50" />
    </div>
  );
}
