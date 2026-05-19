import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { WebcamPanel } from "@/components/WebcamPanel";
import { PredictionCard, type Prediction } from "@/components/PredictionCard";
import { HistoryPanel } from "@/components/HistoryPanel";
import {
  FloatingDoodles,
  HandDoodle,
  SparkDoodle,
  StarDoodle,
  ArrowDoodle,
  ScribbleDoodle,
  FlowerDoodle,
  HeartDoodle,
} from "@/components/Doodles";
import { predict } from "@/lib/predict";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "gesture.studio — hand-drawn AI gesture recognition" },
      {
        name: "description",
        content:
          "A playful, doodle-inspired AI app that reads your hand gestures in real time. Built like a creative ML notebook.",
      },
      { property: "og:title", content: "gesture.studio — hand-drawn AI" },
      { property: "og:description", content: "Real-time gesture recognition with a creative, doodle aesthetic." },
    ],
  }),
  component: Index,
});

function Index() {
  const [isDetecting, setDetecting] = useState(false);
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [history, setHistory] = useState<Prediction[]>([]);
  const [uploadedPreview, setUploadedPreview] = useState<string | null>(null);

  const run = async (file: Blob) => {
    setDetecting(true);
    try {
      const res = await predict(file);
      const entry: Prediction = { ...res, timestamp: Date.now() };
      setPrediction(entry);
      setHistory((h) => [entry, ...h].slice(0, 20));
    } catch (e) {
      console.error(e);
    } finally {
      setDetecting(false);
    }
  };

  const handleUpload = (file: File) => {
    if (uploadedPreview) URL.revokeObjectURL(uploadedPreview);
    setUploadedPreview(URL.createObjectURL(file));
    run(file);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <FloatingDoodles />

      <Navbar />

      <main className="relative mx-auto max-w-7xl px-6 pb-24">
        {/* Hero — asymmetric */}
        <section className="pt-10 pb-14 relative">
          <div className="grid lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-8 lg:col-start-2 relative">
              <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-5 animate-fade-up sticker tilt-left">
                <span className="w-1.5 h-1.5 rounded-full bg-coral animate-pulse-glow" />
                <span className="font-hand text-base text-cream">a little neural model · v1.0</span>
              </div>

              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[1.02] animate-fade-up">
                hands talk.
                <br />
                <span className="text-gradient">i'm learning</span>
                <span className="relative inline-block ml-3">
                  <span>to listen</span>
                  <ScribbleDoodle className="absolute -bottom-3 left-0 w-full h-3 text-coral animate-draw" />
                </span>
                <HeartDoodle className="inline-block ml-3 w-8 h-8 text-coral align-baseline animate-bounce-soft" />
              </h1>

              <p className="mt-6 max-w-xl text-base text-muted-foreground animate-fade-up" style={{ animationDelay: "120ms" }}>
                a tiny gesture recognition studio — point your camera, wave a hand,
                and watch a doodle-loving model take its best guess.
              </p>

              <div className="mt-6 flex items-center gap-3 font-hand text-base text-blush/90 animate-fade-up" style={{ animationDelay: "240ms" }}>
                <ArrowDoodle className="w-14 h-7 text-lilac animate-wiggle" />
                try it below ↓
              </div>

              {/* decorative motifs */}
              <StarDoodle className="hidden md:block absolute -top-2 right-4 w-7 h-7 text-peach animate-sparkle" />
              <SparkDoodle className="hidden md:block absolute top-24 -right-2 w-6 h-6 text-blush animate-pulse-glow" />
            </div>

            <div className="hidden lg:flex lg:col-span-2 flex-col items-center gap-4 pb-6">
              <div className="w-20 h-20 rounded-3xl bg-gradient-primary flex items-center justify-center sticker tilt-right animate-float-slow text-primary-foreground glow">
                <HandDoodle className="w-10 h-10" />
              </div>
              <FlowerDoodle className="w-10 h-10 text-lilac animate-spin-slow" />
              <span className="font-hand text-sm text-blush rotate-[-8deg]">made with ♡</span>
            </div>
          </div>
        </section>

        {/* Workspace */}
        <section id="live" className="grid lg:grid-cols-[1.6fr_1fr] gap-6 animate-fade-up" style={{ animationDelay: "200ms" }}>
          <div className="space-y-6">
            <WebcamPanel
              isDetecting={isDetecting}
              onCapture={run}
              onUpload={handleUpload}
              uploadedPreview={uploadedPreview}
            />
            <PredictionCard prediction={prediction} isDetecting={isDetecting} />
          </div>

          <div className="space-y-6">
            <HistoryPanel history={history} onClear={() => setHistory([])} />
            <InfoCard />
          </div>
        </section>

        <footer id="about" className="mt-20 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <HeartDoodle className="w-4 h-4 text-coral" />
            <span className="font-hand text-base text-cream">drawn & trained with care · 2026</span>
          </div>
          <div className="font-mono">
            POST <span className="text-peach">/predict</span> · multipart/form-data
          </div>
        </footer>
      </main>
    </div>
  );
}

function InfoCard() {
  const steps = [
    "wake the camera up — we'll ask for permission",
    "show a hand pose inside the little brackets",
    "tap detect — the model takes a guess",
    "or upload a photo if you'd rather",
  ];
  return (
    <div className="glass rounded-[2rem] p-6 relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-peach/25 blur-2xl" />
      <FlowerDoodle className="absolute top-3 right-4 w-7 h-7 text-lilac/70 animate-spin-slow" />
      <div className="relative">
        <div className="mb-3">
          <div className="font-hand text-lg text-blush leading-none">~ how it works</div>
          <ScribbleDoodle className="w-16 h-2 text-lilac/70 mt-1.5" />
        </div>
        <ol className="space-y-3 text-sm">
          {steps.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="shrink-0 w-7 h-7 rounded-xl glass flex items-center justify-center font-hand text-base text-peach">
                {i + 1}
              </span>
              <span className="text-muted-foreground leading-relaxed pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
