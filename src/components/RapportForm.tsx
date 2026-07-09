"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2 } from "lucide-react";
import {
  Field,
  ChoiceGroup,
  CheckboxPill,
  inputClass,
} from "@/components/form/Field";

const soinsOptions = [
  { key: "aideLeverCoucher", label: "Aide au lever / coucher" },
  { key: "aideDeplacement", label: "Aide au déplacement / exercices" },
  { key: "aideHygiene", label: "Aide à l'hygiène" },
  { key: "aideToilette", label: "Aide à la toilette" },
  { key: "aideHabillage", label: "Aide à l'habillage" },
  { key: "aideMedicaments", label: "Aide à la prise des médicaments" },
  { key: "aideRepas", label: "Aide à la prise des repas" },
  { key: "aideConversation", label: "Aide à la conversation / lecture" },
  { key: "accompagnementBalade", label: "Accompagnement balade" },
] as const;

const etatOptions = [
  { value: "BON", label: "Bon" },
  { value: "MOYEN", label: "Moyen" },
  { value: "PREOCCUPANT", label: "Préoccupant" },
];

const initialState = {
  patientId: "",
  heureDebut: "",
  heureFin: "",
  tensionArterielle: "",
  temperature: "",
  pouls: "",
  glycemie: "",
  autresObservationsMedicales: "",
  aideLeverCoucher: false,
  aideDeplacement: false,
  aideHygiene: false,
  aideToilette: false,
  aideHabillage: false,
  aideMedicaments: false,
  aideRepas: false,
  aideConversation: false,
  accompagnementBalade: false,
  autreSoin: "",
  etatPhysique: "",
  commentaireEtatPhysique: "",
  etatMoral: "",
  commentaireEtatMoral: "",
  observations: "",
  alerteIncident: false,
  descriptionIncident: "",
};

type FormState = typeof initialState;

export default function RapportForm({
  patients,
}: {
  patients: { id: string; nomPrenoms: string }[];
}) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );

  const set = (key: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/rapports", {
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
      <div className="mt-10 flex flex-col items-center rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-black/5">
        <CheckCircle2 size={48} className="text-brand-green-700" />
        <h2 className="mt-4 text-xl font-bold text-brand-green-900">
          Rapport envoyé avec succès
        </h2>
        <p className="mt-2 text-sm text-foreground/70">
          Merci, votre rapport a bien été enregistré.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => {
              setForm(initialState);
              setStatus("idle");
            }}
            className="rounded-full bg-brand-green-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-green-800"
          >
            Envoyer un autre rapport
          </button>
          <button
            onClick={() => router.push("/personnel")}
            className="rounded-full border border-brand-green-700 px-6 py-3 text-sm font-semibold text-brand-green-700 transition hover:bg-brand-green-50"
          >
            Retour à mon espace
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 space-y-6">
      {/* IDENTIFICATION */}
      <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-8">
        <h2 className="text-lg font-bold text-brand-green-900">
          Patient concerné
        </h2>
        <div className="mt-6">
          <Field label="Patient" required>
            <select
              required
              className={inputClass}
              value={form.patientId}
              onChange={set("patientId")}
            >
              <option value="">Sélectionner un patient</option>
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nomPrenoms}
                </option>
              ))}
            </select>
          </Field>
          {patients.length === 0 && (
            <p className="mt-2 text-sm text-brand-red-600">
              Aucun patient enregistré pour le moment.
            </p>
          )}
        </div>
      </section>

      {/* HEURES */}
      <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-8">
        <h2 className="text-lg font-bold text-brand-green-900">
          Heures d&apos;intervention
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Heure de début" required>
            <input
              type="time"
              required
              className={inputClass}
              value={form.heureDebut}
              onChange={set("heureDebut")}
            />
          </Field>
          <Field label="Heure de fin" required>
            <input
              type="time"
              required
              className={inputClass}
              value={form.heureFin}
              onChange={set("heureFin")}
            />
          </Field>
        </div>
      </section>

      {/* PARAMETRES */}
      <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-8">
        <h2 className="text-lg font-bold text-brand-green-900">
          Contrôle des paramètres
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Tension artérielle">
            <input
              className={inputClass}
              placeholder="ex: 12/8"
              value={form.tensionArterielle}
              onChange={set("tensionArterielle")}
            />
          </Field>
          <Field label="Température (°C)">
            <input
              className={inputClass}
              value={form.temperature}
              onChange={set("temperature")}
            />
          </Field>
          <Field label="Pouls">
            <input
              className={inputClass}
              value={form.pouls}
              onChange={set("pouls")}
            />
          </Field>
          <Field label="Glycémie">
            <input
              className={inputClass}
              placeholder="Laisser vide si non applicable"
              value={form.glycemie}
              onChange={set("glycemie")}
            />
          </Field>
          <Field label="Autres observations médicales" className="sm:col-span-2">
            <textarea
              rows={2}
              className={inputClass}
              value={form.autresObservationsMedicales}
              onChange={set("autresObservationsMedicales")}
            />
          </Field>
        </div>
      </section>

      {/* SOINS */}
      <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-8">
        <h2 className="text-lg font-bold text-brand-green-900">
          Soins et aides effectués
        </h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {soinsOptions.map((opt) => (
            <CheckboxPill
              key={opt.key}
              label={opt.label}
              checked={form[opt.key]}
              onChange={(v) => setForm((f) => ({ ...f, [opt.key]: v }))}
            />
          ))}
        </div>
        <div className="mt-5">
          <Field label="Autre soin">
            <input
              className={inputClass}
              value={form.autreSoin}
              onChange={set("autreSoin")}
            />
          </Field>
        </div>
      </section>

      {/* ETAT GENERAL */}
      <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-8">
        <h2 className="text-lg font-bold text-brand-green-900">
          État général du patient
        </h2>
        <div className="mt-6 space-y-6">
          <div>
            <Field label="État physique" required>
              <ChoiceGroup
                name="etatPhysique"
                required
                value={form.etatPhysique}
                onChange={(v) => setForm((f) => ({ ...f, etatPhysique: v }))}
                options={etatOptions}
              />
            </Field>
            <textarea
              rows={2}
              placeholder="Commentaire (optionnel)"
              className={`${inputClass} mt-3`}
              value={form.commentaireEtatPhysique}
              onChange={set("commentaireEtatPhysique")}
            />
          </div>

          <div>
            <Field label="État moral" required>
              <ChoiceGroup
                name="etatMoral"
                required
                value={form.etatMoral}
                onChange={(v) => setForm((f) => ({ ...f, etatMoral: v }))}
                options={etatOptions}
              />
            </Field>
            <textarea
              rows={2}
              placeholder="Commentaire (optionnel)"
              className={`${inputClass} mt-3`}
              value={form.commentaireEtatMoral}
              onChange={set("commentaireEtatMoral")}
            />
          </div>
        </div>
      </section>

      {/* OBSERVATIONS */}
      <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-8">
        <h2 className="text-lg font-bold text-brand-green-900">
          Observations et incidents
        </h2>
        <div className="mt-6 space-y-5">
          <Field label="Observations">
            <textarea
              rows={3}
              className={inputClass}
              value={form.observations}
              onChange={set("observations")}
            />
          </Field>

          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={form.alerteIncident}
              onChange={(e) =>
                setForm((f) => ({ ...f, alerteIncident: e.target.checked }))
              }
              className="h-5 w-5 rounded border-black/20 text-brand-red-600 focus:ring-brand-red-600"
            />
            <span className="text-sm font-medium text-brand-red-600">
              Signaler une alerte / un incident
            </span>
          </label>

          {form.alerteIncident && (
            <Field label="Description de l'incident" required>
              <textarea
                rows={3}
                required
                className={inputClass}
                value={form.descriptionIncident}
                onChange={set("descriptionIncident")}
              />
            </Field>
          )}
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
        Envoyer le rapport
      </button>
    </form>
  );
}
