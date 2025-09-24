export default function AboutPage() {
  return (
    <div className="grid gap-12">
      {/* HERO with high-quality background */}
      <section className="relative overflow-hidden rounded-2xl border border-white/10">
        <img
          src="https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=1600&auto=format&fit=crop"
          alt="Team interviewing with modern tools"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
        <div className="relative mx-auto max-w-5xl px-6 py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">Meet your Voice AI Recruiter</h1>
          <p className="mt-4 text-gray-200">Conduct natural voice interviews, generate dynamic questions, and get structured, fair scoring—automatically.</p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <a href="/login" className="inline-flex items-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-100">Get started</a>
          </div>
        </div>
      </section>

      {/* VALUE PROPS split with imagery */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <div className="relative overflow-hidden rounded-2xl border border-white/10">
          <img
            src="https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?q=80&w=1400&auto=format&fit=crop"
            alt="Waveform and voice interface"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-black/40" />
          <div className="relative p-6 lg:p-8 h-full flex flex-col justify-end">
            <h2 className="text-xl font-semibold">Real-time, human-like conversations</h2>
            <p className="mt-2 text-sm text-gray-300">WebRTC + TTS/STT deliver low-latency voice so interviews feel natural and uninterrupted.</p>
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 lg:p-8 backdrop-blur">
          <h2 className="text-xl font-semibold">Why teams choose us</h2>
          <ul className="mt-3 list-disc pl-5 text-sm text-gray-300 space-y-2">
            <li>Adaptive question flow personalized to each candidate</li>
            <li>Rubric-based scoring for fair, reproducible evaluation</li>
            <li>Instant transcripts, insights, and shareable feedback</li>
            <li>One-click scheduling and zero-install candidate experience</li>
          </ul>
        </div>
      </section>

      {/* DIFFERENTIATORS grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur text-center group">
          <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop" alt="Automation" className="mx-auto h-32 w-32 rounded-lg object-cover transition-transform group-hover:scale-110" />
          <h3 className="mt-3 font-semibold">Automated & Scalable</h3>
          <p className="mt-1 text-sm text-gray-400">Run thousands of consistent interviews with zero coordination overhead.</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur text-center group">
          <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop" alt="Insights" className="mx-auto h-32 w-32 rounded-lg object-cover transition-transform group-hover:scale-110" />
          <h3 className="mt-3 font-semibold">Actionable Insights</h3>
          <p className="mt-1 text-sm text-gray-400">Measure signal with clear rubrics, sub-scores, and transcripts.</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur text-center group">
          <img src="https://images.unsplash.com/photo-1529101091764-c3526daf38fe?q=80&w=600&auto=format&fit=crop" alt="Candidate experience" className="mx-auto h-32 w-32 rounded-lg object-cover transition-transform group-hover:scale-110" />
          <h3 className="mt-3 font-semibold">Delightful Experience</h3>
          <p className="mt-1 text-sm text-gray-400">Frictionless, voice-first interactions that candidates actually enjoy.</p>
        </div>
      </section>

    </div>
  );
}


