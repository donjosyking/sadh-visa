import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const orNull = (v: unknown) => (v === "" || v === undefined ? null : v);

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  }

  try {
    const body = await request.json();

    if (
      !body.patientId ||
      !body.heureDebut ||
      !body.heureFin ||
      !body.etatPhysique ||
      !body.etatMoral
    ) {
      return NextResponse.json(
        { error: "Merci de remplir tous les champs obligatoires." },
        { status: 400 }
      );
    }

    if (body.alerteIncident && !body.descriptionIncident) {
      return NextResponse.json(
        { error: "Merci de décrire l'incident signalé." },
        { status: 400 }
      );
    }

    const rapport = await prisma.rapportJournalier.create({
      data: {
        agentId: session.user.id,
        patientId: body.patientId,

        heureDebut: body.heureDebut,
        heureFin: body.heureFin,

        tensionArterielle: orNull(body.tensionArterielle),
        temperature: orNull(body.temperature),
        pouls: orNull(body.pouls),
        glycemie: orNull(body.glycemie),
        autresObservationsMedicales: orNull(body.autresObservationsMedicales),

        aideLeverCoucher: !!body.aideLeverCoucher,
        aideDeplacement: !!body.aideDeplacement,
        aideHygiene: !!body.aideHygiene,
        aideToilette: !!body.aideToilette,
        aideHabillage: !!body.aideHabillage,
        aideMedicaments: !!body.aideMedicaments,
        aideRepas: !!body.aideRepas,
        aideConversation: !!body.aideConversation,
        accompagnementBalade: !!body.accompagnementBalade,
        autreSoin: orNull(body.autreSoin),

        etatPhysique: body.etatPhysique,
        commentaireEtatPhysique: orNull(body.commentaireEtatPhysique),
        etatMoral: body.etatMoral,
        commentaireEtatMoral: orNull(body.commentaireEtatMoral),

        observations: orNull(body.observations),
        alerteIncident: !!body.alerteIncident,
        descriptionIncident: orNull(body.descriptionIncident),
      },
    });

    return NextResponse.json({ id: rapport.id }, { status: 201 });
  } catch (error) {
    console.error("Erreur création rapport journalier:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'enregistrement." },
      { status: 500 }
    );
  }
}
