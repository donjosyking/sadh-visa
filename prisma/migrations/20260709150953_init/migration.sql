-- CreateEnum
CREATE TYPE "Sexe" AS ENUM ('H', 'F');

-- CreateEnum
CREATE TYPE "TypeIntervention" AS ENUM ('ACCIDENT', 'MALADIE', 'AUTRE');

-- CreateEnum
CREATE TYPE "OptionService" AS ENUM ('ALLER_RETOUR', 'PLEIN_TEMPS', 'TEMPS_PARTIEL');

-- CreateEnum
CREATE TYPE "RolePersonnel" AS ENUM ('PERSONNEL', 'ADMIN', 'DIRECTION');

-- CreateEnum
CREATE TYPE "EtatPatient" AS ENUM ('BON', 'MOYEN', 'PREOCCUPANT');

-- CreateTable
CREATE TABLE "Patient" (
    "id" TEXT NOT NULL,
    "nomPrenoms" TEXT NOT NULL,
    "sexe" "Sexe" NOT NULL,
    "adresse" TEXT NOT NULL,
    "codePostalVille" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "email" TEXT,
    "dateNaissance" TIMESTAMP(3) NOT NULL,
    "villeNaissance" TEXT NOT NULL,
    "taille" DOUBLE PRECISION,
    "poids" DOUBLE PRECISION,
    "pathologie" TEXT,
    "traitementEnCours" TEXT,
    "typeIntervention" "TypeIntervention" NOT NULL,
    "personneAPrevenirNom" TEXT NOT NULL,
    "lienParente" TEXT NOT NULL,
    "personneAPrevenirAdresse" TEXT NOT NULL,
    "optionService" "OptionService" NOT NULL,
    "heureDebut" TEXT,
    "heureFin" TEXT,
    "rotation" TEXT,
    "fraisDossier" DOUBLE PRECISION,
    "fraisPrestationJournalier" DOUBLE PRECISION,
    "fraisPrestationMensuel" DOUBLE PRECISION,
    "cautionAvance" DOUBLE PRECISION,
    "reste" DOUBLE PRECISION,
    "dateSignature" TIMESTAMP(3),
    "responsable" TEXT,
    "telephoneResponsable" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Personnel" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "motDePasse" TEXT NOT NULL,
    "role" "RolePersonnel" NOT NULL DEFAULT 'PERSONNEL',
    "actif" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Personnel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RapportJournalier" (
    "id" TEXT NOT NULL,
    "agentId" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "heureDebut" TEXT NOT NULL,
    "heureFin" TEXT NOT NULL,
    "tensionArterielle" TEXT,
    "temperature" TEXT,
    "pouls" TEXT,
    "glycemie" TEXT,
    "autresObservationsMedicales" TEXT,
    "aideLeverCoucher" BOOLEAN NOT NULL DEFAULT false,
    "aideDeplacement" BOOLEAN NOT NULL DEFAULT false,
    "aideHygiene" BOOLEAN NOT NULL DEFAULT false,
    "aideToilette" BOOLEAN NOT NULL DEFAULT false,
    "aideHabillage" BOOLEAN NOT NULL DEFAULT false,
    "aideMedicaments" BOOLEAN NOT NULL DEFAULT false,
    "aideRepas" BOOLEAN NOT NULL DEFAULT false,
    "aideConversation" BOOLEAN NOT NULL DEFAULT false,
    "accompagnementBalade" BOOLEAN NOT NULL DEFAULT false,
    "autreSoin" TEXT,
    "etatPhysique" "EtatPatient" NOT NULL,
    "commentaireEtatPhysique" TEXT,
    "etatMoral" "EtatPatient" NOT NULL,
    "commentaireEtatMoral" TEXT,
    "observations" TEXT,
    "alerteIncident" BOOLEAN NOT NULL DEFAULT false,
    "descriptionIncident" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RapportJournalier_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Personnel_email_key" ON "Personnel"("email");

-- AddForeignKey
ALTER TABLE "RapportJournalier" ADD CONSTRAINT "RapportJournalier_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Personnel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RapportJournalier" ADD CONSTRAINT "RapportJournalier_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
