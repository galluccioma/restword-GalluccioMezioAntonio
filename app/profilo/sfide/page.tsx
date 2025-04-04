// "use client"

// import { useEffect, useState } from "react"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Progress } from "@/components/ui/progress"
// import { getUserProfile, getUserChallenges, completeChallenge } from "@/lib/profile-service"
// import { ArrowLeft, Star, Calendar, Clock, FileText, Award, Trophy, CheckCircle } from "lucide-react"

// export default function ChallengesPage() {
//   const [activeTab, setActiveTab] = useState("panoramica")
//   const [profile, setProfile] = useState(null)
//   const [challenges, setChallenges] = useState([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const profileData = await getUserProfile()
//         const challengesData = await getUserChallenges()
//         setProfile(profileData)
//         setChallenges(challengesData)
//       } catch (error) {
//         console.error("Error loading data:", error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     loadData()
//   }, [])

//   const handleCompleteChallenge = async (challengeId) => {
//     await completeChallenge(challengeId)
//     setChallenges((prev) =>
//       prev.map((challenge) => (challenge.id === challengeId ? { ...challenge, completed: true } : challenge)),
//     )
//   }

//   if (loading) {
//     return (
//       <div className="container mx-auto px-4 py-12 text-center">
//         <p>Caricamento sfide...</p>
//       </div>
//     )
//   }

//   if (!profile) {
//     return (
//       <div className="container mx-auto px-4 py-12 text-center">
//         <h1 className="text-3xl font-bold text-purple-600 mb-6">Profilo non trovato</h1>
//         <p className="mb-8">Devi creare un profilo prima di accedere alle sfide.</p>
//         <Link href="/creazione-profilo">
//           <Button className="bg-purple-600 hover:bg-purple-700">Crea il tuo profilo</Button>
//         </Link>
//       </div>
//     )
//   }

//   // Calculate overall progress
//   const completedChallenges = challenges.filter((c) => c.completed).length
//   const totalChallenges = challenges.length
//   const progressPercentage = totalChallenges > 0 ? Math.round((completedChallenges / totalChallenges) * 100) : 0

//   return (
//     <div className="container mx-auto px-4 py-8 max-w-3xl">
//       <div className="flex items-center mb-4">
//         <Link href="/" className="mr-4">
//           <Button variant="ghost" size="icon" className="h-8 w-8">
//             <ArrowLeft className="h-4 w-4" />
//           </Button>
//         </Link>
//         <div className="flex items-center gap-4">
//           <div className="flex items-center">
//             <div className="h-5 w-5 bg-purple-600 rounded-full flex items-center justify-center">
//               <span className="text-white text-xs">⬥</span>
//             </div>
//             <span className="ml-1 font-medium">54</span>
//           </div>
//           <div className="flex items-center">
//             <Star className="h-5 w-5 text-yellow-400" />
//             <span className="ml-1 font-medium">240</span>
//           </div>
//           <div className="flex items-center">
//             <Trophy className="h-5 w-5 text-purple-600" />
//             <span className="ml-1 font-medium">3</span>
//           </div>
//         </div>
//       </div>

//       <h1 className="text-2xl font-bold text-purple-900 mb-1">Le tue Sfide</h1>
//       <p className="text-gray-600 mb-6">Completa le sfide per guadagnare punti e sbloccare badge</p>

//       <div className="mb-6">
//         <div className="flex space-x-2 border-b">
//           <button
//             className={`px-6 py-3 font-medium text-sm ${
//               activeTab === "panoramica" ? "border-b-2 border-purple-600 text-purple-600" : "text-gray-500"
//             }`}
//             onClick={() => setActiveTab("panoramica")}
//           >
//             Panoramica
//           </button>
//           <button
//             className={`px-6 py-3 font-medium text-sm ${
//               activeTab === "progressi" ? "border-b-2 border-purple-600 text-purple-600" : "text-gray-500"
//             }`}
//             onClick={() => setActiveTab("progressi")}
//           >
//             Progressi
//           </button>
//         </div>
//       </div>

//       {activeTab === "panoramica" && (
//         <>
//           <Card className="mb-8">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-center w-12 h-12 bg-purple-600 rounded-full text-white text-xl font-bold mb-4">
//                 6
//               </div>
//               <div className="flex justify-between items-center mb-2">
//                 <span className="text-sm font-medium">Livello 6</span>
//                 <span className="text-sm">560 punti</span>
//               </div>
//               <Progress value={75} className="h-2 bg-gray-200" />
//             </CardContent>
//           </Card>

//           <div className="grid grid-cols-3 gap-4 mb-8">
//             <Card className="text-center p-4">
//               <div className="flex flex-col items-center">
//                 <Calendar className="h-6 w-6 text-purple-600 mb-2" />
//                 <span className="text-2xl font-bold">24</span>
//                 <span className="text-xs text-gray-500">Giorni</span>
//               </div>
//             </Card>
//             <Card className="text-center p-4">
//               <div className="flex flex-col items-center">
//                 <FileText className="h-6 w-6 text-purple-600 mb-2" />
//                 <span className="text-2xl font-bold">18</span>
//                 <span className="text-xs text-gray-500">CV</span>
//               </div>
//             </Card>
//             <Card className="text-center p-4">
//               <div className="flex flex-col items-center">
//                 <Trophy className="h-6 w-6 text-purple-600 mb-2" />
//                 <span className="text-2xl font-bold">12</span>
//                 <span className="text-xs text-gray-500">Badge</span>
//               </div>
//             </Card>
//           </div>

//           <div className="mb-8">
//             <div className="relative mb-6">
//               <Card className="p-6 bg-gradient-to-r from-purple-900 to-purple-600 text-white">
//                 <div className="absolute top-2 right-2 bg-yellow-300 text-black text-xs font-medium px-2 py-0.5 rounded-full flex items-center">
//                   <Star className="h-3 w-3 mr-0.5" />
//                   <span>+40</span>
//                 </div>
//                 <h3 className="text-xl font-bold mb-2">Sfida in Evidenza</h3>
//                 <div className="flex items-center mb-4">
//                   <Calendar className="h-4 w-4 mr-2" />
//                   <span className="text-sm">Giorno 24</span>
//                 </div>
//                 <h4 className="font-semibold mb-1">Invia 3 CV oggi</h4>
//                 <p className="text-sm text-purple-100 mb-4">
//                   Invia 3 CV a ristoranti che cercano personale nella tua zona
//                 </p>
//                 <div className="mb-2">
//                   <div className="flex justify-between items-center mb-1">
//                     <span className="text-xs">Progresso</span>
//                     <span className="text-xs">0/3</span>
//                   </div>
//                   <Progress value={0} className="h-1.5 bg-purple-800" />
//                 </div>
//                 <div className="flex items-center text-sm">
//                   <Clock className="h-4 w-4 mr-1" />
//                   <span>5 ore rimasti</span>
//                 </div>
//               </Card>
//             </div>

//             <h3 className="font-semibold text-lg mb-4">Attività Recenti</h3>
//             <div className="space-y-4">
//               <Card>
//                 <CardContent className="p-4">
//                   <div className="flex items-start">
//                     <div className="mr-3 mt-1">
//                       <FileText className="h-5 w-5 text-purple-600" />
//                     </div>
//                     <div>
//                       <p className="font-medium">CV inviato a Ristorante Bella Italia</p>
//                       <p className="text-sm text-gray-500">2 ore fa</p>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardContent className="p-4">
//                   <div className="flex items-start">
//                     <div className="mr-3 mt-1">
//                       <Award className="h-5 w-5 text-purple-600" />
//                     </div>
//                     <div>
//                       <p className="font-medium">Aggiornato Esperienze di lavoro</p>
//                       <p className="text-sm text-gray-500">ieri</p>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         </>
//       )}

//       {activeTab === "progressi" && (
//         <div className="space-y-6">
//           <div className="mb-6">
//             <h3 className="font-semibold text-lg mb-4">Sfide completate</h3>
//             <div className="space-y-4">
//               {challenges
//                 .filter((c) => c.completed)
//                 .map((challenge) => (
//                   <Card key={challenge.id}>
//                     <CardContent className="p-4">
//                       <div className="flex items-start">
//                         <div className="mr-3 mt-1">
//                           <CheckCircle className="h-5 w-5 text-green-500" />
//                         </div>
//                         <div className="flex-1">
//                           <div className="flex justify-between">
//                             <p className="font-medium">{challenge.title}</p>
//                             <span className="text-sm font-medium text-purple-600">+{challenge.points} punti</span>
//                           </div>
//                           <p className="text-sm text-gray-500">{challenge.description}</p>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//             </div>
//           </div>

//           <div>
//             <h3 className="font-semibold text-lg mb-4">Sfide in corso</h3>
//             <div className="space-y-4">
//               {challenges
//                 .filter((c) => !c.completed)
//                 .map((challenge) => (
//                   <Card key={challenge.id}>
//                     <CardContent className="p-4">
//                       <div className="flex items-start">
//                         <div className="mr-3 mt-1">
//                           <div className="h-5 w-5 rounded-full border-2 border-purple-600"></div>
//                         </div>
//                         <div className="flex-1">
//                           <div className="flex justify-between">
//                             <p className="font-medium">{challenge.title}</p>
//                             <span className="text-sm font-medium text-purple-600">+{challenge.points} punti</span>
//                           </div>
//                           <p className="text-sm text-gray-500 mb-3">{challenge.description}</p>
//                           <Button
//                             size="sm"
//                             className="bg-purple-600 hover:bg-purple-700 text-sm"
//                             onClick={() => handleCompleteChallenge(challenge.id)}
//                           >
//                             {challenge.actionText || "Completa sfida"}
//                           </Button>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }


"use client"

import { useState } from "react"
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
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

export default function ChallengesPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const profileStrength = 87
  const badgeCount = 1 // This would be calculated based on achievements
  const totalBadges = 14

  return (
    <div className="min-h-screen bg-[#f6f5ff]">
      <BackgroundDecoration />

      <div className="container mx-auto px-4 py-6 max-w-5xl">
          {/* Purple header banner */}
          <div className="bg-restword min-h-80 flex items-center rounded-lg p-6 mb-8 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-20">
            <div>
              <h1 className="text-2xl font-bold mb-2">Bentornato Mario</h1>
              <p className="text-purple-100">
                Completa le tue sfide giornaliere e porta il tuo profilo al livello successivo!
              </p>
            </div>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <div className="bg-white/10 hover:bg-white/30 rounded-lg p-3 text-center min-w-[100px]">
                <div className="text-2xl font-bold">{profileStrength > 0 ? profileStrength : 0}</div>
                <div className="text-xs uppercase">Punti</div>
              </div>
              <Link href="/profilo/traguardi">
              <div className="bg-[#d6e450] hover:bg-[#c9d643] text-black rounded-lg p-3 text-center min-w-[100px]">
                <div className="text-2xl font-bold">{badgeCount}/{totalBadges}</div>
                <div className="text-xs uppercase">Badge</div>
              </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Main content */}
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full bg-[#efedff]">
            <TabsTrigger value="overview" className="data-[state=active]:bg-[#7641d9] data-[state=active]:text-white">
              Panoramica
            </TabsTrigger>
            <TabsTrigger value="daily" className="data-[state=active]:bg-[#7641d9] data-[state=active]:text-white">
              Sfide Giornaliere
            </TabsTrigger>
            <TabsTrigger value="progress" className="data-[state=active]:bg-[#7641d9] data-[state=active]:text-white">
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
  )
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
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10,30 Q30,5 50,30 T90,30" stroke="currentColor" strokeWidth="2" fill="none" />
      </svg>

      <svg
        className="absolute bottom-20 right-20 w-40 h-40 text-[#c3b0e7] opacity-20"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10,50 Q30,20 50,50 T90,50" stroke="currentColor" strokeWidth="2" fill="none" />
      </svg>

      <svg
        className="absolute top-1/2 right-1/4 w-24 h-24 text-[#d0e124] opacity-20"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M20,20 Q40,60 60,20 T100,20" stroke="currentColor" strokeWidth="2" fill="none" />
      </svg>
    </div>
  )
}

function OverviewSection() {
  const [userStats, setUserStats] = useState({
    daysActive: 24,
    cvsSent: 18,
    profileStrength: 85,
    level: 6,
    points: 560,
    badges: 12,
  })

  const featuredChallenge = {
    title: "Invia 3 CV oggi",
    description: "Invia 3 CV a ristoranti che cercano personale nella tua zona",
    progress: 1,
    max: 3,
    points: 40,
    timeLeft: "5 ore",
  }

  const recentActivity = [
    {
      type: "cv_sent",
      restaurant: "Ristorante Bella Italia",
      time: "2 ore fa",
      points: 15,
    },
    {
      type: "profile_update",
      section: "Esperienze di lavoro",
      time: "ieri",
      points: 10,
    },
  ]

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
              <h3 className="font-semibold text-[#351471]">Livello {userStats.level}</h3>
              <p className="text-sm text-[#6b7280]">{userStats.points} punti</p>
            </div>
          </div>
          <div className="bg-[#d0e124] rounded-full px-3 py-1 text-sm font-medium text-[#351471]">
            Giorno {userStats.daysActive}
          </div>
        </div>
        <Progress value={65} className="h-2 bg-[#dcd7fe]" />
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-[#6b7280]">Livello {userStats.level}</span>
          <span className="text-xs text-[#6b7280]">Livello {userStats.level + 1}</span>
        </div>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center">
          <Calendar className="w-6 h-6 text-[#7641d9] mb-1" />
          <span className="text-lg font-bold text-[#351471]">{userStats.daysActive}</span>
          <span className="text-xs text-[#6b7280]">Giorni</span>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center">
          <FileText className="w-6 h-6 text-[#7641d9] mb-1" />
          <span className="text-lg font-bold text-[#351471]">{userStats.cvsSent}</span>
          <span className="text-xs text-[#6b7280]">CV</span>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center">
          <Award className="w-6 h-6 text-[#7641d9] mb-1" />
          <span className="text-lg font-bold text-[#351471]">{userStats.badges}</span>
          <span className="text-xs text-[#6b7280]">Badge</span>
        </div>
      </div>

      {/* Featured challenge */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="relative">
          <Image
            src="/placeholder.svg?height=300&width=600"
            alt="Challenge"
            width={600}
            height={300}
            className="w-full h-[160px] object-cover"
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
                className="mr-2"
              >
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
            <span className="text-xs font-bold text-[#351471]">+{featuredChallenge.points} punti</span>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-[#351471] mb-2">{featuredChallenge.title}</h3>
          <p className="text-sm text-[#6b7280] mb-4">{featuredChallenge.description}</p>

          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-[#351471]">Progresso</span>
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
              <span className="text-sm">{featuredChallenge.timeLeft} rimasti</span>
            </div>

            <Link href="/jobs">
              <Button type="button" className="bg-[#7641d9] hover:bg-[#693eb5] text-white">Inizia Sfida</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-[#351471] mb-4">Attività Recenti</h3>

        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div key={index} className="bg-[#f6f5ff] rounded-xl p-4 flex items-center justify-between">
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
                <span className="text-xs font-bold text-[#351471]">+{activity.points}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

function DailyChallengesSection() {
  const dailyChallenges = [
    {
      title: "Invia 3 CV oggi",
      description: "Invia 3 CV a ristoranti che cercano personale",
      points: 40,
      progress: 1,
      max: 3,
      icon: "file",
      timeLeft: "5 ore",
    },
    {
      title: "Completa il tuo profilo",
      description: "Aggiungi le tue esperienze lavorative",
      points: 25,
      progress: 2,
      max: 5,
      icon: "user",
      timeLeft: "12 ore",
    },
    {
      title: "Streak di attività",
      description: "Accedi per 7 giorni consecutivi",
      points: 50,
      progress: 6,
      max: 7,
      icon: "calendar",
      timeLeft: "24 ore",
    },
  ]

  const [expandedChallenge, setExpandedChallenge] = useState(null)

  return (
    <>
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-[#351471]">Sfide di Oggi</h3>
          <div className="bg-[#d0e124] rounded-full px-3 py-1 text-sm font-medium text-[#351471]">
            +115 punti disponibili
          </div>
        </div>

        <div className="space-y-4">
          {dailyChallenges.map((challenge, index) => (
            <div key={index} className="bg-[#f6f5ff] rounded-xl p-4 transition-all">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setExpandedChallenge(expandedChallenge === index ? null : index)}
              >
                <div className="flex items-center">
                  {challenge.icon === "file" && <FileText className="w-5 h-5 text-[#7641d9] mr-2" />}
                  {challenge.icon === "user" && <User className="w-5 h-5 text-[#7641d9] mr-2" />}
                  {challenge.icon === "calendar" && <Calendar className="w-5 h-5 text-[#7641d9] mr-2" />}
                  <div>
                    <div className="text-sm font-medium text-[#351471]">{challenge.title}</div>
                    <div className="text-xs text-[#6b7280]">{challenge.description}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-[#dcd7fe] rounded-full px-2 py-1 flex items-center mr-2">
                    <Star className="w-3 h-3 text-[#7641d9] mr-1" />
                    <span className="text-xs font-bold text-[#351471]">+{challenge.points}</span>
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
                      <span className="text-sm">{challenge.timeLeft} rimasti</span>
                    </div>

                    <Link href={challenge.icon === "file" ? "/jobs" : challenge.icon === "user" ? "/profilo" : "/"}>
                      <Button type="button" className="bg-[#7641d9] hover:bg-[#693eb5] text-white">
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
        <h3 className="text-lg font-semibold text-[#351471] mb-4">Attività settimanale</h3>

        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center mb-1",
                  i < 5 ? "bg-[#d0e124] text-[#351471]" : "bg-[#dcd7fe] text-[#6b7280]",
                )}
              >
                {i + 1}
              </div>
              <span className="text-xs text-[#6b7280]">{["L", "M", "M", "G", "V", "S", "D"][i]}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

function ProgressSection() {
  const achievements = [
    {
      name: "Profilo Completo",
      description: "Completa tutte le sezioni del profilo",
      progress: 85,
      max: 100,
      icon: "user",
    },
    { name: "CV Inviati", description: "Invia 20 CV", progress: 18, max: 20, icon: "file" },
    { name: "Giorni Attivi", description: "Accedi per 30 giorni consecutivi", progress: 24, max: 30, icon: "calendar" },
  ]

  const badges = [
    { name: "Primo CV", description: "Hai inviato il tuo primo CV", earned: true, icon: "file", color: "#d0e124" },
    {
      name: "Profilo Stellare",
      description: "Hai completato il profilo al 100%",
      earned: false,
      icon: "user",
      color: "#7641d9",
    },
    {
      name: "Una Settimana",
      description: "Attivo per 7 giorni consecutivi",
      earned: true,
      icon: "calendar",
      color: "#ff6b6b",
    },
    {
      name: "Esperto di Cucina",
      description: "Hai aggiunto 3 esperienze in cucina",
      earned: true,
      icon: "chef",
      color: "#d0e124",
    },
    {
      name: "Networker",
      description: "Hai connesso il tuo profilo social",
      earned: false,
      icon: "link",
      color: "#7641d9",
    },
    { name: "Candidato Attivo", description: "Hai inviato 10 CV", earned: true, icon: "file", color: "#ff6b6b" },
  ]

  return (
    <>
      {/* Achievements */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-[#351471] mb-4">Obiettivi</h3>

        <div className="space-y-4">
          {achievements.map((achievement, index) => (
            <div key={index} className="bg-[#f6f5ff] rounded-xl p-4">
              <div className="flex items-center mb-2">
                {achievement.icon === "user" && <User className="w-5 h-5 text-[#d0e124] mr-2" />}
                {achievement.icon === "file" && <FileText className="w-5 h-5 text-[#d0e124] mr-2" />}
                {achievement.icon === "calendar" && <Calendar className="w-5 h-5 text-[#d0e124] mr-2" />}
                <div>
                  <div className="text-sm font-medium text-[#351471]">{achievement.name}</div>
                  <div className="text-xs text-[#6b7280]">{achievement.description}</div>
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
        <h3 className="text-lg font-semibold text-[#351471] mb-4">Badge</h3>

        <div className="grid grid-cols-3 gap-4">
          {badges.map((badge, index) => (
            <div
              key={index}
              className={cn(
                "bg-[#f6f5ff] rounded-xl p-4 flex flex-col items-center text-center",
                !badge.earned && "opacity-50",
              )}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-2"
                style={{ backgroundColor: badge.earned ? badge.color : "#dcd7fe" }}
              >
                {badge.icon === "user" && <User className="w-6 h-6 text-white" />}
                {badge.icon === "file" && <FileText className="w-6 h-6 text-white" />}
                {badge.icon === "calendar" && <Calendar className="w-6 h-6 text-white" />}
                {badge.icon === "chef" && (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white"
                  >
                    <path
                      d="M6 13.87C6 13.09 6.27 12.37 6.68 11.81C7.5 10.68 7.97 9.15 7.97 7.39C7.97 4.93 9.2 2.82 11.13 2C11.41 1.86 11.7 2.05 11.7 2.36V9.77"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M18 13.87C18 13.09 17.73 12.37 17.32 11.81C16.5 10.68 16.03 9.15 16.03 7.39C16.03 4.93 14.8 2.82 12.87 2C12.59 1.86 12.3 2.05 12.3 2.36V9.77"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 10C8.69 10 6 12.69 6 16V22H18V16C18 12.69 15.31 10 12 10Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                {badge.icon === "link" && (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white"
                  >
                    <path
                      d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <div className="text-sm font-medium text-[#351471]">{badge.name}</div>
              <div className="text-xs text-[#6b7280] mt-1">{badge.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Level progress */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-[#351471] mb-4">Livelli</h3>

        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => {
            const level = 6 - i
            const isCurrentLevel = level === 6
            const isCompleted = level < 6

            return (
              <div
                key={i}
                className={cn(
                  "bg-[#f6f5ff] rounded-xl p-4 flex items-center",
                  isCurrentLevel && "border-2 border-[#7641d9]",
                )}
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-bold mr-3",
                    isCompleted
                      ? "bg-[#d0e124] text-[#351471]"
                      : isCurrentLevel
                        ? "bg-[#7641d9] text-white"
                        : "bg-[#dcd7fe] text-[#351471]",
                  )}
                >
                  {level}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-[#351471]">Livello {level}</span>
                    {isCompleted && <Check className="w-4 h-4 text-[#d0e124]" />}
                  </div>
                  <Progress
                    value={isCompleted ? 100 : isCurrentLevel ? 65 : 0}
                    className="h-2 bg-[#dcd7fe]"
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

