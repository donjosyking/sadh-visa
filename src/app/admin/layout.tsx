import Link from "next/link";
import { auth } from "@/auth";
import DeconnexionButton from "@/components/DeconnexionButton";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="bg-brand-cream">
      <div className="border-b border-black/5 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-brand-red-600">
              Back-office
            </span>
            <p className="text-sm text-foreground/70">
              Connecté en tant que {session?.user?.name}
            </p>
          </div>
          <nav className="flex flex-wrap items-center gap-2">
            <Link
              href="/admin"
              className="rounded-full px-4 py-2 text-sm font-medium text-brand-green-900 transition hover:bg-brand-green-50"
            >
              Vue d&apos;ensemble
            </Link>
            <Link
              href="/admin/demandes"
              className="rounded-full px-4 py-2 text-sm font-medium text-brand-green-900 transition hover:bg-brand-green-50"
            >
              Demandes
            </Link>
            <Link
              href="/admin/rapports"
              className="rounded-full px-4 py-2 text-sm font-medium text-brand-green-900 transition hover:bg-brand-green-50"
            >
              Rapports
            </Link>
            <Link
              href="/admin/personnel"
              className="rounded-full px-4 py-2 text-sm font-medium text-brand-green-900 transition hover:bg-brand-green-50"
            >
              Personnel
            </Link>
            <DeconnexionButton />
          </nav>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">{children}</div>
    </div>
  );
}
