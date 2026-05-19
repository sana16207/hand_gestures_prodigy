// API client for the FastAPI backend (to be connected later).
// Falls back to a simulated prediction so the UI works standalone.

export interface PredictResponse {
  prediction: string;
  confidence: number;
}

const API_URL = import.meta.env.VITE_PREDICT_API_URL || "";

const MOCK_GESTURES = [
  "thumbs_up",
  "peace",
  "fist",
  "open_palm",
  "ok",
  "point",
  "rock",
  "call_me",
];

export async function predict(file: Blob): Promise<PredictResponse> {
  if (API_URL) {
    const fd = new FormData();
    fd.append("file", file, "frame.jpg");
    const res = await fetch(`${API_URL}/predict`, { method: "POST", body: fd });
    if (!res.ok) throw new Error(`Predict failed: ${res.status}`);
    return res.json();
  }

  // Simulated response — replace by setting VITE_PREDICT_API_URL.
  await new Promise((r) => setTimeout(r, 1400));
  const prediction = MOCK_GESTURES[Math.floor(Math.random() * MOCK_GESTURES.length)];
  const confidence = 0.78 + Math.random() * 0.21;
  return { prediction, confidence };
}
