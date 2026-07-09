import Link from "next/link";
import { Users, FileText, AlertTriangle, UserCog } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function AdminPage() {
  const [patients, rapports, personnelActif, incidents] = await Promise.all([
    prisma.patient.count(),
    prisma.rapportJournalier.count(),
    prisma.personnel.count({ where: { actif: true } }),
    prisma.rapportJournalier.findMany({
      where: { alerteIncident: true },
      orderBy: { date: "desc" },
      take: 5,
      include: {
        patient: { select: { nomPrenoms: true } },
        agent: { select: { nom: true } },
      },
    }),
  ]);

  const stats = [
    { label: "Demandes reçues", value: patients, icon: Users, href: "/admin/demandes" },
    { label: "Rapports journaliers", value: rapports, icon: FileText, href: "/admin/rapports" },
    { label: "Personnel actif", value: personnelActif, icon: UserCog, href: "/admin/personnel" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-green-900">
        Vue d&apos;ensemble
      </h1>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map(({ label, value, icon: Icon, href }) => (
          <Link
            key={label}
            href={href}
            className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition hover:shadow-md"
          >
            <Icon size={22} className="text-brand-green-700" />
            <p className="mt-3 text-3xl font-bold text-brand-green-900">
              {value}
            </p>
            <p className="text-sm text-foreground/70">{label}</p>
          </Link>
        ))}
      </div>

      <h2 className="mt-10 flex items-center gap-2 text-lg font-bold text-brand-red-600">
        <AlertTriangle size={20} />
        Incidents récents
      </h2>

      {incidents.length === 0 ? (
        <p className="mt-4 text-sm text-foreground/70">
          Aucun incident signalé.
        </p>
      ) : (
        <ul className="mt-4 space-y-3">
          {incidents.map((r) => (
            <li
              key={r.id}
              className="rounded-xl border-l-4 border-brand-red-600 bg-white p-4 shadow-sm"
            >
              <p className="font-medium text-brand-green-900">
                {r.patient.nomPrenoms}{" "}
                <span className="font-normal text-foreground/60">
                  — rapport de {r.agent.nom} le{" "}
                  {new Date(r.date).toLocaleDateString("fr-FR")}
                </span>
              </p>
              {r.descriptionIncident && (
                <p className="mt-1 text-sm text-foreground/80">
                  {r.descriptionIncident}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
