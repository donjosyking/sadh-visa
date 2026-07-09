import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

async function main() {
  const [email, motDePasse, nom, role] = process.argv.slice(2);

  if (!email || !motDePasse || !nom) {
    console.error(
      "Usage: npx tsx scripts/creer-compte.ts <email> <mot-de-passe> <nom> [ADMIN|DIRECTION|PERSONNEL]"
    );
    process.exit(1);
  }

  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  const prisma = new PrismaClient({ adapter });

  const hash = await bcrypt.hash(motDePasse, 10);

  const personnel = await prisma.personnel.upsert({
    where: { email: email.toLowerCase() },
    update: { motDePasse: hash, nom, role: (role as never) || "ADMIN", actif: true },
    create: {
      email: email.toLowerCase(),
      motDePasse: hash,
      nom,
      role: (role as never) || "ADMIN",
      actif: true,
    },
  });

  console.log(`Compte prêt : ${personnel.email} (${personnel.role})`);
  await prisma.$disconnect();
}

main();
