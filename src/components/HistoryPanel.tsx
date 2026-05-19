import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeartDoodle, ScribbleDoodle, StarDoodle } from "./Doodles";
import type { Prediction } from "./PredictionCard";

export function HistoryPanel({
  history,
  onClear,
}: {
  history: Prediction[];
  onClear: () => void;
}) {
  return (
    <div id="history" className="glass rounded-[2rem] p-6 h-full flex flex-col relative overflow-hidden">
      <div className="absolute -top-14 -right-10 w-40 h-40 rounded-full bg-lilac/20 blur-3xl" />
      <StarDoodle className="absolute top-4 left-4 w-4 h-4 text-peach animate-sparkle" />

      <div className="flex items-center justify-between mb-3 relative">
        <div>
          <div className="font-hand text-lg text-blush leading-none">~ recent gestures</div>
          <ScribbleDoodle className="w-20 h-2 text-lilac/70 mt-1.5" />
        </div>
        {history.length > 0 && (
          <Button
            onClick={onClear}
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-muted-foreground hover:text-coral hover:bg-white/5 rounded-xl"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto -mx-2 px-2 space-y-2 min-h-[200px] max-h-[420px] relative">
        {history.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center py-12">
            <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center mb-3 sticker tilt-left animate-float-soft">
              <HeartDoodle className="w-5 h-5 text-coral" />
            </div>
            <p className="font-hand text-lg text-foreground">nothing here yet</p>
            <p className="text-xs text-muted-foreground/80 mt-1">
              your guesses will live here ♡
            </p>
          </div>
        ) : (
          history.map((h, i) => {
            const pct = Math.round(h.confidence * 100);
            const tilt = i % 2 === 0 ? "tilt-left" : "tilt-right";
            return (
              <div
                key={h.timestamp}
                className={`glass rounded-2xl p-3 flex items-center gap-3 animate-fade-up sticker ${tilt} hover:rotate-0 transition-transform`}
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-warm/40 border border-white/10 flex items-center justify-center text-xs font-mono text-cream">
                  {pct}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-display text-sm capitalize truncate">
                    {h.prediction.replace(/_/g, " ")}
                  </div>
                  <div className="font-hand text-sm text-blush/80">
                    {new Date(h.timestamp).toLocaleTimeString()}
                  </div>
                </div>
                <div className="w-12">
                  <div className="h-1.5 bg-secondary/60 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-warm" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
