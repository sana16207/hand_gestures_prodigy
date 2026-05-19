import { HandDoodle, SparkDoodle, StarDoodle } from "./Doodles";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="mx-auto max-w-7xl px-6 py-5">
        <div className="glass rounded-3xl px-5 py-3 flex items-center justify-between relative">
          <StarDoodle className="hidden md:block absolute -top-3 left-32 w-4 h-4 text-peach animate-sparkle" />

          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-warm blur-md opacity-70 rounded-2xl" />
              <div className="relative w-11 h-11 rounded-2xl bg-gradient-primary flex items-center justify-center text-primary-foreground sticker tilt-left">
                <HandDoodle className="w-6 h-6" />
              </div>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-lg font-semibold tracking-tight">
                <span className="text-gradient">gesture</span>
                <span className="text-foreground">.studio</span>
              </span>
              <span className="font-hand text-sm text-blush/90 mt-0.5">
                hand-drawn AI ✿
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
            <a href="#live"    className="hover:text-foreground transition-colors">live</a>
            <a href="#history" className="hover:text-foreground transition-colors">history</a>
            <a href="#about"   className="hover:text-foreground transition-colors">about</a>
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-coral opacity-70" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-coral" />
              </span>
              <span className="font-hand text-sm text-cream">model online</span>
            </div>
            <SparkDoodle className="w-5 h-5 text-lilac animate-pulse-glow" />
          </div>
        </div>
      </div>
    </header>
  );
}
