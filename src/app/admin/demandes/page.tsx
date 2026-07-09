import Link from "next/link";
import { prisma } from "@/lib/prisma";

const optionServiceLabel: Record<string, string> = {
  ALLER_RETOUR: "Aller-retour",
  PLEIN_TEMPS: "Plein temps",
  TEMPS_PARTIEL: "Temps partiel",
};

export default async function DemandesPage() {
  const patients = await prisma.patient.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-green-900">
        Demandes de prise en charge
      </h1>
      <p className="mt-2 text-sm text-foreground/70">
        {patients.length} demande{patients.length > 1 ? "s" : ""} reçue
        {patients.length > 1 ? "s" : ""}
      </p>

      <div className="mt-6 overflow-x-auto rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-black/5 bg-brand-green-50 text-brand-green-900">
            <tr>
              <th className="px-4 py-3 font-semibold">Nom et prénoms</th>
              <th className="px-4 py-3 font-semibold">Téléphone</th>
              <th className="px-4 py-3 font-semibold">Option</th>
              <th className="px-4 py-3 font-semibold">Reçue le</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <tr key={p.id} className="border-b border-black/5 last:border-0">
                <td className="px-4 py-3 font-medium text-brand-green-900">
                  {p.nomPrenoms}
                </td>
                <td className="px-4 py-3">{p.telephone}</td>
                <td className="px-4 py-3">
                  {optionServiceLabel[p.optionService]}
                </td>
                <td className="px-4 py-3 text-foreground/60">
                  {new Date(p.createdAt).toLocaleDateString("fr-FR")}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/demandes/${p.id}`}
                    className="font-medium text-brand-green-700 hover:underline"
                  >
                    Voir
                  </Link>
                </td>
              </tr>
            ))}
            {patients.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-foreground/60">
                  Aucune demande pour le moment.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
