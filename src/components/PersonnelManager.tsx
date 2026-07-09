"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserPlus, Loader2 } from "lucide-react";
import { Field, inputClass } from "@/components/form/Field";

type PersonnelItem = {
  id: string;
  nom: string;
  email: string;
  role: string;
  actif: boolean;
};

const roleLabel: Record<string, string> = {
  ADMIN: "Admin",
  DIRECTION: "Direction",
  PERSONNEL: "Personnel",
};

export default function PersonnelManager({
  personnel,
  maxPersonnel,
}: {
  personnel: PersonnelItem[];
  maxPersonnel: number;
}) {
  const router = useRouter();
  const [form, setForm] = useState({
    nom: "",
    email: "",
    motDePasse: "",
    role: "PERSONNEL",
  });
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const [error, setError] = useState("");
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const actifCount = personnel.filter((p) => p.actif).length;

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/personnel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Une erreur est survenue.");
        setStatus("idle");
        return;
      }
      setForm({ nom: "", email: "", motDePasse: "", role: "PERSONNEL" });
      setStatus("idle");
      router.refresh();
    } catch {
      setError("Une erreur est survenue.");
      setStatus("idle");
    }
  }

  async function toggleActif(id: string, actif: boolean) {
    setTogglingId(id);
    await fetch(`/api/personnel/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ actif }),
    });
    setTogglingId(null);
    router.refresh();
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <p className="text-sm text-foreground/70">
          {actifCount} / {maxPersonnel} comptes actifs
        </p>

        <div className="mt-4 overflow-x-auto rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="border-b border-black/5 bg-brand-green-50 text-brand-green-900">
              <tr>
                <th className="px-4 py-3 font-semibold">Nom</th>
                <th className="px-4 py-3 font-semibold">E-mail</th>
                <th className="px-4 py-3 font-semibold">Rôle</th>
                <th className="px-4 py-3 font-semibold">Statut</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {personnel.map((p) => (
                <tr key={p.id} className="border-b border-black/5 last:border-0">
                  <td className="px-4 py-3 font-medium text-brand-green-900">
                    {p.nom}
                  </td>
                  <td className="px-4 py-3">{p.email}</td>
                  <td className="px-4 py-3">{roleLabel[p.role]}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        p.actif
                          ? "bg-brand-green-50 text-brand-green-700"
                          : "bg-black/5 text-foreground/60"
                      }`}
                    >
                      {p.actif ? "Actif" : "Inactif"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      disabled={togglingId === p.id}
                      onClick={() => toggleActif(p.id, !p.actif)}
                      className="text-sm font-medium text-brand-green-700 hover:underline disabled:opacity-50"
                    >
                      {togglingId === p.id
                        ? "..."
                        : p.actif
                        ? "Désactiver"
                        : "Activer"}
                    </button>
                  </td>
                </tr>
              ))}
              {personnel.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-foreground/60">
                    Aucun compte pour le moment.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <form
          onSubmit={handleCreate}
          className="space-y-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5"
        >
          <h2 className="flex items-center gap-2 font-bold text-brand-green-900">
            <UserPlus size={18} />
            Nouveau compte
          </h2>

          <Field label="Nom" required>
            <input
              required
              className={inputClass}
              value={form.nom}
              onChange={(e) => setForm((f) => ({ ...f, nom: e.target.value }))}
            />
          </Field>
          <Field label="E-mail" required>
            <input
              type="email"
              required
              className={inputClass}
              value={form.email}
              onChange={(e) =>
                setForm((f) => ({ ...f, email: e.target.value }))
              }
            />
          </Field>
          <Field label="Mot de passe" required>
            <input
              type="password"
              required
              minLength={6}
              className={inputClass}
              value={form.motDePasse}
              onChange={(e) =>
                setForm((f) => ({ ...f, motDePasse: e.target.value }))
              }
            />
          </Field>
          <Field label="Rôle" required>
            <select
              className={inputClass}
              value={form.role}
              onChange={(e) =>
                setForm((f) => ({ ...f, role: e.target.value }))
              }
            >
              <option value="PERSONNEL">Personnel</option>
              <option value="ADMIN">Admin</option>
              <option value="DIRECTION">Direction</option>
            </select>
          </Field>

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-brand-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-green-800 disabled:opacity-60"
          >
            {status === "loading" && (
              <Loader2 size={16} className="animate-spin" />
            )}
            Créer le compte
          </button>
        </form>
      </div>
    </div>
  );
}
