"use client";

import { useEffect, useState } from "react";

const roles = [
  "Frontend Engineer",
  "Backend Engineer",
  "Full‑Stack Developer",
  "Data Engineer",
  "ML Engineer",
  "DevOps Engineer",
];

export default function Home() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [user, setUser] = useState<{email:string; role:"candidate"|"admin"} | null>(null);

  useEffect(() => {
    const full = roles[roleIdx];
    const step = () => {
      if (!isDeleting) {
        const next = full.slice(0, typed.length + 1);
        setTyped(next);
        if (next === full) {
          setTimeout(() => setIsDeleting(true), 1200);
        }
      } else {
        const next = full.slice(0, typed.length - 1);
        setTyped(next);
        if (next.length === 0) {
          setIsDeleting(false);
          setRoleIdx((i) => (i + 1) % roles.length);
        }
      }
    };
    const delay = isDeleting ? 50 : 90;
    const id = setTimeout(step, delay);
    return () => clearTimeout(id);
  }, [typed, isDeleting, roleIdx]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = localStorage.getItem("aiRec.user");
    setUser(raw ? JSON.parse(raw) : null);
  }, []);

  return (
    <div className="grid gap-16">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/60 to-black/70" />
        <div className="relative mx-auto max-w-5xl px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-gray-200 backdrop-blur">
            <span className="inline-flex h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            Learn interviewing the right way
          </div>
          <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight text-white">Welcome to AI Recruiter</h1>
          <p className="mt-4 text-lg text-gray-200 max-w-3xl mx-auto">Confused about which interview template to start with? We’ve got you covered. Browse templates or jump into a live AI-led interview.</p>
          <p className="mt-2 text-sm text-gray-400">
            Apply for {" "}
            <span className="text-white font-semibold">
              {typed}
              <span className={`inline-block w-[1ch] bg-white/70 ml-0.5 align-baseline ${isDeleting ? "opacity-0" : "opacity-100"}`} style={{height:"1em"}} />
            </span>
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {user ? (
              <a href={user.role === "admin" ? "/admin" : "/candidate"} className="inline-flex items-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-100">Get Started</a>
            ) : (
              <a href="/login" className="inline-flex items-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-100">Login to get started</a>
            )}
            <a href="/about" className="inline-flex items-center rounded-lg border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/20">Learn more</a>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <h3 className="text-lg font-semibold text-white">Real-time Voice</h3>
          <p className="mt-2 text-sm text-gray-300">Connect via WebRTC and talk naturally during interviews.</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <h3 className="text-lg font-semibold text-white">Dynamic Questions</h3>
          <p className="mt-2 text-sm text-gray-300">LLM-generated interview questions tailored to the candidate.</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <h3 className="text-lg font-semibold text-white">Structured Scoring</h3>
          <p className="mt-2 text-sm text-gray-300">Rubric-aligned evaluation with actionable feedback.</p>
        </div>
      </section>
    </div>
  );
}
