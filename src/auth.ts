import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { authConfig } from "@/auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: {},
        motDePasse: {},
      },
      authorize: async (credentials) => {
        const email = credentials?.email as string | undefined;
        const motDePasse = credentials?.motDePasse as string | undefined;
        if (!email || !motDePasse) return null;

        const personnel = await prisma.personnel.findUnique({
          where: { email: email.toLowerCase() },
        });
        if (!personnel || !personnel.actif) return null;

        const valid = await bcrypt.compare(motDePasse, personnel.motDePasse);
        if (!valid) return null;

        return {
          id: personnel.id,
          name: personnel.nom,
          email: personnel.email,
          role: personnel.role,
        };
      },
    }),
  ],
});
