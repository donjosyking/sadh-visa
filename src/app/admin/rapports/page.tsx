import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { prisma } from "@/lib/prisma";

const etatLabel: Record<string, string> = {
  BON: "Bon",
  MOYEN: "Moyen",
  PREOCCUPANT: "Préoccupant",
};

export default async function RapportsPage({
  searchParams,
}: {
  searchParams: Promise<{ agentId?: string; patientId?: string; date?: string }>;
}) {
  const { agentId, patientId, date } = await searchParams;

  const [rapports, agents, patients] = await Promise.all([
    prisma.rapportJournalier.findMany({
      where: {
        ...(agentId ? { agentId } : {}),
        ...(patientId ? { patientId } : {}),
        ...(date
          ? {
              date: {
                gte: new Date(`${date}T00:00:00`),
                lt: new Date(`${date}T23:59:59`),
              },
            }
          : {}),
      },
      orderBy: { date: "desc" },
      include: {
        patient: { select: { nomPrenoms: true } },
        agent: { select: { nom: true } },
      },
    }),
    prisma.personnel.findMany({
      select: { id: true, nom: true },
      orderBy: { nom: "asc" },
    }),
    prisma.patient.findMany({
      select: { id: true, nomPrenoms: true },
      orderBy: { nomPrenoms: "asc" },
    }),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-green-900">
        Rapports journaliers
      </h1>

      <form
        method="get"
        className="mt-6 flex flex-wrap items-end gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5"
      >
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-brand-green-900">
            Agent
          </span>
          <select
            name="agentId"
            defaultValue={agentId ?? ""}
            className="rounded-lg border border-black/10 px-3 py-2 text-sm"
          >
            <option value="">Tous</option>
            {agents.map((a) => (
              <option key={a.id} value={a.id}>
                {a.nom}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-medium text-brand-green-900">
            Patient
          </span>
          <select
            name="patientId"
            defaultValue={patientId ?? ""}
            className="rounded-lg border border-black/10 px-3 py-2 text-sm"
          >
            <option value="">Tous</option>
            {patients.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nomPrenoms}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-medium text-brand-green-900">
            Date
          </span>
          <input
            type="date"
            name="date"
            defaultValue={date ?? ""}
            className="rounded-lg border border-black/10 px-3 py-2 text-sm"
          />
        </label>

        <button
          type="submit"
          className="rounded-full bg-brand-green-700 px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-green-800"
        >
          Filtrer
        </button>
        {(agentId || patientId || date) && (
          <Link
            href="/admin/rapports"
            className="text-sm font-medium text-brand-red-600 hover:underline"
          >
            Réinitialiser
          </Link>
        )}
      </form>

      <p className="mt-4 text-sm text-foreground/70">
        {rapports.length} rapport{rapports.length > 1 ? "s" : ""}
      </p>

      <div className="mt-4 space-y-3">
        {rapports.map((r) => (
          <div
            key={r.id}
            className={`rounded-xl bg-white p-5 shadow-sm ring-1 ring-black/5 ${
              r.alerteIncident ? "border-l-4 border-brand-red-600" : ""
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-semibold text-brand-green-900">
                  {r.patient.nomPrenoms}
                </p>
                <p className="text-sm text-foreground/60">
                  Agent : {r.agent.nom} ·{" "}
                  {new Date(r.date).toLocaleDateString("fr-FR")} ·{" "}
                  {r.heureDebut} – {r.heureFin}
                </p>
              </div>
              {r.alerteIncident && (
                <span className="flex items-center gap-1 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-brand-red-700">
                  <AlertTriangle size={14} />
                  Incident
                </span>
              )}
            </div>

            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-foreground/80">
              <span>État physique : {etatLabel[r.etatPhysique]}</span>
              <span>État moral : {etatLabel[r.etatMoral]}</span>
            </div>

            {r.descriptionIncident && (
              <p className="mt-2 rounded-lg bg-red-50 p-3 text-sm text-brand-red-700">
                {r.descriptionIncident}
              </p>
            )}
            {r.observations && (
              <p className="mt-2 text-sm text-foreground/70">
                {r.observations}
              </p>
            )}
          </div>
        ))}

        {rapports.length === 0 && (
          <p className="rounded-xl bg-white p-8 text-center text-sm text-foreground/60 shadow-sm ring-1 ring-black/5">
            Aucun rapport pour ces critères.
          </p>
        )}
      </div>
    </div>
  );
}
