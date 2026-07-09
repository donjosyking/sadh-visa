import { prisma } from "@/lib/prisma";
import RapportForm from "@/components/RapportForm";

export const dynamic = "force-dynamic";

export default async function NouveauRapportPage() {
  const patients = await prisma.patient.findMany({
    select: { id: true, nomPrenoms: true },
    orderBy: { nomPrenoms: "asc" },
  });

  return (
    <div className="bg-brand-cream py-14 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-brand-red-600">
            Espace Personnel
          </span>
          <h1 className="mt-3 text-2xl font-bold text-brand-green-900 sm:text-3xl">
            Rapport journalier
          </h1>
          <p className="mt-3 text-sm text-foreground/70">
            Les champs marqués d&apos;un{" "}
            <span className="text-brand-red-600">*</span> sont obligatoires.
          </p>
        </div>

        <RapportForm patients={patients} />
      </div>
    </div>
  );
}
