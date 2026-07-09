import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const labels: Record<string, string> = {
  sexe: "Sexe",
  optionService: "Option du service",
  typeIntervention: "Intervention en lien avec",
};

const enumLabels: Record<string, Record<string, string>> = {
  sexe: { H: "Homme", F: "Femme" },
  optionService: {
    ALLER_RETOUR: "Aller-retour",
    PLEIN_TEMPS: "Plein temps",
    TEMPS_PARTIEL: "Temps partiel",
  },
  typeIntervention: {
    ACCIDENT: "Un accident",
    MALADIE: "Maladie",
    AUTRE: "Autre",
  },
};

function Row({ label, value }: { label: string; value: string | number | null | undefined }) {
  if (value === null || value === undefined || value === "") return null;
  return (
    <div className="flex flex-col gap-1 border-b border-black/5 py-3 sm:flex-row sm:justify-between">
      <span className="text-sm font-medium text-foreground/60">{label}</span>
      <span className="text-sm font-medium text-brand-green-900 sm:text-right">
        {value}
      </span>
    </div>
  );
}

export default async function DemandeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const p = await prisma.patient.findUnique({ where: { id } });
  if (!p) notFound();

  return (
    <div>
      <Link
        href="/admin/demandes"
        className="inline-flex items-center gap-2 text-sm font-medium text-brand-green-700 hover:underline"
      >
        <ArrowLeft size={16} />
        Retour aux demandes
      </Link>

      <h1 className="mt-4 text-2xl font-bold text-brand-green-900">
        {p.nomPrenoms}
      </h1>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
          <h2 className="font-bold text-brand-green-900">
            Fiche de renseignements
          </h2>
          <div className="mt-3">
            <Row label={labels.sexe} value={enumLabels.sexe[p.sexe]} />
            <Row label="Adresse" value={p.adresse} />
            <Row label="Code postal et ville" value={p.codePostalVille} />
            <Row label="Téléphone" value={p.telephone} />
            <Row label="E-mail" value={p.email} />
            <Row
              label="Date de naissance"
              value={new Date(p.dateNaissance).toLocaleDateString("fr-FR")}
            />
            <Row label="Ville de naissance" value={p.villeNaissance} />
            <Row label="Taille" value={p.taille ? `${p.taille} cm` : null} />
            <Row label="Poids" value={p.poids ? `${p.poids} kg` : null} />
            <Row label="Pathologie" value={p.pathologie} />
            <Row label="Traitement en cours" value={p.traitementEnCours} />
            <Row
              label={labels.typeIntervention}
              value={enumLabels.typeIntervention[p.typeIntervention]}
            />
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
          <h2 className="font-bold text-brand-green-900">
            Personne à prévenir
          </h2>
          <div className="mt-3">
            <Row label="Nom et prénoms" value={p.personneAPrevenirNom} />
            <Row label="Lien de parenté" value={p.lienParente} />
            <Row label="Adresse" value={p.personneAPrevenirAdresse} />
          </div>

          <h2 className="mt-6 font-bold text-brand-green-900">
            Option du service
          </h2>
          <div className="mt-3">
            <Row
              label={labels.optionService}
              value={enumLabels.optionService[p.optionService]}
            />
            <Row label="Heure de début" value={p.heureDebut} />
            <Row label="Heure de fin" value={p.heureFin} />
            <Row label="Rotation" value={p.rotation} />
          </div>

          <h2 className="mt-6 font-bold text-brand-green-900">Frais</h2>
          <div className="mt-3">
            <Row label="Frais de dossier" value={p.fraisDossier} />
            <Row
              label="Frais de prestation journalier"
              value={p.fraisPrestationJournalier}
            />
            <Row
              label="Frais de prestation mensuel"
              value={p.fraisPrestationMensuel}
            />
            <Row label="Caution ou avance" value={p.cautionAvance} />
            <Row label="Reste" value={p.reste} />
            <Row label="Responsable" value={p.responsable} />
            <Row
              label="Téléphone responsable"
              value={p.telephoneResponsable}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
