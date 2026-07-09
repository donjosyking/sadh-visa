import Link from "next/link";
import Image from "next/image";
import {
  Activity,
  BedDouble,
  Footprints,
  Droplets,
  BookOpen,
  ShowerHead,
  Pill,
  Shirt,
  TreePine,
  Heart,
  ShieldCheck,
  HandHeart,
  ArrowRight,
} from "lucide-react";

const prestations = [
  { icon: Activity, label: "Aide au contrôle des paramètres" },
  { icon: BedDouble, label: "Aide au lever et au coucher" },
  {
    icon: Footprints,
    label: "Aide au déplacement et à la réalisation des exercices physiques",
  },
  { icon: Droplets, label: "Aide à l'hygiène du patient" },
  { icon: BookOpen, label: "Aide à la conversation et à la lecture" },
  { icon: ShowerHead, label: "Aide à la toilette" },
  { icon: Pill, label: "Aide à la prise des médicaments et des repas" },
  { icon: Shirt, label: "Aide à l'habillage" },
  { icon: TreePine, label: "Aide à l'accompagnement des balades" },
];

const valeurs = [
  {
    icon: ShieldCheck,
    title: "Respect",
    text: "De la dignité et du rythme de chaque patient.",
  },
  {
    icon: HandHeart,
    title: "Bienveillance",
    text: "Une écoute attentive et un accompagnement humain.",
  },
  {
    icon: Heart,
    title: "Engagement",
    text: "Une présence fiable, à domicile comme à l'hôpital.",
  },
];

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section
        id="accueil"
        className="relative overflow-hidden bg-gradient-to-br from-brand-green-900 via-brand-green-800 to-brand-green-700"
      >
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-green-600/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-0 h-80 w-80 rounded-full bg-brand-red-600/20 blur-3xl" />

        <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 py-20 text-center sm:px-6 sm:py-28">
          <div className="rounded-2xl bg-white/95 p-4 shadow-lg">
            <Image
              src="/logo.png"
              alt="SADH-VISA"
              width={220}
              height={107}
              className="h-16 w-auto sm:h-20"
              priority
            />
          </div>

          <h1 className="mt-8 max-w-3xl text-3xl font-bold leading-tight text-white sm:text-5xl">
            L&apos;assistance à la personne, à domicile et à l&apos;hôpital
          </h1>
          <p className="mt-5 max-w-xl text-lg italic text-white/85">
            Servir avec cœur, accompagner avec dignité
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/demande"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-red-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-brand-red-700"
            >
              Faire une demande de prise en charge
              <ArrowRight size={18} />
            </Link>
            <a
              href="#prestations"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-7 py-3.5 text-sm font-semibold text-white ring-1 ring-inset ring-white/40 transition hover:bg-white/20"
            >
              Découvrir nos prestations
            </a>
          </div>
        </div>

        {/* Valeurs strip */}
        <div className="relative border-t border-white/10 bg-black/10">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-8 sm:grid-cols-3 sm:px-6">
            {valeurs.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex items-start gap-4 text-white">
                <div className="rounded-full bg-white/10 p-3">
                  <Icon size={22} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold">{title}</p>
                  <p className="text-sm text-white/70">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUI SOMMES-NOUS */}
      <section
        id="qui-sommes-nous"
        className="mx-auto max-w-6xl px-4 py-20 sm:px-6"
      >
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wide text-brand-red-600">
              Qui sommes-nous
            </span>
            <h2 className="mt-3 text-3xl font-bold text-brand-green-900">
              SADH-VISA, à vos côtés au quotidien
            </h2>
            <p className="mt-5 leading-7 text-foreground/80">
              SADH-VISA — Service d&apos;Assistance à la Personne à Domicile
              et dans les Hôpitaux — accompagne les patients et leurs
              familles à Lomé avec un personnel formé et disponible. Nous
              intervenons aussi bien à domicile qu&apos;en milieu hospitalier,
              pour un soutien quotidien fiable et humain.
            </p>
            <p className="mt-4 leading-7 text-foreground/80">
              Chaque prise en charge est pensée autour du patient : ses
              besoins, son rythme et sa dignité, avec un suivi rigoureux
              assuré par notre équipe.
            </p>
          </div>

          <div className="rounded-3xl bg-brand-green-50 p-10">
            <ul className="space-y-5">
              <li className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-brand-red-600" />
                <span className="font-medium text-brand-green-900">
                  Personnel qualifié et encadré
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-brand-red-600" />
                <span className="font-medium text-brand-green-900">
                  Suivi journalier de chaque patient
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-brand-red-600" />
                <span className="font-medium text-brand-green-900">
                  Intervention à domicile et à l&apos;hôpital
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-brand-red-600" />
                <span className="font-medium text-brand-green-900">
                  Options flexibles : plein temps, temps partiel, aller-retour
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* PRESTATIONS */}
      <section id="prestations" className="bg-brand-cream py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wide text-brand-red-600">
              Nos prestations
            </span>
            <h2 className="mt-3 text-3xl font-bold text-brand-green-900">
              Un accompagnement complet, au quotidien
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {prestations.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition hover:shadow-md"
              >
                <div className="rounded-xl bg-brand-green-50 p-3">
                  <Icon size={24} className="text-brand-green-700" />
                </div>
                <p className="mt-1 font-medium leading-snug text-brand-green-900">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-green-900">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-16 text-center sm:px-6">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Besoin d&apos;une assistance pour un proche ?
          </h2>
          <p className="max-w-xl text-white/75">
            Remplissez notre formulaire de demande de prise en charge en
            ligne, notre équipe vous recontacte rapidement.
          </p>
          <Link
            href="/demande"
            className="inline-flex items-center gap-2 rounded-full bg-brand-red-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-brand-red-700"
          >
            Faire une demande maintenant
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
