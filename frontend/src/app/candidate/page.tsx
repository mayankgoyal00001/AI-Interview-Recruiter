"use client";

import { useEffect, useMemo, useState } from "react";

type Job = {
  id: string;
  title: string;
  duration: string;
  company: string;
  location: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  skills: string[];
};

const CATALOG: Job[] = [
  {
    id: "fe",
    title: "Frontend Engineer",
    duration: "30 min",
    company: "NovaSoft",
    location: "Remote / India",
    description:
      "Build delightful user experiences with React and modern tooling while collaborating with designers and backend engineers.",
    responsibilities: [
      "Own features end‑to‑end from UX to pixel‑perfect UI",
      "Optimize performance and accessibility",
      "Write clean, testable code with component libraries",
    ],
    requirements: [
      "2+ years with React/Next.js",
      "Strong TypeScript and CSS fundamentals",
      "Experience with testing (Jest/RTL)",
    ],
    skills: ["React", "Next.js", "TypeScript", "Tailwind", "Accessibility"],
  },
  {
    id: "be",
    title: "Backend Engineer",
    duration: "45 min",
    company: "CloudForge",
    location: "Hybrid / Bengaluru",
    description:
      "Design scalable APIs and services with Node.js and PostgreSQL. Emphasis on reliability, observability, and security.",
    responsibilities: [
      "Design and implement REST/GraphQL APIs",
      "Write efficient database queries and migrations",
      "Instrument services with logging and metrics",
    ],
    requirements: [
      "3+ years with Node.js/Express/Next APIs",
      "SQL expertise; PostgreSQL preferred",
      "Understanding of queues and caching",
    ],
    skills: ["Node.js", "PostgreSQL", "Redis", "GraphQL", "Docker"],
  },
  {
    id: "de",
    title: "Data Engineer",
    duration: "40 min",
    company: "DataWorks",
    location: "Remote",
    description:
      "Build robust data pipelines and maintain warehouse models supporting analytics and ML teams.",
    responsibilities: [
      "Develop batch/stream pipelines",
      "Model clean, reliable datasets",
      "Ensure data quality with tests and monitoring",
    ],
    requirements: [
      "Proficiency in SQL and Python",
      "Experience with DBT/Airflow",
      "Cloud data stack (GCP/AWS/Azure)",
    ],
    skills: ["SQL", "Python", "DBT", "Airflow", "Spark"],
  },
];

export default function CandidateDashboard() {
  const [applied, setApplied] = useState<string[]>([]);
  const [active, setActive] = useState<"available" | "applied" | "results">("available");
  const [selected, setSelected] = useState<Job | null>(CATALOG[0]);

  useEffect(() => {
    const raw = localStorage.getItem("aiRec.applied");
    if (raw) setApplied(JSON.parse(raw));
  }, []);

  function apply(jobId: string) {
    if (applied.includes(jobId)) return;
    const next = [...applied, jobId];
    setApplied(next);
    localStorage.setItem("aiRec.applied", JSON.stringify(next));
  }

  const available = useMemo(() => CATALOG.filter((j) => !applied.includes(j.id)), [applied]);
  const appliedJobs = useMemo(() => CATALOG.filter((j) => applied.includes(j.id)), [applied]);

  return (
    <div className="grid gap-6 min-h-[70vh]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Candidate Dashboard</h2>
          <p className="text-sm text-gray-400">Browse available interviews, view applied, and start your interview.</p>
        </div>
        <div className="flex items-center gap-3">
          <a href="/candidate/create-resume" className="inline-flex items-center rounded-md bg-gradient-to-r from-emerald-600 to-cyan-600 px-4 py-2 text-sm font-medium text-white shadow hover:opacity-90">Create Resume</a>
          <a
            href={appliedJobs.length > 0 ? "/interview" : "#"}
            aria-disabled={appliedJobs.length === 0}
            className={`inline-flex items-center rounded-md px-4 py-2 text-sm font-medium shadow ${appliedJobs.length>0?"bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white hover:opacity-90":"bg-white/10 text-gray-400 cursor-not-allowed"}`}
          >
            Start Interview
          </a>
        </div>
      </div>

      <div className="flex items-center gap-2 border-b border-white/10">
        {(["available","applied","results"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`rounded-t-md px-4 py-2 text-sm ${active===tab?"bg-white/10 text-white border-x border-t border-white/10":"text-gray-300 hover:text-white"}`}
          >
            {tab.charAt(0).toUpperCase()+tab.slice(1)}
          </button>
        ))}
      </div>

      {active === "available" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 lg:p-6 backdrop-blur">
            <ul className="space-y-2 text-sm text-gray-300">
              {available.length === 0 && <li className="text-gray-400">No openings. Check back later.</li>}
              {available.map((j) => (
                <li key={j.id} className={`cursor-pointer rounded-lg border border-white/10 p-3 ${selected?.id===j.id?"bg-indigo-500/10":"bg-gray-950/60 hover:bg-white/10"}`} onClick={() => setSelected(j)}>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{j.title}</span>
                    <span className="text-xs text-gray-400">{j.duration}</span>
                  </div>
                  <p className="text-xs text-gray-400">{j.company} • {j.location}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            {selected ? (
              <div className="grid gap-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-semibold">{selected.title}</h3>
                    <p className="text-sm text-gray-400">{selected.company} • {selected.location} • {selected.duration}</p>
                  </div>
                  <button onClick={() => apply(selected.id)} className="inline-flex items-center rounded-md bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-4 py-2 text-sm font-medium text-white shadow hover:opacity-90">Apply</button>
                </div>
                <p className="text-sm text-gray-300">{selected.description}</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selected.skills.map((s) => (
                    <span key={s} className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-gray-200">{s}</span>
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="font-medium">Responsibilities</p>
                    <ul className="mt-1 list-disc pl-5 text-sm text-gray-300">
                      {selected.responsibilities.map((r, i) => (<li key={i}>{r}</li>))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium">Requirements</p>
                    <ul className="mt-1 list-disc pl-5 text-sm text-gray-300">
                      {selected.requirements.map((r, i) => (<li key={i}>{r}</li>))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-400">Select a role on the left to view details.</p>
            )}
          </div>
        </div>
      )}

      {active === "applied" && (
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <ul className="space-y-3 text-sm text-gray-300">
            {appliedJobs.length === 0 && <li className="text-gray-400">You haven’t applied to any roles yet.</li>}
            {appliedJobs.map((j) => (
              <li key={j.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-gray-950/60 p-3 backdrop-blur">
                <div>
                  <div className="font-medium">{j.title}</div>
                  <div className="text-xs text-gray-400">{j.duration}</div>
                </div>
                <a href="/interview" className="inline-flex items-center rounded-md bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-3 py-1.5 text-xs font-medium text-white shadow hover:opacity-90">Start Interview</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {active === "results" && (
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="rounded-lg border border-white/10 bg-gray-950/60 p-3 backdrop-blur">
              <div className="flex items-center justify-between">
                <span className="font-medium">Data Engineer</span>
                <span className="text-green-400">Score: 82</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Strong SQL and pipeline design fundamentals.</p>
            </li>
          </ul>
        </div>
      )}

      {/* CANDIDATE WORKFLOW */}
      <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <h2 className="text-xl font-semibold">Your Interview Process</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { step: 1, title: "Browse & Apply", copy: "Explore available roles and submit your application." },
            { step: 2, title: "Get Invited", copy: "Receive interview link and join instructions." },
            { step: 3, title: "Take Interview", copy: "Answer questions naturally using your voice." },
            { step: 4, title: "View Results", copy: "Check your scores and feedback from the interview." },
          ].map((s) => (
            <div key={s.step} className="rounded-lg border border-white/10 bg-gray-950/60 p-4">
              <div className="text-xs text-gray-400">Step {s.step}</div>
              <div className="font-medium">{s.title}</div>
              <div className="mt-1 text-sm text-gray-300">{s.copy}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}


