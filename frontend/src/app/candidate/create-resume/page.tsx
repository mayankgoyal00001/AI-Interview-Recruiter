"use client";

import { useState } from "react";

export default function CreateResumePage() {
  const [mode, setMode] = useState<"form" | "upload">("form");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    website: "",
    summary: "",
    experience: "",
    education: "",
    skills: "",
    projects: "",
    certifications: "",
  });
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (mode === "form") {
      alert("Resume created successfully! (Form data saved)");
    } else {
      alert("Resume uploaded successfully! (File processed)");
    }
  }

  return (
    <div className="grid gap-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Create Your Resume</h2>
        <p className="text-sm text-gray-400">Build your professional profile or upload an existing resume.</p>
      </div>

      <div className="flex items-center gap-4 border-b border-white/10">
        <button
          onClick={() => setMode("form")}
          className={`rounded-t-md px-4 py-2 text-sm ${mode === "form" ? "bg-white/10 text-white border-x border-t border-white/10" : "text-gray-300 hover:text-white"}`}
        >
          Build Resume
        </button>
        <button
          onClick={() => setMode("upload")}
          className={`rounded-t-md px-4 py-2 text-sm ${mode === "upload" ? "bg-white/10 text-white border-x border-t border-white/10" : "text-gray-300 hover:text-white"}`}
        >
          Upload Resume
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6 rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        {mode === "form" ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-300">Full Name *</label>
                <input
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="mt-1 w-full rounded-md border border-white/10 bg-gray-950/60 px-3 py-2 text-gray-100"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 w-full rounded-md border border-white/10 bg-gray-950/60 px-3 py-2 text-gray-100"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300">Phone</label>
                <input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="mt-1 w-full rounded-md border border-white/10 bg-gray-950/60 px-3 py-2 text-gray-100"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300">Location</label>
                <input
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="mt-1 w-full rounded-md border border-white/10 bg-gray-950/60 px-3 py-2 text-gray-100"
                  placeholder="San Francisco, CA"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300">LinkedIn</label>
                <input
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  className="mt-1 w-full rounded-md border border-white/10 bg-gray-950/60 px-3 py-2 text-gray-100"
                  placeholder="linkedin.com/in/johndoe"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300">GitHub</label>
                <input
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  className="mt-1 w-full rounded-md border border-white/10 bg-gray-950/60 px-3 py-2 text-gray-100"
                  placeholder="github.com/johndoe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-300">Professional Summary</label>
              <textarea
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                rows={4}
                className="mt-1 w-full rounded-md border border-white/10 bg-gray-950/60 p-3 text-gray-100"
                placeholder="Experienced software engineer with 5+ years in full-stack development..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-300">Work Experience</label>
                <textarea
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  rows={6}
                  className="mt-1 w-full rounded-md border border-white/10 bg-gray-950/60 p-3 text-gray-100"
                  placeholder="Senior Software Engineer at Tech Corp (2020-2024)&#10;- Led development of microservices architecture&#10;- Improved system performance by 40%"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300">Education</label>
                <textarea
                  value={formData.education}
                  onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                  rows={6}
                  className="mt-1 w-full rounded-md border border-white/10 bg-gray-950/60 p-3 text-gray-100"
                  placeholder="Bachelor of Science in Computer Science&#10;University of California (2016-2020)&#10;GPA: 3.8/4.0"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-300">Skills</label>
                <textarea
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  rows={3}
                  className="mt-1 w-full rounded-md border border-white/10 bg-gray-950/60 p-3 text-gray-100"
                  placeholder="JavaScript, React, Node.js, Python, AWS, Docker, Kubernetes"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300">Projects</label>
                <textarea
                  value={formData.projects}
                  onChange={(e) => setFormData({ ...formData, projects: e.target.value })}
                  rows={3}
                  className="mt-1 w-full rounded-md border border-white/10 bg-gray-950/60 p-3 text-gray-100"
                  placeholder="E-commerce Platform - Built with React and Node.js&#10;Task Management App - Full-stack application"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-300">Certifications</label>
              <textarea
                value={formData.certifications}
                onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
                rows={2}
                className="mt-1 w-full rounded-md border border-white/10 bg-gray-950/60 p-3 text-gray-100"
                placeholder="AWS Certified Solutions Architect&#10;Google Cloud Professional Developer"
              />
            </div>
          </>
        ) : (
          <div>
            <label className="block text-sm text-gray-300">Upload Resume (PDF, DOC, DOCX)</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setUploadedFile(e.target.files?.[0] ?? null)}
              className="mt-1 block w-full text-sm text-gray-300 file:mr-3 file:rounded-md file:border file:border-white/10 file:bg-white/10 file:px-3 file:py-1.5 file:text-gray-100 hover:file:bg-white/20"
            />
            {uploadedFile && (
              <p className="mt-2 text-sm text-gray-400">Selected: {uploadedFile.name}</p>
            )}
            <p className="mt-2 text-xs text-gray-500">
              We'll extract and organize your information automatically. You can edit it after upload.
            </p>
          </div>
        )}

        <div className="flex items-center justify-end gap-3">
          <button type="button" className="inline-flex items-center rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-100 hover:bg-white/10">
            Cancel
          </button>
          <button type="submit" className="inline-flex items-center rounded-md bg-gradient-to-r from-emerald-600 to-cyan-600 px-4 py-2 text-sm font-medium text-white shadow hover:opacity-90">
            {mode === "form" ? "Create Resume" : "Upload Resume"}
          </button>
        </div>
      </form>
    </div>
  );
}
