import { auth } from "@/auth";
import DeconnexionButton from "@/components/DeconnexionButton";

export default async function PersonnelPage() {
  const session = await auth();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-sm font-semibold uppercase tracking-wide text-brand-red-600">
            Espace Personnel
          </span>
          <h1 className="mt-2 text-2xl font-bold text-brand-green-900">
            Bonjour, {session?.user?.name}
          </h1>
        </div>
        <DeconnexionButton />
      </div>

      <div className="mt-10 rounded-2xl bg-brand-green-50 p-8 text-brand-green-900">
        Le formulaire de rapport journalier arrivera ici à la prochaine étape.
      </div>
    </div>
  );
}
