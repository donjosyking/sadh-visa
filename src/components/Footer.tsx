import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-brand-green-900 text-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Image
              src="/logo.png"
              alt="SADH-VISA"
              width={160}
              height={78}
              className="h-16 w-auto brightness-0 invert"
            />
            <p className="mt-4 text-sm italic text-white/70">
              Servir avec cœur, accompagner avec dignité
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white/60">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Phone size={18} className="mt-0.5 shrink-0 text-brand-red-600" />
                <span>(+228) 22 20 91 73 / 90 14 30 80</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="mt-0.5 shrink-0 text-brand-red-600" />
                <span>sadvisa236@gmail.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-brand-red-600" />
                <span>
                  4ème rue après la pharmacie de l&apos;hôpital, en allant vers
                  Tokoin — BP:13514 Lomé, Togo
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white/60">
              Nos valeurs
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              <li>Respect</li>
              <li>Bienveillance</li>
              <li>Engagement</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/50">
          © {new Date().getFullYear()} SADH-VISA — Service d&apos;Assistance à
          la Personne à Domicile et dans les Hôpitaux
        </div>
      </div>
    </footer>
  );
}
