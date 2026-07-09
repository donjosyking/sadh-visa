import Link from "next/link";
import { FilePlus2, AlertTriangle } from "lucide-react";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import DeconnexionButton from "@/components/DeconnexionButton";

export default async function PersonnelPage() {
  const session = await auth();

  const rapports = session?.user?.id
    ? await prisma.rapportJournalier.findMany({
        where: { agentId: session.user.id },
        orderBy: { date: "desc" },
        take: 10,
        include: { patient: { select: { nomPrenoms: true } } },
      })
    : [];

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-sm font-semibold uppercase tracking-wide text-brand-red-600">
            Espace Personnel
          </span>
          <h1 className="mt-2 text-2xl font-bold text-brand-green-900">
            Bonjour, {session?.user?.name}
          </h1>
        </div>
        <DeconnexionButton />
      </div>

      <Link
        href="/personnel/rapports/nouveau"
        className="mt-8 flex items-center justify-center gap-2 rounded-full bg-brand-red-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-red-700 sm:w-fit"
      >
        <FilePlus2 size={18} />
        Nouveau rapport journalier
      </Link>

      <h2 className="mt-10 text-lg font-bold text-brand-green-900">
        Mes derniers rapports
      </h2>

      {rapports.length === 0 ? (
        <p className="mt-4 text-sm text-foreground/70">
          Vous n&apos;avez pas encore soumis de rapport.
        </p>
      ) : (
        <ul className="mt-4 space-y-3">
          {rapports.map((r) => (
            <li
              key={r.id}
              className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/5"
            >
              <div>
                <p className="font-medium text-brand-green-900">
                  {r.patient.nomPrenoms}
                </p>
                <p className="text-sm text-foreground/60">
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
