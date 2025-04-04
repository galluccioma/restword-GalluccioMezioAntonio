"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { getUserProfile, getUserChallenges, completeChallenge } from "@/lib/profile-service"
import { ArrowLeft, Star, Calendar, Clock, FileText, Award, Trophy, CheckCircle } from "lucide-react"

export default function ChallengesPage() {
  const [activeTab, setActiveTab] = useState("panoramica")
  const [profile, setProfile] = useState(null)
  const [challenges, setChallenges] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const profileData = await getUserProfile()
        const challengesData = await getUserChallenges()
        setProfile(profileData)
        setChallenges(challengesData)
      } catch (error) {
        console.error("Error loading data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const handleCompleteChallenge = async (challengeId) => {
    await completeChallenge(challengeId)
    setChallenges((prev) =>
      prev.map((challenge) => (challenge.id === challengeId ? { ...challenge, completed: true } : challenge)),
    )
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p>Caricamento sfide...</p>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-purple-600 mb-6">Profilo non trovato</h1>
        <p className="mb-8">Devi creare un profilo prima di accedere alle sfide.</p>
        <Link href="/create-profile">
          <Button className="bg-purple-600 hover:bg-purple-700">Crea il tuo profilo</Button>
        </Link>
      </div>
    )
  }

  // Calculate overall progress
  const completedChallenges = challenges.filter((c) => c.completed).length
  const totalChallenges = challenges.length
  const progressPercentage = totalChallenges > 0 ? Math.round((completedChallenges / totalChallenges) * 100) : 0

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="flex items-center mb-4">
        <Link href="/" className="mr-4">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <div className="h-5 w-5 bg-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">⬥</span>
            </div>
            <span className="ml-1 font-medium">54</span>
          </div>
          <div className="flex items-center">
            <Star className="h-5 w-5 text-yellow-400" />
            <span className="ml-1 font-medium">240</span>
          </div>
          <div className="flex items-center">
            <Trophy className="h-5 w-5 text-purple-600" />
            <span className="ml-1 font-medium">3</span>
          </div>
        </div>
      </div>

      <h1 className="text-2xl font-bold text-purple-900 mb-1">Le tue Sfide</h1>
      <p className="text-gray-600 mb-6">Completa le sfide per guadagnare punti e sbloccare badge</p>

      <div className="mb-6">
        <div className="flex space-x-2 border-b">
          <button
            className={`px-6 py-3 font-medium text-sm ${
              activeTab === "panoramica" ? "border-b-2 border-purple-600 text-purple-600" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("panoramica")}
          >
            Panoramica
          </button>
          <button
            className={`px-6 py-3 font-medium text-sm ${
              activeTab === "progressi" ? "border-b-2 border-purple-600 text-purple-600" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("progressi")}
          >
            Progressi
          </button>
        </div>
      </div>

      {activeTab === "panoramica" && (
        <>
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-600 rounded-full text-white text-xl font-bold mb-4">
                6
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Livello 6</span>
                <span className="text-sm">560 punti</span>
              </div>
              <Progress value={75} className="h-2 bg-gray-200" />
            </CardContent>
          </Card>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <Card className="text-center p-4">
              <div className="flex flex-col items-center">
                <Calendar className="h-6 w-6 text-purple-600 mb-2" />
                <span className="text-2xl font-bold">24</span>
                <span className="text-xs text-gray-500">Giorni</span>
              </div>
            </Card>
            <Card className="text-center p-4">
              <div className="flex flex-col items-center">
                <FileText className="h-6 w-6 text-purple-600 mb-2" />
                <span className="text-2xl font-bold">18</span>
                <span className="text-xs text-gray-500">CV</span>
              </div>
            </Card>
            <Card className="text-center p-4">
              <div className="flex flex-col items-center">
                <Trophy className="h-6 w-6 text-purple-600 mb-2" />
                <span className="text-2xl font-bold">12</span>
                <span className="text-xs text-gray-500">Badge</span>
              </div>
            </Card>
          </div>

          <div className="mb-8">
            <div className="relative mb-6">
              <Card className="p-6 bg-gradient-to-r from-purple-900 to-purple-600 text-white">
                <div className="absolute top-2 right-2 bg-yellow-300 text-black text-xs font-medium px-2 py-0.5 rounded-full flex items-center">
                  <Star className="h-3 w-3 mr-0.5" />
                  <span>+40</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Sfida in Evidenza</h3>
                <div className="flex items-center mb-4">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="text-sm">Giorno 24</span>
                </div>
                <h4 className="font-semibold mb-1">Invia 3 CV oggi</h4>
                <p className="text-sm text-purple-100 mb-4">
                  Invia 3 CV a ristoranti che cercano personale nella tua zona
                </p>
                <div className="mb-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs">Progresso</span>
                    <span className="text-xs">0/3</span>
                  </div>
                  <Progress value={0} className="h-1.5 bg-purple-800" />
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>5 ore rimasti</span>
                </div>
              </Card>
            </div>

            <h3 className="font-semibold text-lg mb-4">Attività Recenti</h3>
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start">
                    <div className="mr-3 mt-1">
                      <FileText className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium">CV inviato a Ristorante Bella Italia</p>
                      <p className="text-sm text-gray-500">2 ore fa</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start">
                    <div className="mr-3 mt-1">
                      <Award className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium">Aggiornato Esperienze di lavoro</p>
                      <p className="text-sm text-gray-500">ieri</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}

      {activeTab === "progressi" && (
        <div className="space-y-6">
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-4">Sfide completate</h3>
            <div className="space-y-4">
              {challenges
                .filter((c) => c.completed)
                .map((challenge) => (
                  <Card key={challenge.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start">
                        <div className="mr-3 mt-1">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <p className="font-medium">{challenge.title}</p>
                            <span className="text-sm font-medium text-purple-600">+{challenge.points} punti</span>
                          </div>
                          <p className="text-sm text-gray-500">{challenge.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Sfide in corso</h3>
            <div className="space-y-4">
              {challenges
                .filter((c) => !c.completed)
                .map((challenge) => (
                  <Card key={challenge.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start">
                        <div className="mr-3 mt-1">
                          <div className="h-5 w-5 rounded-full border-2 border-purple-600"></div>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <p className="font-medium">{challenge.title}</p>
                            <span className="text-sm font-medium text-purple-600">+{challenge.points} punti</span>
                          </div>
                          <p className="text-sm text-gray-500 mb-3">{challenge.description}</p>
                          <Button
                            size="sm"
                            className="bg-purple-600 hover:bg-purple-700 text-sm"
                            onClick={() => handleCompleteChallenge(challenge.id)}
                          >
                            {challenge.actionText || "Completa sfida"}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

