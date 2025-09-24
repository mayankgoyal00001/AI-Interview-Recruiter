"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"candidate" | "admin">("candidate");
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "register">("login");
  const [confirm, setConfirm] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const analysis = useMemo(() => {
    const value = password;
    let score = 0;
    const issues: string[] = [];
    const suggestions: string[] = [];

    // Length
    const len = value.length;
    if (len >= 16) score += 35; else if (len >= 12) score += 25; else if (len >= 8) score += 15; else score += 5;
    if (len < 12) suggestions.push("Increase length to 12-16+ characters.");

    // Character types
    const hasLower = /[a-z]/.test(value);
    const hasUpper = /[A-Z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSymbol = /[^A-Za-z0-9]/.test(value);
    const types = [hasLower, hasUpper, hasNumber, hasSymbol].filter(Boolean).length;
    score += types * 10;
    if (types < 3) suggestions.push("Use a mix of upper, lower, numbers, and symbols.");

    // Patterns
    const sequential = /(0123|1234|2345|3456|4567|5678|6789|abcd|bcde|cdef|qwer|asdf)/i.test(value);
    const repeats = /(.)\1{2,}/.test(value);
    if (!sequential) score += 10; else issues.push("Contains common sequences (e.g., 1234, abcd).");
    if (!repeats) score += 5; else issues.push("Contains repeated characters.");
    if (/(password|admin|welcome|qwerty)/i.test(value)) issues.push("Contains dictionary word.");

    // Cap score
    score = Math.max(0, Math.min(100, score));

    const rating = score >= 90 ? "Very Strong" : score >= 75 ? "Strong" : score >= 60 ? "Good" : score >= 40 ? "Fair" : "Very Weak";

    // Crack time estimate (very rough, for UX only)
    const combos = Math.pow(types ? 26 : 10, len) * (hasUpper ? 2 : 1) * (hasNumber ? 10 : 1) * (hasSymbol ? 10 : 1);
    const guessesPerSec = 1e10; // modern GPU cluster
    const seconds = combos / guessesPerSec;
    function humanize(sec: number) {
      if (sec < 60) return `${Math.max(1, Math.floor(sec))} sec`;
      const m = sec/60; if (m < 60) return `${Math.floor(m)} min`;
      const h = m/60; if (h < 24) return `${Math.floor(h)} h`;
      const d = h/24; if (d < 365) return `${Math.floor(d)} days`;
      const y = d/365; return `${(y).toFixed(1)} years`;
    }
    const crack = humanize(seconds);

    if (!hasLower || !hasUpper) suggestions.push("Include both UPPER and lower case letters.");
    if (!hasNumber) suggestions.push("Add at least one number.");
    if (!hasSymbol) suggestions.push("Add a special symbol (!@#$…).");

    return { score, rating, issues, suggestions: Array.from(new Set(suggestions)).slice(0,4), crack };
  }, [password]);

  return (
    <div className="mx-auto max-w-md">
      <h2 className="text-2xl font-semibold tracking-tight">Login</h2>
      <p className="text-sm text-gray-400">Sign in to continue</p>
      <form
        className="mt-6 space-y-4 rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur"
        onSubmit={(e) => {
          e.preventDefault();
          setFormError(null);
          if (mode === "register") {
            if (confirm !== password) {
              setFormError("Passwords do not match.");
              return;
            }
          }
          localStorage.setItem("aiRec.user", JSON.stringify({ email, role }));
          router.push(role === "admin" ? "/admin" : "/candidate");
        }}
      >
        <div>
          <label className="block text-sm text-gray-300">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-md border border-white/10 bg-gray-950/60 px-3 py-2 text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-300">Password</label>
          <div className="relative">
          <input
            type={showPwd ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-md border border-white/10 bg-gray-950/60 px-3 py-2 pr-10 text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="••••••••"
          />
          <button type="button" aria-label="Toggle password visibility" onClick={() => setShowPwd((v) => !v)} className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-200">{showPwd ? "Hide" : "Show"}</button>
          </div>
        </div>
        {mode === "register" && (
          <div>
            <label className="block text-sm text-gray-300">Confirm password</label>
            <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="mt-1 w-full rounded-md border border-white/10 bg-gray-950/60 px-3 py-2 pr-10 text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Re-enter password"
            />
            <button type="button" aria-label="Toggle confirm visibility" onClick={() => setShowConfirm((v) => !v)} className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-200">{showConfirm ? "Hide" : "Show"}</button>
            </div>
            {confirm && confirm !== password && (
              <p className="mt-1 text-xs text-red-400">Passwords do not match.</p>
            )}
          </div>
        )}
        {mode === "register" && password && (
          <div className="rounded-md border border-white/10 bg-gray-950/60 p-3 text-xs text-gray-200">
            <div className="flex items-center justify-between">
              <span>Strength: {analysis.rating}</span>
              <span>{analysis.score}/100</span>
            </div>
            <div className="mt-2 h-2 w-full rounded bg-white/10">
              <div className={`h-2 rounded ${analysis.score>85?"bg-green-500":analysis.score>65?"bg-lime-500":analysis.score>45?"bg-yellow-500":analysis.score>25?"bg-orange-500":"bg-red-500"}`} style={{width:`${analysis.score}%`}} />
            </div>
            <p className="mt-2 text-gray-400">Estimated crack time: {analysis.crack}</p>
            {analysis.issues.length>0 && (
              <div className="mt-2">
                <p className="font-medium">Vulnerabilities</p>
                <ul className="mt-1 list-disc pl-5 text-gray-300">
                  {analysis.issues.map((i,idx)=>(<li key={idx}>{i}</li>))}
                </ul>
              </div>
            )}
            {analysis.suggestions.length>0 && (
              <div className="mt-2">
                <p className="font-medium">Suggestions</p>
                <ul className="mt-1 list-disc pl-5 text-gray-300">
                  {analysis.suggestions.map((s,idx)=>(<li key={idx}>{s}</li>))}
                </ul>
              </div>
            )}
          </div>
        )}
        {formError && <p className="text-xs text-red-400">{formError}</p>}
        {mode === "register" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-300">Full name</label>
              <input className="mt-1 w-full rounded-md border border-white/10 bg-gray-950/60 px-3 py-2 text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Jane Doe" />
            </div>
            <div>
              <label className="block text-sm text-gray-300">Company (optional)</label>
              <input className="mt-1 w-full rounded-md border border-white/10 bg-gray-950/60 px-3 py-2 text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Acme Inc." />
            </div>
          </div>
        )}
        <div>
          <label className="block text-sm text-gray-300">Role</label>
          <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
            <button
              type="button"
              onClick={() => setRole("candidate")}
              className={`rounded-md border px-3 py-2 ${
                role === "candidate"
                  ? "border-indigo-500/50 bg-indigo-500/10 text-white"
                  : "border-white/10 bg-gray-950/60 text-gray-200 hover:bg-white/10"
              }`}
            >
              Candidate
            </button>
            <button
              type="button"
              onClick={() => setRole("admin")}
              className={`rounded-md border px-3 py-2 ${
                role === "admin"
                  ? "border-indigo-500/50 bg-indigo-500/10 text-white"
                  : "border-white/10 bg-gray-950/60 text-gray-200 hover:bg-white/10"
              }`}
            >
              Admin
            </button>
          </div>
          <p className="mt-1 text-xs text-gray-400">Choose your role to continue. You will be redirected to the appropriate dashboard.</p>
        </div>
        <button
          type="submit"
          className="w-full inline-flex items-center justify-center rounded-md bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-indigo-900/30 hover:opacity-90"
        >
          {mode === "register" ? "Create account" : "Login"}
        </button>
        <div className="text-center text-sm text-gray-400">
          {mode === "login" ? (
            <span>
              New here?{" "}
              <button type="button" className="text-indigo-400 hover:text-indigo-300" onClick={() => setMode("register")}>
                Create an account
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{" "}
              <button type="button" className="text-indigo-400 hover:text-indigo-300" onClick={() => setMode("login")}>
                Sign in
              </button>
            </span>
          )}
        </div>
      </form>
    </div>
  );
}


