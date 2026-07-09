import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const MAX_PERSONNEL = 15;

export async function POST(request: NextRequest) {
  const session = await auth();
  const role = session?.user?.role;
  if (role !== "ADMIN" && role !== "DIRECTION") {
    return NextResponse.json({ error: "Accès refusé." }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { nom, email, motDePasse, role: nouveauRole } = body;

    if (!nom || !email || !motDePasse) {
      return NextResponse.json(
        { error: "Merci de remplir tous les champs." },
        { status: 400 }
      );
    }

    const actifCount = await prisma.personnel.count({
      where: { actif: true },
    });
    if (actifCount >= MAX_PERSONNEL) {
      return NextResponse.json(
        {
          error: `Le nombre maximum de comptes actifs (${MAX_PERSONNEL}) est atteint.`,
        },
        { status: 400 }
      );
    }

    const existant = await prisma.personnel.findUnique({
      where: { email: email.toLowerCase() },
    });
    if (existant) {
      return NextResponse.json(
        { error: "Un compte existe déjà avec cet e-mail." },
        { status: 400 }
      );
    }

    const hash = await bcrypt.hash(motDePasse, 10);

    const personnel = await prisma.personnel.create({
      data: {
        nom,
        email: email.toLowerCase(),
        motDePasse: hash,
        role: nouveauRole || "PERSONNEL",
      },
    });

    return NextResponse.json(
      { id: personnel.id, email: personnel.email },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur création compte personnel:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue." },
      { status: 500 }
    );
  }
}
