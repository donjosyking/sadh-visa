import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { RapportDocument } from "@/lib/pdf/RapportDocument";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  const role = session?.user?.role;
  if (role !== "ADMIN" && role !== "DIRECTION") {
    return NextResponse.json({ error: "Accès refusé." }, { status: 403 });
  }

  const { id } = await params;
  const rapport = await prisma.rapportJournalier.findUnique({
    where: { id },
    include: {
      patient: { select: { nomPrenoms: true } },
      agent: { select: { nom: true } },
    },
  });

  if (!rapport) {
    return NextResponse.json({ error: "Rapport introuvable." }, { status: 404 });
  }

  const buffer = await renderToBuffer(
    RapportDocument({ rapports: [rapport] })
  );

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="rapport-${rapport.patient.nomPrenoms.replace(/\s+/g, "-")}-${id.slice(0, 8)}.pdf"`,
    },
  });
}
