"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Loader2, LogIn } from "lucide-react";
import { inputClass } from "@/components/form/Field";

function ConnexionForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    const res = await signIn("credentials", {
      email,
      motDePasse,
      redirect: false,
    });
    if (res?.error) {
      setStatus("error");
      return;
    }
    router.push(searchParams.get("callbackUrl") || "/personnel");
    router.refresh();
  }

  return (
    <div className="bg-brand-cream py-16 sm:py-24">
      <div className="mx-auto max-w-md px-4 sm:px-6">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-brand-red-600">
            Espace Personnel
          </span>
          <h1 className="mt-3 text-2xl font-bold text-brand-green-900 sm:text-3xl">
            Connexion
          </h1>
          <p className="mt-3 text-sm text-foreground/70">
            Réservé au personnel SADH-VISA. Vos identifiants vous sont fournis
            par l&apos;administration.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-8"
        >
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-brand-green-900">
              E-mail
            </span>
            <input
              type="email"
              required
              className={inputClass}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-brand-green-900">
              Mot de passe
            </span>
            <input
              type="password"
              required
              className={inputClass}
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
            />
          </label>

          {status === "error" && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-brand-red-700">
              E-mail ou mot de passe incorrect.
            </p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-green-700 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-green-800 disabled:opacity-60"
          >
            {status === "loading" ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <LogIn size={18} />
            )}
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}

export default function ConnexionPage() {
  return (
    <Suspense>
      <ConnexionForm />
    </Suspense>
  );
}
