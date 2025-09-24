"use client";

import { useState } from "react";

export default function JobDescriptionsPage() {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Frontend Engineer",
      company: "TechCorp",
      location: "Remote",
      status: "Active",
      description: "Build responsive web applications using React and modern JavaScript frameworks.",
      requirements: ["3+ years React experience", "TypeScript proficiency", "CSS/SCSS expertise"],
      responsibilities: ["Develop user interfaces", "Collaborate with design team", "Optimize performance"],
    },
    {
      id: 2,
      title: "Backend Engineer",
      company: "DataFlow",
      location: "San Francisco, CA",
      status: "Draft",
      description: "Design and implement scalable backend services using Node.js and microservices architecture.",
      requirements: ["5+ years Node.js experience", "Database design", "API development"],
      responsibilities: ["Build APIs", "Database optimization", "System architecture"],
    },
  ]);

  const [editingJob, setEditingJob] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    requirements: "",
    responsibilities: "",
  });

  function startEdit(job: any) {
    setEditingJob(job.id);
    setEditForm({
      title: job.title,
      company: job.company,
      location: job.location,
      description: job.description,
      requirements: job.requirements.join("\n"),
      responsibilities: job.responsibilities.join("\n"),
    });
  }

  function saveEdit() {
    if (editingJob) {
      setJobs(jobs.map(job => 
        job.id === editingJob 
          ? {
              ...job,
              title: editForm.title,
              company: editForm.company,
              location: editForm.location,
              description: editForm.description,
              requirements: editForm.requirements.split("\n").filter(r => r.trim()),
              responsibilities: editForm.responsibilities.split("\n").filter(r => r.trim()),
            }
          : job
      ));
      setEditingJob(null);
    }
  }

  function cancelEdit() {
    setEditingJob(null);
    setEditForm({
      title: "",
      company: "",
      location: "",
      description: "",
      requirements: "",
      responsibilities: "",
    });
  }

  return (
    <div className="grid gap-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Job Descriptions</h2>
        <p className="text-sm text-gray-400">Manage job postings, requirements, and descriptions for interviews.</p>
      </div>

      <div className="grid gap-4">
        {jobs.map((job) => (
          <div key={job.id} className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            {editingJob === job.id ? (
              <div className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-gray-300">Job Title</label>
                    <input
                      value={editForm.title}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      className="mt-1 w-full rounded-md border border-white/10 bg-gray-950/60 px-3 py-2 text-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300">Company</label>
                    <input
                      value={editForm.company}
                      onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
                      className="mt-1 w-full rounded-md border border-white/10 bg-gray-950/60 px-3 py-2 text-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300">Location</label>
                    <input
                      value={editForm.location}
                      onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                      className="mt-1 w-full rounded-md border border-white/10 bg-gray-950/60 px-3 py-2 text-gray-100"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-300">Description</label>
                  <textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    rows={3}
                    className="mt-1 w-full rounded-md border border-white/10 bg-gray-950/60 p-3 text-gray-100"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-300">Requirements (one per line)</label>
                    <textarea
                      value={editForm.requirements}
                      onChange={(e) => setEditForm({ ...editForm, requirements: e.target.value })}
                      rows={4}
                      className="mt-1 w-full rounded-md border border-white/10 bg-gray-950/60 p-3 text-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300">Responsibilities (one per line)</label>
                    <textarea
                      value={editForm.responsibilities}
                      onChange={(e) => setEditForm({ ...editForm, responsibilities: e.target.value })}
                      rows={4}
                      className="mt-1 w-full rounded-md border border-white/10 bg-gray-950/60 p-3 text-gray-100"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-end gap-3">
                  <button onClick={cancelEdit} className="inline-flex items-center rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-100 hover:bg-white/10">
                    Cancel
                  </button>
                  <button onClick={saveEdit} className="inline-flex items-center rounded-md bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-4 py-2 text-sm font-medium text-white shadow hover:opacity-90">
                    Save Changes
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{job.title}</h3>
                    <p className="text-sm text-gray-400">{job.company} • {job.location}</p>
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium mt-2 ${
                      job.status === "Active" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
                    }`}>
                      {job.status}
                    </span>
                  </div>
                  <button
                    onClick={() => startEdit(job)}
                    className="inline-flex items-center rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-gray-100 hover:bg-white/10"
                  >
                    Edit
                  </button>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-300 mb-3">{job.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-sm">Requirements</h4>
                      <ul className="mt-1 text-sm text-gray-300 list-disc pl-5">
                        {job.requirements.map((req, i) => (
                          <li key={i}>{req}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Responsibilities</h4>
                      <ul className="mt-1 text-sm text-gray-300 list-disc pl-5">
                        {job.responsibilities.map((resp, i) => (
                          <li key={i}>{resp}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
