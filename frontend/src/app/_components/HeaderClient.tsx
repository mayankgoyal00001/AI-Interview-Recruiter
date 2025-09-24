"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

type User = { email: string; role: "candidate" | "admin" } | null;

export default function HeaderClient() {
  const [user, setUser] = useState<User>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const raw = localStorage.getItem("aiRec.user");
    if (raw) setUser(JSON.parse(raw));
  }, [pathname]);

  function logout() {
    localStorage.removeItem("aiRec.user");
    setUser(null);
    router.push("/");
  }

  if (!user) {
    return (
      <a href="/login" className="inline-flex items-center rounded-md bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-3 py-1.5 text-sm font-medium text-white shadow hover:opacity-90">Login</a>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="hidden md:inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-200">
        <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-gradient-to-br from-indigo-600 to-fuchsia-600 text-white font-semibold">{user.role === "admin" ? "AD" : "CA"}</span>
        {user.email}
      </span>
      <button onClick={logout} className="inline-flex items-center rounded-md border border-white/15 bg-white/10 px-3 py-1.5 text-xs text-gray-100 hover:bg-white/20">Logout</button>
    </div>
  );
}


