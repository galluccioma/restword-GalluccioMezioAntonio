"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Diamond,
  Star,
  Trophy,
  Clock,
  Check,
  ChevronUp,
  Calendar,
  FileText,
  Award,
  User,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { achievements, allBadges, dailyChallenges, featuredChallenge, recentActivity } from "@/lib/data";
import { BadgeCard } from "@/components/badgeCard";

export default function ChallengesPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const profileStrength = 87;
  const badgeCount = 1; // This would be calculated based on achievements
  const totalBadges = 14;

  return (
    <div className="min-h-screen bg-[#f6f5ff]">
      <BackgroundDecoration />

      <div className="container mx-auto px-4 py-6 max-w-5xl">
        {/* Purple header banner */}
        <div className="bg-restworld min-h-80 flex items-center rounded-lg p-6 mb-8 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-20">
            <div>
              <h1 className="text-2xl font-bold mb-2">Bentornato Mario</h1>
              <p className="text-purple-100">
                Completa le tue sfide giornaliere e porta il tuo profilo al
                livello successivo!
              </p>
            </div>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <div className="bg-white/10 hover:bg-white/30 rounded-lg p-3 text-center min-w-[100px]">
                <div className="text-2xl font-bold">
                  {profileStrength > 0 ? profileStrength : 0}
                </div>
                <div className="text-xs uppercase">Punti</div>
              </div>
              <Link href="/profilo/traguardi">
                <div className="bg-[#d6e450] hover:bg-[#c9d643] text-black rounded-lg p-3 text-center min-w-[100px]">
                  <div className="text-2xl font-bold">
                    {badgeCount}/{totalBadges}
                  </div>
                  <div className="text-xs uppercase">Badge</div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Main content */}
        <Tabs
          defaultValue="overview"
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full bg-[#efedff]">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-[#7641d9] data-[state=active]:text-white">
              Panoramica
            </TabsTrigger>
            <TabsTrigger
              value="daily"
              className="data-[state=active]:bg-[#7641d9] data-[state=active]:text-white">
              Sfide Giornaliere
            </TabsTrigger>
            <TabsTrigger
              value="progress"
              className="data-[state=active]:bg-[#7641d9] data-[state=active]:text-white">
              Progressi
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <OverviewSection />
          </TabsContent>

          <TabsContent value="daily" className="space-y-6">
            <DailyChallengesSection />
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <ProgressSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function BackgroundDecoration() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Decorative elements */}
      <div className="absolute top-20 left-20 w-16 h-16 border-2 border-[#dcd7fe] rounded-full opacity-20" />
      <div className="absolute top-40 right-40 w-8 h-8 border-2 border-[#ba98f9] rounded-full opacity-20" />
      <div className="absolute bottom-60 left-1/4 w-12 h-12 border-2 border-[#d0e124] rounded-full opacity-20" />
      <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-[#d0e124] rounded-full opacity-20" />
      <div className="absolute bottom-40 right-60 w-6 h-6 bg-[#7641d9] rounded-full opacity-10" />

      {/* Squiggly lines */}
      <svg
        className="absolute top-10 left-10 w-32 h-32 text-[#dcd7fe] opacity-20"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10,30 Q30,5 50,30 T90,30"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
      </svg>

      <svg
        className="absolute bottom-20 right-20 w-40 h-40 text-[#c3b0e7] opacity-20"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10,50 Q30,20 50,50 T90,50"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
      </svg>

      <svg
        className="absolute top-1/2 right-1/4 w-24 h-24 text-[#d0e124] opacity-20"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M20,20 Q40,60 60,20 T100,20"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </div>
  );
}

function OverviewSection() {
  const [userStats, setUserStats] = useState({
    daysActive: 24,
    cvsSent: 18,
    profileStrength: 85,
    level: 6,
    points: 560,
    badges: 12,
  });

  return (
    <>
      {/* User level */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <div className="bg-[#7641d9] text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-3">
              {userStats.level}
            </div>
            <div>
              <h3 className="font-semibold text-[#351471]">
                Livello {userStats.level}
              </h3>
              <p className="text-sm text-[#6b7280]">{userStats.points} punti</p>
            </div>
          </div>
          <div className="bg-[#d0e124] rounded-full px-3 py-1 text-sm font-medium text-[#351471]">
            Giorno {userStats.daysActive}
          </div>
        </div>
        <Progress value={65} className="h-2 bg-[#dcd7fe]" />
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-[#6b7280]">
            Livello {userStats.level}
          </span>
          <span className="text-xs text-[#6b7280]">
            Livello {userStats.level + 1}
          </span>
        </div>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center">
          <Calendar className="w-6 h-6 text-[#7641d9] mb-1" />
          <span className="text-lg font-bold text-[#351471]">
            {userStats.daysActive}
          </span>
          <span className="text-xs text-[#6b7280]">Giorni</span>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center">
          <FileText className="w-6 h-6 text-[#7641d9] mb-1" />
          <span className="text-lg font-bold text-[#351471]">
            {userStats.cvsSent}
          </span>
          <span className="text-xs text-[#6b7280]">CV</span>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center">
          <Award className="w-6 h-6 text-[#7641d9] mb-1" />
          <span className="text-lg font-bold text-[#351471]">
            {userStats.badges}
          </span>
          <span className="text-xs text-[#6b7280]">Badge</span>
        </div>
      </div>

      {/* Featured challenge */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="relative">
          <Image
            src="/sfida.png"
            alt="Challenge"
            width={600}
            height={300}
            className="w-full h-[240px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#351471]/80 to-transparent flex flex-col justify-end p-6">
            <h2 className="text-xl font-bold text-white">Sfida in Evidenza</h2>
            <div className="flex items-center text-white mt-2">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2">
                <path
                  d="M19 4H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 2v4M8 2v4M3 10h18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-sm">Giorno {userStats.daysActive}</span>
            </div>
          </div>

          <div className="absolute top-4 right-4 bg-[#d0e124] rounded-full px-3 py-1 flex items-center">
            <Star className="w-4 h-4 text-[#351471] mr-1" />
            <span className="text-xs font-bold text-[#351471]">
              +{featuredChallenge.points} punti
            </span>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-[#351471] mb-2">
            {featuredChallenge.title}
          </h3>
          <p className="text-sm text-[#6b7280] mb-4">
            {featuredChallenge.description}
          </p>

          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-[#351471]">
              Progresso
            </span>
            <span className="text-sm font-medium text-[#351471]">
              {featuredChallenge.progress}/{featuredChallenge.max}
            </span>
          </div>
          <Progress
            value={(featuredChallenge.progress / featuredChallenge.max) * 100}
            className="h-2 bg-[#dcd7fe] mb-4"
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center text-[#ff5252]">
              <Clock className="w-4 h-4 mr-1" />
              <span className="text-sm">
                {featuredChallenge.timeLeft} rimasti
              </span>
            </div>

            <Link href="/jobs">
              <Button
                type="button"
                className="bg-[#7641d9] hover:bg-[#693eb5] text-white">
                Inizia Sfida
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-[#351471] mb-4">
          Attività Recenti
        </h3>

        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div
              key={index}
              className="bg-[#f6f5ff] rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center">
                {activity.type === "cv_sent" ? (
                  <FileText className="w-5 h-5 text-[#7641d9] mr-3" />
                ) : (
                  <User className="w-5 h-5 text-[#7641d9] mr-3" />
                )}
                <div>
                  <div className="text-sm font-medium text-[#351471]">
                    {activity.type === "cv_sent"
                      ? `CV inviato a ${activity.restaurant}`
                      : `Aggiornato ${activity.section}`}
                  </div>
                  <div className="text-xs text-[#6b7280]">{activity.time}</div>
                </div>
              </div>
              <div className="bg-[#efedff] rounded-full px-2 py-1 flex items-center">
                <Star className="w-3 h-3 text-[#7641d9] mr-1" />
                <span className="text-xs font-bold text-[#351471]">
                  +{activity.points}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function DailyChallengesSection() {
  

  const [expandedChallenge, setExpandedChallenge] = useState(null);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-[#351471]">
            Sfide di Oggi
          </h3>
          <div className="bg-[#d0e124] rounded-full px-3 py-1 text-sm font-medium text-[#351471]">
            +115 punti disponibili
          </div>
        </div>

        <div className="space-y-4">
          {dailyChallenges.map((challenge, index) => (
            <div
              key={index}
              className="bg-[#f6f5ff] rounded-xl p-4 transition-all">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() =>
                  setExpandedChallenge(
                    expandedChallenge === index ? null : index
                  )
                }>
                <div className="flex items-center">
                  {challenge.icon === "file" && (
                    <FileText className="w-5 h-5 text-[#7641d9] mr-2" />
                  )}
                  {challenge.icon === "user" && (
                    <User className="w-5 h-5 text-[#7641d9] mr-2" />
                  )}
                  {challenge.icon === "calendar" && (
                    <Calendar className="w-5 h-5 text-[#7641d9] mr-2" />
                  )}
                  <div>
                    <div className="text-sm font-medium text-[#351471]">
                      {challenge.title}
                    </div>
                    <div className="text-xs text-[#6b7280]">
                      {challenge.description}
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-[#dcd7fe] rounded-full px-2 py-1 flex items-center mr-2">
                    <Star className="w-3 h-3 text-[#7641d9] mr-1" />
                    <span className="text-xs font-bold text-[#351471]">
                      +{challenge.points}
                    </span>
                  </div>
                  {expandedChallenge === index ? (
                    <ChevronUp className="w-4 h-4 text-[#6b7280]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#6b7280]" />
                  )}
                </div>
              </div>

              {expandedChallenge === index && (
                <div className="mt-4 pt-4 border-t border-[#dcd7fe]">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-[#6b7280]">Progresso</span>
                    <span className="text-sm font-medium text-[#351471]">
                      {challenge.progress}/{challenge.max}
                    </span>
                  </div>
                  <Progress
                    value={(challenge.progress / challenge.max) * 100}
                    className="h-2 bg-[#dcd7fe] mb-4"
                  />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-[#ff5252]">
                      <Clock className="w-4 h-4 mr-1" />
                      <span className="text-sm">
                        {challenge.timeLeft} rimasti
                      </span>
                    </div>

                    <Link
                      href={
                        challenge.icon === "file"
                          ? "/jobs"
                          : challenge.icon === "user"
                          ? "/profilo"
                          : "/"
                      }>
                      <Button
                        type="button"
                        className="bg-[#7641d9] hover:bg-[#693eb5] text-white">
                        {challenge.icon === "file"
                          ? "Cerca Lavori"
                          : challenge.icon === "user"
                          ? "Completa Profilo"
                          : "Continua"}
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Weekly activity */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-[#351471] mb-4">
          Attività settimanale
        </h3>

        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center mb-1",
                  i < 5
                    ? "bg-[#d0e124] text-[#351471]"
                    : "bg-[#dcd7fe] text-[#6b7280]"
                )}>
                {i + 1}
              </div>
              <span className="text-xs text-[#6b7280]">
                {["L", "M", "M", "G", "V", "S", "D"][i]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function ProgressSection() {
  return (
    <>
      {/* Achievements */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-[#351471] mb-4">Obiettivi</h3>

        <div className="space-y-4">
          {achievements.map((achievement, index) => (
            <div key={index} className="bg-[#f6f5ff] rounded-xl p-4">
              <div className="flex items-center mb-2">
                {achievement.icon === "user" && (
                  <User className="w-5 h-5 text-[#d0e124] mr-2" />
                )}
                {achievement.icon === "file" && (
                  <FileText className="w-5 h-5 text-[#d0e124] mr-2" />
                )}
                {achievement.icon === "calendar" && (
                  <Calendar className="w-5 h-5 text-[#d0e124] mr-2" />
                )}
                <div>
                  <div className="text-sm font-medium text-[#351471]">
                    {achievement.name}
                  </div>
                  <div className="text-xs text-[#6b7280]">
                    {achievement.description}
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <Progress
                  value={(achievement.progress / achievement.max) * 100}
                  className="h-2 flex-1 mr-3 bg-[#dcd7fe]"
                />
                <span className="text-xs font-medium text-[#351471]">
                  {achievement.progress}/{achievement.max}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Badges */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-[#351471] mb-4">
          Traguardi raggiunti
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allBadges
            .filter((badge) => badge.category === "profile")
            .map((badge) => (
              <BadgeCard unlocked={true} key={badge.id} badge={badge} />
            ))}
        </div>
      </div>

      {/* Level progress */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-[#351471] mb-4">Livelli</h3>

        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => {
            const level = 6 - i;
            const isCurrentLevel = level === 6;
            const isCompleted = level < 6;

            return (
              <div
                key={i}
                className={cn(
                  "bg-[#f6f5ff] rounded-xl p-4 flex items-center",
                  isCurrentLevel && "border-2 border-[#7641d9]"
                )}>
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-bold mr-3",
                    isCompleted
                      ? "bg-[#d0e124] text-[#351471]"
                      : isCurrentLevel
                      ? "bg-[#7641d9] text-white"
                      : "bg-[#dcd7fe] text-[#351471]"
                  )}>
                  {level}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-[#351471]">
                      Livello {level}
                    </span>
                    {isCompleted && (
                      <Check className="w-4 h-4 text-[#d0e124]" />
                    )}
                  </div>
                  <Progress
                    value={isCompleted ? 100 : isCurrentLevel ? 65 : 0}
                    className="h-2 bg-[#dcd7fe]"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}