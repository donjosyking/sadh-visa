import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { RapportDocument } from "@/lib/pdf/RapportDocument";

export async function GET(request: NextRequest) {
  const session = await auth();
  const role = session?.user?.role;
  if (role !== "ADMIN" && role !== "DIRECTION") {
    return NextResponse.json({ error: "Accès refusé." }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const agentId = searchParams.get("agentId") || undefined;
  const patientId = searchParams.get("patientId") || undefined;
  const date = searchParams.get("date") || undefined;

  const rapports = await prisma.rapportJournalier.findMany({
    where: {
      ...(agentId ? { agentId } : {}),
      ...(patientId ? { patientId } : {}),
      ...(date
        ? {
            date: {
              gte: new Date(`${date}T00:00:00`),
              lt: new Date(`${date}T23:59:59`),
            },
          }
        : {}),
    },
    orderBy: { date: "desc" },
    include: {
      patient: { select: { nomPrenoms: true } },
      agent: { select: { nom: true } },
    },
  });

  if (rapports.length === 0) {
    return NextResponse.json(
      { error: "Aucun rapport à exporter." },
      { status: 404 }
    );
  }

  const buffer = await renderToBuffer(RapportDocument({ rapports }));

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="rapports-sadh-visa.pdf"`,
    },
  });
}
