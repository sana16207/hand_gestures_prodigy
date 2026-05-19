import { useEffect, useRef, useState } from "react";
import { Camera, CameraOff, Upload, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SparkDoodle, StarDoodle, ArrowDoodle } from "./Doodles";

interface WebcamPanelProps {
  isDetecting: boolean;
  onCapture: (blob: Blob) => void;
  onUpload: (file: File) => void;
  uploadedPreview: string | null;
}

export function WebcamPanel({ isDetecting, onCapture, onUpload, uploadedPreview }: WebcamPanelProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [active, setActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const start = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setActive(true);
    } catch (e) {
      console.error(e);
      setError("Camera permission denied or unavailable.");
    }
  };

  const stop = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setActive(false);
  };

  useEffect(() => () => stop(), []);

  const capture = () => {
    if (!videoRef.current || !active) return;
    const v = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = v.videoWidth;
    canvas.height = v.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(v, 0, 0);
    canvas.toBlob((blob) => blob && onCapture(blob), "image/jpeg", 0.9);
  };

  return (
    <div className="glass rounded-[2rem] p-5 relative overflow-hidden">
      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-lilac/25 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-peach/20 blur-3xl" />
      <StarDoodle className="absolute top-3 right-5 w-5 h-5 text-peach animate-sparkle" />

      <div className="relative">
        <div className="flex items-center justify-between mb-4 px-1">
          <div className="flex items-center gap-2">
            <span className="font-hand text-lg text-blush">~ live feed</span>
            <SparkDoodle className="w-4 h-4 text-peach" />
          </div>
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className={`w-1.5 h-1.5 rounded-full ${active ? "bg-coral animate-pulse-glow" : "bg-muted-foreground/50"}`} />
            <span className="text-muted-foreground">{active ? "streaming" : uploadedPreview ? "uploaded" : "idle"}</span>
          </div>
        </div>

        {/* Viewport */}
        <div className="relative aspect-video rounded-3xl overflow-hidden bg-black/70 border border-white/8 dot-pattern">
          <video
            ref={videoRef}
            playsInline
            muted
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${active ? "opacity-100" : "opacity-0"} scale-x-[-1]`}
          />
          {!active && uploadedPreview && (
            <img src={uploadedPreview} alt="uploaded" className="absolute inset-0 w-full h-full object-contain" />
          )}

          {!active && !uploadedPreview && <ViewportEmpty />}

          <CornerBrackets />

          {isDetecting && <ScanOverlay />}

          {error && (
            <div className="absolute bottom-3 left-3 right-3 glass rounded-xl px-3 py-2 text-xs text-destructive">
              {error}
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="mt-5 flex flex-wrap items-center gap-2.5">
          {!active ? (
            <Button
              onClick={start}
              className="bg-gradient-primary hover:opacity-95 text-primary-foreground glow rounded-2xl px-5 h-11 font-medium border-0 sticker tilt-left hover:tilt-right transition-transform"
            >
              <Camera className="w-4 h-4 mr-2" />
              start camera
            </Button>
          ) : (
            <Button onClick={stop} variant="secondary" className="glass rounded-2xl px-5 h-11 hover:bg-secondary/80">
              <CameraOff className="w-4 h-4 mr-2" />
              stop camera
            </Button>
          )}

          <Button
            onClick={capture}
            disabled={!active || isDetecting}
            variant="secondary"
            className="glass rounded-2xl px-5 h-11 hover:bg-secondary/80 disabled:opacity-40"
          >
            <Wand2 className="w-4 h-4 mr-2 text-peach" />
            detect gesture
          </Button>

          <div className="flex-1" />

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) onUpload(f);
              e.target.value = "";
            }}
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            variant="ghost"
            className="rounded-2xl h-11 px-4 text-muted-foreground hover:text-foreground hover:bg-white/5"
          >
            <Upload className="w-4 h-4 mr-2" />
            <span className="font-hand text-base">upload instead</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

function ViewportEmpty() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
      <div className="relative">
        <div className="absolute inset-0 bg-blush/30 blur-2xl rounded-full" />
        <div className="relative w-16 h-16 rounded-3xl glass flex items-center justify-center animate-float-soft sticker tilt-right">
          <Camera className="w-7 h-7 text-blush" />
        </div>
      </div>
      <p className="mt-4 font-display text-lg">camera's napping</p>
      <p className="font-hand text-base text-blush/90 mt-1">tap start to wake it up</p>
      <ArrowDoodle className="hidden sm:block absolute bottom-6 left-10 w-20 h-10 text-lilac/70 animate-wiggle" />
    </div>
  );
}

function CornerBrackets() {
  const base = "absolute w-7 h-7 border-blush/70";
  return (
    <>
      <div className={`${base} top-3 left-3 border-t-2 border-l-2 rounded-tl-xl`} />
      <div className={`${base} top-3 right-3 border-t-2 border-r-2 rounded-tr-xl`} />
      <div className={`${base} bottom-3 left-3 border-b-2 border-l-2 rounded-bl-xl`} />
      <div className={`${base} bottom-3 right-3 border-b-2 border-r-2 rounded-br-xl`} />
    </>
  );
}

function ScanOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-lilac/12 to-transparent" />
      <div className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-peach/45 to-transparent animate-scan-line" />
      <div className="absolute top-3 left-1/2 -translate-x-1/2 glass rounded-full px-3.5 py-1 font-hand text-sm text-peach">
        ✦ peeking at your hand
      </div>
    </div>
  );
}
