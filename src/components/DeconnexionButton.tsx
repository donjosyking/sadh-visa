"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function DeconnexionButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="inline-flex items-center gap-2 rounded-full border border-brand-green-700 px-4 py-2 text-sm font-semibold text-brand-green-700 transition hover:bg-brand-green-50"
    >
      <LogOut size={16} />
      Se déconnecter
    </button>
  );
}
