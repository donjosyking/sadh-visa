"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Field, ChoiceGroup, inputClass } from "@/components/form/Field";

const initialState = {
  // Fiche patient
  nomPrenoms: "",
  sexe: "",
  adresse: "",
  codePostalVille: "",
  telephone: "",
  email: "",
  dateNaissance: "",
  villeNaissance: "",
  taille: "",
  poids: "",
  pathologie: "",
  traitementEnCours: "",
  typeIntervention: "",
  personneAPrevenirNom: "",
  lienParente: "",
  personneAPrevenirAdresse: "",
  // Option du service
  optionService: "",
  // Heures
  heureDebut: "",
  heureFin: "",
  rotation: "",
  // Frais
  fraisDossier: "",
  fraisPrestationJournalier: "",
  fraisPrestationMensuel: "",
  cautionAvance: "",
  reste: "",
  dateSignature: "",
  responsable: "",
  telephoneResponsable: "",
};

type FormState = typeof initialState;

export default function DemandePage() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );

  const set = (key: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/demande", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <section className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center sm:px-6">
        <CheckCircle2 size={56} className="text-brand-green-700" />
        <h1 className="mt-6 text-2xl font-bold text-brand-green-900 sm:text-3xl">
          Demande envoyée avec succès
        </h1>
        <p className="mt-4 leading-7 text-foreground/80">
          Merci pour votre confiance. Notre équipe SADH-VISA va examiner votre
          demande et vous recontacter très prochainement.
        </p>
        <button
          onClick={() => {
            setForm(initialState);
            setStatus("idle");
          }}
          className="mt-8 rounded-full bg-brand-green-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-green-800"
        >
          Faire une nouvelle demande
        </button>
      </section>
    );
  }

  return (
    <div className="bg-brand-cream py-14 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-brand-red-600">
            Demande de prise en charge
          </span>
          <h1 className="mt-3 text-2xl font-bold text-brand-green-900 sm:text-3xl">
            Fiche de renseignements du patient
          </h1>
          <p className="mt-3 text-sm text-foreground/70">
            Les champs marqués d&apos;un{" "}
            <span className="text-brand-red-600">*</span> sont obligatoires.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          {/* SECTION 1 */}
          <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-8">
            <h2 className="text-lg font-bold text-brand-green-900">
              1. Fiche de renseignements du patient
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="Nom et prénoms" required className="sm:col-span-2">
                <input
                  className={inputClass}
                  required
                  value={form.nomPrenoms}
                  onChange={set("nomPrenoms")}
                />
              </Field>

              <Field label="Sexe" required className="sm:col-span-2">
                <ChoiceGroup
                  name="sexe"
                  required
                  value={form.sexe}
                  onChange={(v) => setForm((f) => ({ ...f, sexe: v }))}
                  options={[
                    { value: "H", label: "Homme" },
                    { value: "F", label: "Femme" },
                  ]}
                />
              </Field>

              <Field label="Adresse" required className="sm:col-span-2">
                <input
                  className={inputClass}
                  required
                  value={form.adresse}
                  onChange={set("adresse")}
                />
              </Field>

              <Field label="Code postal et ville" required>
                <input
                  className={inputClass}
                  required
                  value={form.codePostalVille}
                  onChange={set("codePostalVille")}
                />
              </Field>

              <Field label="Téléphone" required>
                <input
                  type="tel"
                  className={inputClass}
                  required
                  value={form.telephone}
                  onChange={set("telephone")}
                />
              </Field>

              <Field label="E-mail">
                <input
                  type="email"
                  className={inputClass}
                  value={form.email}
                  onChange={set("email")}
                />
              </Field>

              <Field label="Date de naissance" required>
                <input
                  type="date"
                  className={inputClass}
                  required
                  value={form.dateNaissance}
                  onChange={set("dateNaissance")}
                />
              </Field>

              <Field label="Ville de naissance" required>
                <input
                  className={inputClass}
                  required
                  value={form.villeNaissance}
                  onChange={set("villeNaissance")}
                />
              </Field>

              <Field label="Taille (cm)">
                <input
                  type="number"
                  inputMode="decimal"
                  className={inputClass}
                  value={form.taille}
                  onChange={set("taille")}
                />
              </Field>

              <Field label="Poids (kg)">
                <input
                  type="number"
                  inputMode="decimal"
                  className={inputClass}
                  value={form.poids}
                  onChange={set("poids")}
                />
              </Field>

              <Field label="Pathologie" className="sm:col-span-2">
                <textarea
                  className={inputClass}
                  rows={2}
                  value={form.pathologie}
                  onChange={set("pathologie")}
                />
              </Field>

              <Field label="Traitement en cours" className="sm:col-span-2">
                <textarea
                  className={inputClass}
                  rows={2}
                  value={form.traitementEnCours}
                  onChange={set("traitementEnCours")}
                />
              </Field>

              <Field
                label="Votre intervention est en lien avec"
                required
                className="sm:col-span-2"
              >
                <ChoiceGroup
                  name="typeIntervention"
                  required
                  value={form.typeIntervention}
                  onChange={(v) =>
                    setForm((f) => ({ ...f, typeIntervention: v }))
                  }
                  options={[
                    { value: "ACCIDENT", label: "Un accident" },
                    { value: "MALADIE", label: "Maladie" },
                    { value: "AUTRE", label: "Autre" },
                  ]}
                />
              </Field>

              <Field label="Personne à prévenir — nom et prénoms" required>
                <input
                  className={inputClass}
                  required
                  value={form.personneAPrevenirNom}
                  onChange={set("personneAPrevenirNom")}
                />
              </Field>

              <Field label="Lien de parenté" required>
                <input
                  className={inputClass}
                  required
                  value={form.lienParente}
                  onChange={set("lienParente")}
                />
              </Field>

              <Field
                label="Adresse de la personne à prévenir"
                required
                className="sm:col-span-2"
              >
                <input
                  className={inputClass}
                  required
                  value={form.personneAPrevenirAdresse}
                  onChange={set("personneAPrevenirAdresse")}
                />
              </Field>
            </div>
          </section>

          {/* SECTION 2 */}
          <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-8">
            <h2 className="text-lg font-bold text-brand-green-900">
              2. Option du service
            </h2>
            <div className="mt-6">
              <ChoiceGroup
                name="optionService"
                required
                value={form.optionService}
                onChange={(v) => setForm((f) => ({ ...f, optionService: v }))}
                options={[
                  { value: "ALLER_RETOUR", label: "Aller-retour" },
                  { value: "PLEIN_TEMPS", label: "Plein temps" },
                  { value: "TEMPS_PARTIEL", label: "Temps partiel" },
                ]}
              />
            </div>
          </section>

          {/* SECTION 3 */}
          <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-8">
            <h2 className="text-lg font-bold text-brand-green-900">
              3. Heures
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="Heure de début">
                <input
                  type="time"
                  className={inputClass}
                  value={form.heureDebut}
                  onChange={set("heureDebut")}
                />
              </Field>
              <Field label="Heure de fin">
                <input
                  type="time"
                  className={inputClass}
                  value={form.heureFin}
                  onChange={set("heureFin")}
                />
              </Field>
              <Field label="Rotation" className="sm:col-span-2">
                <input
                  className={inputClass}
                  value={form.rotation}
                  onChange={set("rotation")}
                />
              </Field>
            </div>
          </section>

          {/* SECTION 4 */}
          <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-8">
            <h2 className="text-lg font-bold text-brand-green-900">
              4. Frais
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="Frais de dossier">
                <input
                  type="number"
                  inputMode="decimal"
                  className={inputClass}
                  value={form.fraisDossier}
                  onChange={set("fraisDossier")}
                />
              </Field>
              <Field label="Frais de prestation journalier">
                <input
                  type="number"
                  inputMode="decimal"
                  className={inputClass}
                  value={form.fraisPrestationJournalier}
                  onChange={set("fraisPrestationJournalier")}
                />
              </Field>
              <Field label="Frais de prestation mensuel">
                <input
                  type="number"
                  inputMode="decimal"
                  className={inputClass}
                  value={form.fraisPrestationMensuel}
                  onChange={set("fraisPrestationMensuel")}
                />
              </Field>
              <Field label="Caution ou avance">
                <input
                  type="number"
                  inputMode="decimal"
                  className={inputClass}
                  value={form.cautionAvance}
                  onChange={set("cautionAvance")}
                />
              </Field>
              <Field label="Reste">
                <input
                  type="number"
                  inputMode="decimal"
                  className={inputClass}
                  value={form.reste}
                  onChange={set("reste")}
                />
              </Field>
              <Field label="Date de signature">
                <input
                  type="date"
                  className={inputClass}
                  value={form.dateSignature}
                  onChange={set("dateSignature")}
                />
              </Field>
              <Field label="Responsable">
                <input
                  className={inputClass}
                  value={form.responsable}
                  onChange={set("responsable")}
                />
              </Field>
              <Field label="Téléphone responsable">
                <input
                  type="tel"
                  className={inputClass}
                  value={form.telephoneResponsable}
                  onChange={set("telephoneResponsable")}
                />
              </Field>
            </div>
          </section>

          {status === "error" && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-brand-red-700">
              Une erreur est survenue. Merci de réessayer.
            </p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-red-600 px-6 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-brand-red-700 disabled:opacity-60 sm:w-auto"
          >
            {status === "loading" && (
              <Loader2 size={18} className="animate-spin" />
            )}
            Envoyer la demande
          </button>
        </form>
      </div>
    </div>
  );
}
