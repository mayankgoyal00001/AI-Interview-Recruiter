"use client";

import { useEffect, useRef, useState } from "react";

export default function InterviewPage() {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<string>("");
  const [chunks, setChunks] = useState<BlobPart[]>([]);
  const [seconds, setSeconds] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [notes, setNotes] = useState("");
  const [question, setQuestion] = useState("Tell me about a challenging bug you fixed recently and how you approached solving it.");

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  async function startRecording() {
    setPermissionError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      const localChunks: BlobPart[] = [];
      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          localChunks.push(e.data);
        }
      };
      recorder.onstop = () => {
        setChunks(localChunks);
      };

      recorder.start();
      setIsRecording(true);
      setSeconds(0);
      const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
      recorder.onstop = () => {
        setChunks(localChunks);
        clearInterval(interval);
      };
    } catch (err: any) {
      setPermissionError(err?.message ?? "Microphone permission denied");
    }
  }

  function stopRecording() {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((t) => t.stop());
    }
    setIsRecording(false);
  }

  function playLastRecording() {
    if (!chunks.length) return;
    const blob = new Blob(chunks, { type: "audio/webm" });
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audio.play();
  }

  function toggleMute() {
    if (!mediaRecorderRef.current) return;
    mediaRecorderRef.current.stream.getAudioTracks().forEach((t) => (t.enabled = !t.enabled));
    setIsMuted((m) => !m);
  }

  function togglePause() {
    const r = mediaRecorderRef.current;
    if (!r) return;
    if (r.state === "recording") {
      r.pause();
      setIsPaused(true);
    } else if (r.state === "paused") {
      r.resume();
      setIsPaused(false);
    }
  }

  return (
    <div className="grid gap-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Interview</h2>
        <p className="text-sm text-gray-400">Use your mic to answer questions. This is a placeholder UI.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur lg:col-span-1">
          <h3 className="font-semibold">Controls</h3>
          <div className="mt-4 grid grid-cols-2 gap-3 items-center">
            {!isRecording ? (
              <button onClick={startRecording} className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500">Start</button>
            ) : (
              <button onClick={stopRecording} className="inline-flex items-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500">Stop</button>
            )}
            <button onClick={togglePause} disabled={!isRecording} className="inline-flex items-center rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-100 hover:bg-white/10 disabled:opacity-50">{isPaused ? "Resume" : "Pause"}</button>
            <button onClick={toggleMute} disabled={!isRecording} className="inline-flex items-center rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-100 hover:bg-white/10 disabled:opacity-50">{isMuted ? "Unmute" : "Mute"}</button>
            <button onClick={playLastRecording} disabled={!chunks.length} className="col-span-2 inline-flex items-center justify-center rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-100 hover:bg-white/10 disabled:opacity-50">Play last</button>
            <div className="col-span-2 text-right text-xs text-gray-400">Timer: {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, "0")}</div>
          </div>
          {permissionError && <p className="mt-3 text-sm text-red-400">{permissionError}</p>}
          <p className="mt-3 text-xs text-gray-400">WebRTC/Vapi integration will connect here later.</p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur lg:col-span-2">
          <h3 className="font-semibold">Question</h3>
          <p className="mt-2 text-sm text-gray-300">{question}</p>
          <h3 className="mt-6 font-semibold">Transcript</h3>
          <textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Live transcript will appear here..."
            className="mt-3 h-56 w-full rounded-md border border-gray-800 bg-gray-950 p-3 text-sm text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="mt-4 h-16 w-full rounded-md border border-white/10 bg-gray-950/60 p-3">
            <div className={`h-full w-full rounded bg-gradient-to-r from-indigo-500/30 via-fuchsia-500/30 to-cyan-500/30 animate-pulse ${isRecording ? "opacity-100" : "opacity-40"}`} />
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur lg:col-span-1">
          <h3 className="font-semibold">Notes</h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Jot down key points, hints, or reminders..."
            className="mt-3 h-40 w-full rounded-md border border-white/10 bg-gray-950/60 p-3 text-sm text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="mt-4 text-xs text-gray-400">Status: {isRecording ? (isPaused ? "Paused" : "Recording") : "Idle"}</div>
        </div>
      </div>
    </div>
  );
}


