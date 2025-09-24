"use client";

import { useState } from "react";

export default function CreateInterviewPage() {
  const [title, setTitle] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [duration, setDuration] = useState("30");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [rubric, setRubric] = useState("");
  const [jdFile, setJdFile] = useState<File | null>(null);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert("Interview & Job Posting saved (placeholder). Later, this will store to Supabase.");
  }

  return (
    <div className="grid gap-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Create Interview & Job Posting</h2>
        <p className="text-sm text-gray-400">Define role details, upload job description, and provide interview rubric.</p>
      </div>
      <form className="grid gap-4 rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur" onSubmit={onSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-300">Posting title</label>
            <input value={title} onChange={(e)=>setTitle(e.target.value)} required className="mt-1 w-full rounded-md border border-white/10 bg-gray-950/60 px-3 py-2 text-gray-100" placeholder="Senior Frontend Engineer" />
          </div>
          <div>
            <label className="block text-sm text-gray-300">Role</label>
            <input value={role} onChange={(e)=>setRole(e.target.value)} required className="mt-1 w-full rounded-md border border-white/10 bg-gray-950/60 px-3 py-2 text-gray-100" placeholder="Frontend Engineer" />
          </div>
          <div>
            <label className="block text-sm text-gray-300">Location</label>
            <input value={location} onChange={(e)=>setLocation(e.target.value)} className="mt-1 w-full rounded-md border border-white/10 bg-gray-950/60 px-3 py-2 text-gray-100" placeholder="Remote / Bengaluru" />
          </div>
          <div>
            <label className="block text-sm text-gray-300">Interview duration (minutes)</label>
            <input value={duration} onChange={(e)=>setDuration(e.target.value)} className="mt-1 w-full rounded-md border border-white/10 bg-gray-950/60 px-3 py-2 text-gray-100" />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-300">Job description (paste)</label>
          <textarea value={description} onChange={(e)=>setDescription(e.target.value)} rows={5} className="mt-1 w-full rounded-md border border-white/10 bg-gray-950/60 p-3 text-gray-100" placeholder="Describe the role, team, and impact." />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-300">Key requirements (one per line)</label>
            <textarea value={requirements} onChange={(e)=>setRequirements(e.target.value)} rows={4} className="mt-1 w-full rounded-md border border-white/10 bg-gray-950/60 p-3 text-gray-100" placeholder="React
TypeScript
Testing" />
          </div>
          <div>
            <label className="block text-sm text-gray-300">Responsibilities (one per line)</label>
            <textarea value={responsibilities} onChange={(e)=>setResponsibilities(e.target.value)} rows={4} className="mt-1 w-full rounded-md border border-white/10 bg-gray-950/60 p-3 text-gray-100" placeholder="Build UI features
Collaborate with design
Ensure performance" />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-300">Interview rubric / prompts</label>
          <textarea value={rubric} onChange={(e)=>setRubric(e.target.value)} rows={5} className="mt-1 w-full rounded-md border border-white/10 bg-gray-950/60 p-3 text-gray-100" placeholder="System prompt, rubric criteria, scoring guidance" />
        </div>

        <div>
          <label className="block text-sm text-gray-300">Upload JD file (PDF/DOC)</label>
          <input type="file" accept=".pdf,.doc,.docx,.txt" onChange={(e)=>setJdFile(e.target.files?.[0] ?? null)} className="mt-1 block w-full text-sm text-gray-300 file:mr-3 file:rounded-md file:border file:border-white/10 file:bg-white/10 file:px-3 file:py-1.5 file:text-gray-100 hover:file:bg-white/20" />
          {jdFile && <p className="mt-1 text-xs text-gray-400">Selected: {jdFile.name}</p>}
        </div>

        <div className="flex items-center justify-end gap-2">
          <button type="reset" className="inline-flex items-center rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-100 hover:bg-white/10">Clear</button>
          <button type="submit" className="inline-flex items-center rounded-md bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-4 py-2 text-sm font-medium text-white shadow hover:opacity-90">Save Posting</button>
        </div>
      </form>
    </div>
  );
}


