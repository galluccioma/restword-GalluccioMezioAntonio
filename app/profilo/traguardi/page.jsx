"use client";

import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
const allBadges = [
  {
    id: "personalInfo",
    title: "Chef's Hat",
    description:
      "Hai completato le tue informazioni personali. Un buon chef si presenta sempre al meglio!",
    icon: "👨‍🍳",
    category: "profile",
    unlockCondition: "Completa tutti i campi delle informazioni personali",
    points: 15,
  },
  {
    id: "workExperience",
    title: "Master Chef",
    description:
      "Hai dettagliato la tua esperienza lavorativa. La tua esperienza in cucina è impressionante!",
    icon: "🍳",
    category: "profile",
    unlockCondition:
      "Aggiungi dettagli completi sulle tue esperienze lavorative passate",
    points: 20,
  },
  {
    id: "education",
    title: "Culinary School",
    description:
      "Hai completato la tua formazione. La tua educazione culinaria è fondamentale!",
    icon: "🎓",
    category: "profile",
    unlockCondition:
      "Inserisci informazioni sulla tua formazione e i corsi che hai seguito",
    points: 10,
  },
  {
    id: "skills",
    title: "Kitchen Tools",
    description:
      "Hai aggiunto competenze importanti. I tuoi strumenti culinari sono affilati e pronti!",
    icon: "🔪",
    category: "profile",
    unlockCondition: "Aggiungi almeno 3 competenze chiave",
    points: 9,
  },
  {
    id: "jobPreferences",
    title: "Menu Planner",
    description:
      "Hai specificato le tue preferenze lavorative. Sai esattamente che tipo di menu vuoi creare!",
    icon: "📋",
    category: "profile",
    unlockCondition:
      "Specifica le tue preferenze lavorative in modo dettagliato",
    points: 10,
  },
  {
    id: "cv",
    title: "Recipe Book",
    description:
      "Hai caricato il tuo curriculum vitae. Il tuo libro di ricette personale è pronto!",
    icon: "📕",
    category: "profile",
    unlockCondition: "Carica il tuo CV",
    points: 10,
  },
  {
    id: "allSections",
    title: "Stella Michelin",
    description:
      "Il tuo profilo è molto completo. Hai guadagnato la tua prima stella Michelin!",
    icon: "⭐",
    category: "progress",
    unlockCondition:
      "Completa tutte le sezioni del profilo con un alto livello di dettaglio",
    points: 80,
  },
  {
    id: "expertProfile",
    title: "Celebrity Chef",
    description:
      "Il tuo profilo è eccezionale. Sei diventato uno chef di fama internazionale!",
    icon: "🌟",
    category: "progress",
    unlockCondition:
      "Raggiungi il massimo punteggio in tutte le sezioni del profilo",
    points: 95,
  },
  {
    id: "quickPrep",
    title: "Preparazione Veloce",
    description:
      "Hai iniziato a compilare il tuo profilo. Veloce come un commis che prepara gli ingredienti!",
    icon: "🔪",
    category: "progress",
    unlockCondition:
      "Inizia a compilare il tuo profilo inserendo almeno 3 informazioni",
    points: 3,
  },
  {
    id: "souschef",
    title: "Sous Chef",
    description:
      "Hai aggiunto più esperienze lavorative. Sei il braccio destro dello chef!",
    icon: "👨‍🍳",
    category: "progress",
    unlockCondition: "Aggiungi almeno 2 esperienze lavorative complete",
    points: 15,
  },
  {
    id: "menuPlanner",
    title: "Menu Degustazione",
    description:
      "Le tue competenze sono variegate come un menu degustazione in un ristorante stellato!",
    icon: "📋",
    category: "progress",
    unlockCondition: "Aggiungi almeno 5 competenze diverse al tuo profilo",
    points: 15,
  },
  {
    id: "winePairing",
    title: "Sommelier",
    description:
      "Hai specificato le tue aspettative salariali. Sai abbinare il vino giusto al piatto giusto!",
    icon: "🍷",
    category: "progress",
    unlockCondition:
      "Specifica le tue aspettative salariali nelle preferenze lavorative",
    points: 5,
  },
  {
    id: "signatureDish",
    title: "Piatto Signature",
    description:
      "Foto e CV caricati. Hai creato il tuo piatto signature che ti rappresenta!",
    icon: "🍽️",
    category: "progress",
    unlockCondition: "Carica sia la tua foto che il tuo CV",
    points: 15,
  },
  {
    id: "restaurantOwner",
    title: "Proprietario di Ristorante",
    description:
      "Hai completato tutto il profilo con eccellenza. Sei pronto per gestire il tuo ristorante!",
    icon: "🏆",
    category: "progress",
    unlockCondition:
      "Completa tutte le sezioni del profilo e raggiungi 100+ punti",
    points: 100,
  },
];
export default function BadgeCollection({ achievements, onClose }) {
  // Count badges by category
  const profileBadges = allBadges.filter(
    (badge) => badge.category === "profile"
  );
  const progressBadges = allBadges.filter(
    (badge) => badge.category === "progress"
  );



  // Count unlocked badges
  const unlockedCount = allBadges.filter((badge) => badge.category=== 'profile').length;
  const totalCount = allBadges.length;
  const percentUnlocked = Math.round((unlockedCount / totalCount) * 100);

  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      {/* Intestazione */}
      <div className="bg-restword min-h-80 flex items-center justify-center rounded-lg p-6 mb-8 text-white">
        <div className="flex flex-col justify-center items-center gap-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">I tuoi Traguardi</h1>
            <div className="text-sm mt-2">
              Hai sbloccato <span className="font-bold">{unlockedCount}</span>{" "}
              badge su <span className="font-bold">{totalCount}</span> (
              {percentUnlocked}%)
            </div>
          </div>
          <Link href="/profilo/sfide">
            <Button variant="default" className="">
              Affronta le sfide!
            </Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="w-full justify-start px-6 pt-4 bg-[#f6f5ff]">
          <TabsTrigger
            value="profile"
            className="data-[state=active]:bg-[#7641d9] data-[state=active]:text-white">
            Sbloccati ({profileBadges.length})
          </TabsTrigger>
          <TabsTrigger
            value="progress"
            className="data-[state=active]:bg-[#7641d9] data-[state=active]:text-white">
            Da sbloccare ({progressBadges.length})
          </TabsTrigger>
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-[#7641d9] data-[state=active]:text-white">
            Tutti ({totalCount})
          </TabsTrigger>
        </TabsList>

        <div className="px-6 py-4 bg-[#f6f5ff]">
          <TabsContent value="all" className="mt-0">
            <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {allBadges.map((badge) => (
                <BadgeCard key={badge.id} badge={badge} />
              ))}
            </div>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="mt-0">
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profileBadges.map((badge) => (
                <BadgeCard unlocked={true} key={badge.id} badge={badge} />
              ))}
            </div>
            </Card>
          </TabsContent>

          <TabsContent value="progress" className="mt-0">
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {progressBadges.map((badge) => (
                <BadgeCard key={badge.id} badge={badge} />
              ))}
            </div>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

function BadgeCard({ badge, unlocked }) {
  if (badge.category === "profile") { unlocked = true;}

  return (
    <div
    className={`p-4 rounded-lg border ${
      unlocked
        ? "bg-white border-[#dcd7fe]"
        : "bg-[#f3f4f6] border-[#e5e7eb] opacity-70"
    }`}
  >
    <div className="flex items-start gap-4">
      <div
        className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl ${
          unlocked ? "bg-[#efedff]" : "bg-[#e5e7eb]"
        }`}
      >
        <span role="img" aria-label={badge.title}>
          {badge.icon}
        </span>
      </div>
      <div className="flex-1">
        <h3
          className={`font-bold text-lg ${
            unlocked ? "text-[#351471]" : "text-[#6b7280]"
          }`}
        >
          {badge.title}
        </h3>
        <p
          className={`text-sm ${
            unlocked ? "text-[#556070]" : "text-[#6b7280]"
          }`}
        >
          {badge.description}
        </p>
        {!unlocked && (
          <div className="mt-2 text-xs text-[#7641d9] bg-[#efedff] p-2 rounded">
            <span className="font-medium">Come sbloccare:</span> {badge.unlockCondition}
          </div>
        )}
      </div>
    </div>
  </div>
  );
}
