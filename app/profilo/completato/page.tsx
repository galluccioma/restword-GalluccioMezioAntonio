"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getUserProfile } from "@/lib/data"
import { CheckCircle, Star, Trophy } from "lucide-react"
import {ConfettiEffect} from "./confetti"

export default function ProfileSuccessPage() {
  const [profile, setProfile] = useState(null)

  const profileStrength = 90
  const badgeCount = 8 // This would be calculated based on achievements
  const totalBadges = 14

  useEffect(() => {
    const loadProfile = async () => {
      const data = await getUserProfile()
      setProfile(data)
    }

    loadProfile()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
         <ConfettiEffect />
      <div className="max-w-3xl mx-auto">
        
        {/* Purple Background Header */}
        <div className="bg-restworld min-h-80 flex items-center rounded-lg p-6 mb-8 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-20">
            <div>
              <h1 className="text-2xl font-bold mb-2">Crea il tuo profilo Restworld</h1>
              <p className="text-purple-100">
                Completa il tuo profilo per aumentare le tue possibilità di trovare il lavoro perfetto
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

        <div className="bg-white rounded-lg shadow-md p-8 mb-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>

          <h2 className="text-2xl font-bold mb-2">Profilo pubblicato con successo!</h2>
          <p className="text-purple-600 font-medium mb-6">Hai raggiunto il grado di: <span className="font-bold">Masterchef ⭐</span></p>

          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Hai iniziato il tuo percorso nel mondo della ristorazione. I recruiter ti contatteranno presto con
            opportunità di lavoro adatte alle tue preferenze.
          </p>

          <div className="border rounded-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <Trophy className="h-5 w-5 text-purple-600 mr-2" />
                <span className="font-medium">Il tuo punteggio</span>
              </div>
              <span className="text-2xl font-bold text-purple-600">100</span>
            </div>

            <div className="flex items-center justify-between py-2 border-b">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 mr-2" />
                <span>Livello 1</span>
              </div>
              <span className="text-sm text-gray-500">0/20 punti</span>
            </div>

            <div className="flex items-center justify-between py-2 border-b">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-yellow-400 rounded-sm mr-2"></div>
                <span>Badge sbloccati</span>
              </div>
              <span className="text-sm text-gray-500">1/14</span>
            </div>

            <div className="pt-4">
              <p className="text-center text-purple-600 font-medium">Bonus completamento</p>
              <p className="text-center text-sm text-gray-500">+100 punti aggiunti al tuo profilo!</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/profilo/sfide">
              <Button variant="default">Affronta nuove sfide</Button>
            </Link>
            <Link href="/profilo">
              <Button
                variant="outline"
                className="w-full sm:w-auto border-purple-600 text-purple-600 hover:bg-purple-50"
              >
                Visualizza profilo
              </Button>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="font-medium mb-4">Prossimi passi:</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <div className="mr-2 mt-0.5">•</div>
              <span>Mantieni il tuo profilo aggiornato come un menu stagionale</span>
            </li>
            <li className="flex items-start">
              <div className="mr-2 mt-0.5">•</div>
              <span>Controlla regolarmente le notifiche per nuove opportunità</span>
            </li>
            <li className="flex items-start">
              <div className="mr-2 mt-0.5">•</div>
              <span>Esplora le offerte di lavoro disponibili nella sezione "Offerte"</span>
            </li>
            <li className="flex items-start">
              <div className="mr-2 mt-0.5">•</div>
              <span>Completa eventuali valutazioni delle competenze per aumentare la visibilità</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

