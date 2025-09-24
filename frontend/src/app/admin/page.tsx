"use client";

import { useState } from "react";

function openSummaryWindow(name: string, role: string, score: number) {
  const html = `<!doctype html>
  <html><head><meta charset='utf-8'><title>Candidate Summary</title>
  <style>
    body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;padding:24px;color:#111}
    h1{font-size:20px;margin:0 0 12px}
    h2{font-size:14px;margin:16px 0 8px}
    .card{border:1px solid #e5e7eb;border-radius:12px;padding:16px;margin-top:8px}
    .muted{color:#6b7280}
    .score{color:${score>=80?'#16a34a':score>=60?'#84cc16':score>=40?'#f59e0b':'#dc2626'};font-weight:600}
  </style></head>
  <body>
    <h1>Candidate Summary</h1>
    <div class='card'>
      <div><strong>Name:</strong> ${name}</div>
      <div><strong>Role:</strong> ${role}</div>
      <div><strong>Overall Score:</strong> <span class='score'>${score}</span></div>
    </div>
    <h2>Highlights</h2>
    <div class='card muted'>
      <ul>
        <li>Clear communication and structured problem solving</li>
        <li>Solid knowledge of core concepts relevant to the role</li>
        <li>Areas to deepen: edge cases, performance trade‑offs</li>
      </ul>
    </div>
    <h2>Recommendations</h2>
    <div class='card muted'>
      <ul>
        <li>Assign a practical take‑home aligned to the role</li>
        <li>Run a brief systems/architecture discussion</li>
      </ul>
    </div>
    <script>window.onload=()=>{window.print();}</script>
  </body></html>`;
  const w = window.open("", "_blank");
  if (w){ w.document.write(html); w.document.close(); }
}

export default function AdminDashboard() {
  const [tab, setTab] = useState<"templates" | "candidates" | "results">("templates");
  return (
    <div className="grid gap-8">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Admin Dashboard</h2>
          <p className="text-sm text-gray-400">Manage interview templates, candidates, and results.</p>
        </div>
        <div>
          <a href="/admin/create-interview" className="inline-flex items-center rounded-md bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-4 py-2 text-sm font-medium text-white shadow hover:opacity-90">Create Interview & Job Posting</a>
        </div>
      </div>

      <div className="flex items-center gap-2 border-b border-white/10">
        {([
          {id:"templates", label:"Interview Templates"},
          {id:"candidates", label:"Candidates"},
          {id:"results", label:"Recent Results"},
        ] as const).map((t) => (
          <button key={t.id} onClick={()=>setTab(t.id)} className={`rounded-t-md px-4 py-2 text-sm ${tab===t.id?"bg-white/10 text-white border-x border-t border-white/10":"text-gray-300 hover:text-white"}`}>{t.label}</button>
        ))}
      </div>

      {tab === "templates" && (
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <h3 className="font-semibold">Interview Templates</h3>
          <p className="text-xs text-gray-400">Reusable interview flows and prompts for each role.</p>
          <ul className="mt-3 space-y-3 text-sm text-gray-300">
            <li className="flex items-center justify-between rounded-lg border border-white/10 bg-gray-950/60 p-3 backdrop-blur">
              <span>Frontend (React)</span>
              <a href="/admin/job-descriptions" className="inline-flex items-center rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-gray-100 hover:bg-white/10">Edit</a>
            </li>
            <li className="flex items-center justify-between rounded-lg border border-white/10 bg-gray-950/60 p-3 backdrop-blur">
              <span>Backend (Node)</span>
              <a href="/admin/job-descriptions" className="inline-flex items-center rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-gray-100 hover:bg-white/10">Edit</a>
            </li>
          </ul>
        </div>
      )}

      {tab === "candidates" && (
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <h3 className="font-semibold">Candidates</h3>
          <ul className="mt-3 space-y-3 text-sm text-gray-300">
            <li className="flex items-center justify-between rounded-lg border border-white/10 bg-gray-950/60 p-3 backdrop-blur">
              <span>Alex Doe</span>
              <a href="/api/download/resume/alex" className="inline-flex items-center rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-gray-100 hover:bg-white/10">Download Resume</a>
            </li>
            <li className="flex items-center justify-between rounded-lg border border-white/10 bg-gray-950/60 p-3 backdrop-blur">
              <span>Jamie Lee</span>
              <a href="/api/download/resume/jamie" className="inline-flex items-center rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-gray-100 hover:bg-white/10">Download Resume</a>
            </li>
          </ul>
        </div>
      )}

      {tab === "results" && (
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <h3 className="font-semibold">Recent Results</h3>
          <ul className="mt-3 space-y-3 text-sm text-gray-300">
            <li className="flex items-center justify-between rounded-lg border border-white/10 bg-gray-950/60 p-3 backdrop-blur">
              <div>
                <span className="font-medium">Frontend — Alex</span>
                <span className="ml-2 text-green-400">Score: 82</span>
              </div>
              <button onClick={()=>openSummaryWindow('Alex Doe','Frontend',82)} className="inline-flex items-center rounded-md bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-3 py-1.5 text-xs font-medium text-white shadow hover:opacity-90">Download Summary</button>
            </li>
            <li className="flex items-center justify-between rounded-lg border border-white/10 bg-gray-950/60 p-3 backdrop-blur">
              <div>
                <span className="font-medium">Backend — Jamie</span>
                <span className="ml-2 text-yellow-400">Score: 71</span>
              </div>
              <button onClick={()=>openSummaryWindow('Jamie Lee','Backend',74)} className="inline-flex items-center rounded-md bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-3 py-1.5 text-xs font-medium text-white shadow hover:opacity-90">Download Summary</button>
            </li>
          </ul>
        </div>
      )}

      {/* ADMIN WORKFLOW */}
      <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <h2 className="text-xl font-semibold">Admin Workflow</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { step: 1, title: "Create Interview", copy: "Set up templates, rubrics, and job postings." },
            { step: 2, title: "Invite Candidates", copy: "Send interview links to selected candidates." },
            { step: 3, title: "Monitor Progress", copy: "Track interview sessions and candidate responses." },
            { step: 4, title: "Review & Decide", copy: "Analyze results, scores, and make hiring decisions." },
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


