import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const MAX_PERSONNEL = 15;

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  const role = session?.user?.role;
  if (role !== "ADMIN" && role !== "DIRECTION") {
    return NextResponse.json({ error: "Accès refusé." }, { status: 403 });
  }

  const { id } = await params;
  const body = await request.json();

  if (body.actif === true) {
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
  }

  const personnel = await prisma.personnel.update({
    where: { id },
    data: { actif: !!body.actif },
  });

  return NextResponse.json({ id: personnel.id, actif: personnel.actif });
}
