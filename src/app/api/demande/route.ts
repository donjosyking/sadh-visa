import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const toFloat = (v: unknown) => {
  if (v === "" || v === null || v === undefined) return null;
  const n = Number(v);
  return Number.isNaN(n) ? null : n;
};

const toDate = (v: unknown) => (v ? new Date(v as string) : null);
const orNull = (v: unknown): string | null =>
  typeof v === "string" && v !== "" ? v : null;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (
      !body.nomPrenoms ||
      !body.sexe ||
      !body.adresse ||
      !body.codePostalVille ||
      !body.telephone ||
      !body.dateNaissance ||
      !body.villeNaissance ||
      !body.typeIntervention ||
      !body.personneAPrevenirNom ||
      !body.lienParente ||
      !body.personneAPrevenirAdresse ||
      !body.optionService
    ) {
      return NextResponse.json(
        { error: "Merci de remplir tous les champs obligatoires." },
        { status: 400 }
      );
    }

    const patient = await prisma.patient.create({
      data: {
        nomPrenoms: body.nomPrenoms,
        sexe: body.sexe,
        adresse: body.adresse,
        codePostalVille: body.codePostalVille,
        telephone: body.telephone,
        email: orNull(body.email),
        dateNaissance: new Date(body.dateNaissance),
        villeNaissance: body.villeNaissance,
        taille: toFloat(body.taille),
        poids: toFloat(body.poids),
        pathologie: orNull(body.pathologie),
        traitementEnCours: orNull(body.traitementEnCours),
        typeIntervention: body.typeIntervention,
        personneAPrevenirNom: body.personneAPrevenirNom,
        lienParente: body.lienParente,
        personneAPrevenirAdresse: body.personneAPrevenirAdresse,

        optionService: body.optionService,

        heureDebut: orNull(body.heureDebut),
        heureFin: orNull(body.heureFin),
        rotation: orNull(body.rotation),

        fraisDossier: toFloat(body.fraisDossier),
        fraisPrestationJournalier: toFloat(body.fraisPrestationJournalier),
        fraisPrestationMensuel: toFloat(body.fraisPrestationMensuel),
        cautionAvance: toFloat(body.cautionAvance),
        reste: toFloat(body.reste),
        dateSignature: toDate(body.dateSignature),
        responsable: orNull(body.responsable),
        telephoneResponsable: orNull(body.telephoneResponsable),
      },
    });

    return NextResponse.json({ id: patient.id }, { status: 201 });
  } catch (error) {
    console.error("Erreur création demande de prise en charge:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'enregistrement." },
      { status: 500 }
    );
  }
}
