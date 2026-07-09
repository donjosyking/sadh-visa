import { prisma } from "@/lib/prisma";
import PersonnelManager from "@/components/PersonnelManager";

export const dynamic = "force-dynamic";

export default async function PersonnelAdminPage() {
  const personnel = await prisma.personnel.findMany({
    orderBy: { createdAt: "asc" },
    select: { id: true, nom: true, email: true, role: true, actif: true },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-green-900">
        Gestion du personnel
      </h1>
      <div className="mt-6">
        <PersonnelManager personnel={personnel} maxPersonnel={15} />
      </div>
    </div>
  );
}
