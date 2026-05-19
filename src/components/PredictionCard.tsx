import { SparkDoodle, ScribbleDoodle, StarDoodle, HeartDoodle } from "./Doodles";

export interface Prediction {
  prediction: string;
  confidence: number;
  timestamp: number;
}

export function PredictionCard({
  prediction,
  isDetecting,
}: {
  prediction: Prediction | null;
  isDetecting: boolean;
}) {
  const pct = prediction ? Math.round(prediction.confidence * 100) : 0;

  return (
    <div className="glass rounded-3xl p-7 relative overflow-hidden">
      <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-blush/25 blur-3xl" />
      <div className="absolute -bottom-20 -left-16 w-56 h-56 rounded-full bg-peach/20 blur-3xl" />
      <StarDoodle className="absolute top-4 right-6 w-4 h-4 text-peach animate-sparkle" />

      <div className="relative">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <span className="font-hand text-lg text-blush">~ what i see</span>
            <SparkDoodle className="w-4 h-4 text-peach animate-pulse-glow" />
          </div>
          {prediction && (
            <span className="text-[10px] font-mono text-muted-foreground">
              {new Date(prediction.timestamp).toLocaleTimeString()}
            </span>
          )}
        </div>

        {isDetecting ? (
          <DetectingState />
        ) : prediction ? (
          <div className="animate-fade-up">
            <div className="flex items-baseline gap-3 mb-2">
              <h2 className="font-display text-5xl font-semibold text-gradient capitalize">
                {prediction.prediction.replace(/_/g, " ")}
              </h2>
              <HeartDoodle className="w-6 h-6 text-coral animate-bounce-soft" />
            </div>
            <ScribbleDoodle className="w-32 h-2.5 text-lilac/70 mb-6" />

            <ConfidenceBar pct={pct} />

            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              <Stat label="confidence" value={`${pct}%`} />
              <Stat label="class" value={prediction.prediction} />
              <Stat label="status" value="verified" tone="coral" />
            </div>
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}

function ConfidenceBar({ pct }: { pct: number }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-2">
        <span className="font-hand text-base text-lavender">how sure i am</span>
        <span className="font-mono text-foreground">{pct}%</span>
      </div>
      <div className="h-2.5 rounded-full bg-secondary/60 overflow-hidden">
        <div
          className="h-full bg-gradient-warm rounded-full transition-all duration-700 ease-out relative"
          style={{ width: `${pct}%` }}
        >
          <div className="absolute inset-0 bg-white/30 animate-pulse-glow" />
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: "coral" }) {
  return (
    <div className="glass rounded-2xl py-3 px-2">
      <div className="font-hand text-sm text-blush/90">{label}</div>
      <div className={`text-sm font-mono mt-0.5 capitalize ${tone === "coral" ? "text-coral" : "text-foreground"}`}>
        {value.replace(/_/g, " ")}
      </div>
    </div>
  );
}

function DetectingState() {
  return (
    <div className="py-8 flex flex-col items-center justify-center text-center">
      <div className="relative w-20 h-20 mb-4">
        <div className="absolute inset-0 rounded-full bg-gradient-warm blur-xl opacity-60 animate-pulse-glow" />
        <div className="relative w-20 h-20 rounded-full border-2 border-transparent border-t-lilac border-r-peach animate-spin" />
        <SparkDoodle className="absolute -top-2 -right-2 w-6 h-6 text-coral animate-sparkle" />
        <StarDoodle className="absolute -bottom-2 -left-2 w-5 h-5 text-blush animate-sparkle [animation-delay:0.6s]" />
      </div>
      <div className="font-display text-lg tracking-wide">
        <span className="text-gradient">thinking</span>
        <span className="inline-flex ml-1">
          <Dot delay="0s" />
          <Dot delay="0.15s" />
          <Dot delay="0.3s" />
        </span>
      </div>
      <p className="font-hand text-base text-blush/90 mt-1.5">
        squinting at your hand…
      </p>
    </div>
  );
}

function Dot({ delay }: { delay: string }) {
  return (
    <span
      className="w-1.5 h-1.5 mx-0.5 rounded-full bg-lilac animate-pulse-glow"
      style={{ animationDelay: delay }}
    />
  );
}

function EmptyState() {
  return (
    <div className="py-10 flex flex-col items-center justify-center text-center relative">
      <div className="w-16 h-16 rounded-3xl glass flex items-center justify-center mb-4 animate-float-soft sticker tilt-right">
        <HeartDoodle className="w-8 h-8 text-coral" />
      </div>
      <p className="font-display text-lg">waiting for a wave 👋</p>
      <p className="font-hand text-base text-blush/90 mt-1.5 max-w-xs">
        show me a gesture and I'll try my best to guess it
      </p>
    </div>
  );
}
