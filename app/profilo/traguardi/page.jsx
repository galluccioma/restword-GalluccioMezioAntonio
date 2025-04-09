"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { allBadges } from "@/lib/data";
import { BadgeCard } from "@/components/badgeCard";


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
      <div className="bg-restworld min-h-80 flex items-center justify-center rounded-lg p-6 mb-8 text-white">
        <div className="flex flex-col justify-center items-center gap-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">I tuoi Traguardi</h1>
            <div className="text-sm mt-2">
              Hai sbloccato <span className="font-bold">{unlockedCount}</span>{" "}
              badge su <span className="font-bold">{totalCount}</span> (
              {percentUnlocked}%)
            </div>
          </div>
          <div className="flex gap-6">
          <Link href="/profilo/sfide">
            <Button variant="default" className="">
              Affronta le sfide!
            </Button>
          </Link>
          <Link href="/candidatura">
            <Button variant="default" className="">
              Ricerca lavoro
            </Button>
          </Link>
          </div>
        </div>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid grid-cols-3 w-full bg-[#efedff]">
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

        <div className="py-4 bg-[#f6f5ff]">
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