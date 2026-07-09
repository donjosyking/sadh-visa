import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 32, fontSize: 10, fontFamily: "Helvetica", color: "#17301f" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "2 solid #0f3d24",
    paddingBottom: 10,
    marginBottom: 16,
  },
  title: { fontSize: 16, fontWeight: 700, color: "#0f3d24" },
  subtitle: { fontSize: 9, color: "#666666", marginTop: 2 },
  section: { marginBottom: 12 },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 700,
    color: "#0f3d24",
    backgroundColor: "#eef7f0",
    padding: 6,
    marginBottom: 6,
  },
  row: {
    flexDirection: "row",
    borderBottom: "0.5 solid #e5e5e5",
    paddingVertical: 4,
  },
  label: { width: "40%", color: "#666666" },
  value: { width: "60%", fontWeight: 700 },
  incidentBox: {
    marginTop: 6,
    padding: 8,
    backgroundColor: "#fef2f2",
    color: "#a30d26",
    fontWeight: 700,
  },
  footer: {
    position: "absolute",
    bottom: 24,
    left: 32,
    right: 32,
    textAlign: "center",
    fontSize: 8,
    color: "#999999",
  },
});

const etatLabel: Record<string, string> = {
  BON: "Bon",
  MOYEN: "Moyen",
  PREOCCUPANT: "Préoccupant",
};

const soinsLabels: { key: string; label: string }[] = [
  { key: "aideLeverCoucher", label: "Aide au lever / coucher" },
  { key: "aideDeplacement", label: "Aide au déplacement / exercices" },
  { key: "aideHygiene", label: "Aide à l'hygiène" },
  { key: "aideToilette", label: "Aide à la toilette" },
  { key: "aideHabillage", label: "Aide à l'habillage" },
  { key: "aideMedicaments", label: "Aide à la prise des médicaments" },
  { key: "aideRepas", label: "Aide à la prise des repas" },
  { key: "aideConversation", label: "Aide à la conversation / lecture" },
  { key: "accompagnementBalade", label: "Accompagnement balade" },
];

export type RapportPourPdf = {
  id: string;
  date: Date;
  heureDebut: string;
  heureFin: string;
  tensionArterielle: string | null;
  temperature: string | null;
  pouls: string | null;
  glycemie: string | null;
  autresObservationsMedicales: string | null;
  aideLeverCoucher: boolean;
  aideDeplacement: boolean;
  aideHygiene: boolean;
  aideToilette: boolean;
  aideHabillage: boolean;
  aideMedicaments: boolean;
  aideRepas: boolean;
  aideConversation: boolean;
  accompagnementBalade: boolean;
  autreSoin: string | null;
  etatPhysique: string;
  commentaireEtatPhysique: string | null;
  etatMoral: string;
  commentaireEtatMoral: string | null;
  observations: string | null;
  alerteIncident: boolean;
  descriptionIncident: string | null;
  patient: { nomPrenoms: string };
  agent: { nom: string };
};

function RapportPage({ r }: { r: RapportPourPdf }) {
  const soinsEffectues = soinsLabels.filter(
    (s) => r[s.key as keyof RapportPourPdf]
  );

  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>SADH-VISA</Text>
          <Text style={styles.subtitle}>
            Rapport journalier — {r.patient.nomPrenoms}
          </Text>
        </View>
        <View>
          <Text style={styles.subtitle}>
            Date : {new Date(r.date).toLocaleDateString("fr-FR")}
          </Text>
          <Text style={styles.subtitle}>
            Heures : {r.heureDebut} – {r.heureFin}
          </Text>
          <Text style={styles.subtitle}>Agent : {r.agent.nom}</Text>
        </View>
      </View>

      {r.alerteIncident && (
        <View style={styles.incidentBox}>
          <Text>⚠ Incident signalé : {r.descriptionIncident}</Text>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contrôle des paramètres</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Tension artérielle</Text>
          <Text style={styles.value}>{r.tensionArterielle || "—"}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Température</Text>
          <Text style={styles.value}>{r.temperature || "—"}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Pouls</Text>
          <Text style={styles.value}>{r.pouls || "—"}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Glycémie</Text>
          <Text style={styles.value}>{r.glycemie || "—"}</Text>
        </View>
        {r.autresObservationsMedicales && (
          <View style={styles.row}>
            <Text style={styles.label}>Autres observations</Text>
            <Text style={styles.value}>{r.autresObservationsMedicales}</Text>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Soins et aides effectués</Text>
        <View style={styles.row}>
          <Text style={styles.value}>
            {soinsEffectues.length > 0
              ? soinsEffectues.map((s) => s.label).join(" · ")
              : "Aucun soin coché"}
          </Text>
        </View>
        {r.autreSoin && (
          <View style={styles.row}>
            <Text style={styles.label}>Autre soin</Text>
            <Text style={styles.value}>{r.autreSoin}</Text>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>État général du patient</Text>
        <View style={styles.row}>
          <Text style={styles.label}>État physique</Text>
          <Text style={styles.value}>{etatLabel[r.etatPhysique]}</Text>
        </View>
        {r.commentaireEtatPhysique && (
          <View style={styles.row}>
            <Text style={styles.label}>Commentaire</Text>
            <Text style={styles.value}>{r.commentaireEtatPhysique}</Text>
          </View>
        )}
        <View style={styles.row}>
          <Text style={styles.label}>État moral</Text>
          <Text style={styles.value}>{etatLabel[r.etatMoral]}</Text>
        </View>
        {r.commentaireEtatMoral && (
          <View style={styles.row}>
            <Text style={styles.label}>Commentaire</Text>
            <Text style={styles.value}>{r.commentaireEtatMoral}</Text>
          </View>
        )}
      </View>

      {r.observations && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Observations</Text>
          <Text>{r.observations}</Text>
        </View>
      )}

      <Text style={styles.footer}>
        SADH-VISA — Service d&apos;Assistance à la Personne à Domicile et dans
        les Hôpitaux — Document généré le{" "}
        {new Date().toLocaleDateString("fr-FR")}
      </Text>
    </Page>
  );
}

export function RapportDocument({ rapports }: { rapports: RapportPourPdf[] }) {
  return (
    <Document>
      {rapports.map((r) => (
        <RapportPage key={r.id} r={r} />
      ))}
    </Document>
  );
}
