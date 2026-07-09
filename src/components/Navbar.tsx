"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/#accueil", label: "Accueil" },
  { href: "/#qui-sommes-nous", label: "Qui sommes-nous" },
  { href: "/#prestations", label: "Nos prestations" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="SADH-VISA"
            width={140}
            height={68}
            className="h-12 w-auto sm:h-14"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-brand-green-900 transition hover:text-brand-red-600"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/connexion"
            className="rounded-full border border-brand-green-700 px-4 py-2 text-sm font-semibold text-brand-green-700 transition hover:bg-brand-green-50"
          >
            Espace Personnel
          </Link>
          <Link
            href="/demande"
            className="rounded-full bg-brand-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-red-700"
          >
            Demande de prise en charge
          </Link>
        </div>

        <button
          type="button"
          aria-label="Ouvrir le menu"
          className="text-brand-green-900 lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-black/5 bg-white px-4 pb-4 lg:hidden">
          <nav className="flex flex-col gap-3 pt-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-brand-green-900"
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/connexion"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full border border-brand-green-700 px-4 py-2 text-center text-sm font-semibold text-brand-green-700"
            >
              Espace Personnel
            </Link>
            <Link
              href="/demande"
              onClick={() => setOpen(false)}
              className="rounded-full bg-brand-red-600 px-4 py-2 text-center text-sm font-semibold text-white"
            >
              Demande de prise en charge
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
