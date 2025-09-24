"use client";

import { useEffect, useMemo, useState } from "react";

type Job = { id: string; title: string; duration: string };

const CATALOG: Job[] = [
  { id: "fe", title: "Frontend Engineer", duration: "30 min" },
  { id: "be", title: "Backend Engineer", duration: "45 min" },
  { id: "de", title: "Data Engineer", duration: "40 min" },
  { id: "ml", title: "ML Engineer", duration: "40 min" },
];

export default function AvailablePage() {
  const [applied, setApplied] = useState<string[]>([]);
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

  return (
    <div className="grid gap-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Available Interviews</h2>
        <p className="text-sm text-gray-400">Apply to interviews that match your skills.</p>
      </div>
      <ul className="space-y-3 text-sm text-gray-300">
        {available.length === 0 && <li className="text-gray-400">No openings available right now.</li>}
        {available.map((j) => (
          <li key={j.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur">
            <div>
              <p className="font-medium">{j.title}</p>
              <p className="text-xs text-gray-400">Duration: {j.duration}</p>
            </div>
            <button onClick={() => apply(j.id)} className="inline-flex items-center rounded-md bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-3 py-1.5 text-xs font-medium text-white shadow hover:opacity-90">Apply</button>
          </li>
        ))}
      </ul>
    </div>
  );
}


