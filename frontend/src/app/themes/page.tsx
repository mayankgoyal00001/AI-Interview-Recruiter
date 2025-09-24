export default function ThemesPage() {
  const themes = [
    {
      id: "charcoal",
      name: "Charcoal (Current)",
      wrapper: "bg-gray-950",
      accent: "from-indigo-600 to-fuchsia-600",
      desc: "High contrast, sleek, great for neon accents and glass effects.",
    },
    {
      id: "slate-gradient",
      name: "Slate Gradient",
      wrapper: "bg-gradient-to-b from-slate-950 via-slate-900 to-gray-900",
      accent: "from-cyan-500 to-indigo-600",
      desc: "Subtle depth with a cool slate gradient for a calm, modern feel.",
    },
    {
      id: "indigo-purple",
      name: "Indigo • Purple",
      wrapper: "bg-gradient-to-b from-[#0b0b1a] via-[#0d0b22] to-[#0b0b1a]",
      accent: "from-indigo-500 to-fuchsia-600",
      desc: "Vibrant brand-forward background that pairs with your gradient CTAs.",
    },
    {
      id: "blue-cyan",
      name: "Blue • Cyan",
      wrapper: "bg-gradient-to-b from-[#050814] via-[#081120] to-[#0b1a2b]",
      accent: "from-sky-500 to-cyan-400",
      desc: "Techy and fresh, great for voice/waveform visuals and data UIs.",
    },
    {
      id: "graphite-noise",
      name: "Graphite Noise",
      wrapper: "bg-[#0b0b0e]",
      accent: "from-emerald-500 to-cyan-500",
      desc: "Matte graphite with a soft noise overlay for premium depth.",
    },
  ];

  return (
    <div className="grid gap-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Theme Preview</h2>
        <p className="text-sm text-gray-400">Explore background styles in-app. Tell me your pick and I’ll apply it globally.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {themes.map((t) => (
          <section key={t.id} className={`relative overflow-hidden rounded-2xl border border-white/10 ${t.wrapper}`}>
            {/* optional noise overlay */}
            {t.id === "graphite-noise" && (
              <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{backgroundImage:"radial-gradient(currentColor 1px, transparent 1px)", backgroundSize:"3px 3px", color:"#fff"}} />
            )}

            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`inline-flex h-7 w-7 items-center justify-center rounded bg-gradient-to-br ${t.accent} text-white text-xs font-semibold`}>AI</span>
                  <span className="text-sm font-medium text-white/90">AI Recruiter</span>
                </div>
                <div className="h-6 w-28 rounded bg-white/10" />
              </div>

              <div className="mt-8 text-center">
                <h3 className="text-xl font-semibold text-white">Voice AI Interviews</h3>
                <p className="mt-2 text-sm text-white/80">{t.desc}</p>
                <div className="mt-4 flex items-center justify-center gap-3">
                  <div className={`inline-flex items-center rounded-md bg-gradient-to-r ${t.accent} px-4 py-1.5 text-xs font-medium text-white`}>Primary CTA</div>
                  <div className="inline-flex items-center rounded-md border border-white/15 bg-white/10 px-4 py-1.5 text-xs text-white/90">Secondary</div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}


