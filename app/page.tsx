import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChefHat, Briefcase, Award } from "lucide-react"

export default function Home() {
  return (
    <div className="flex items-center  h-screen mx-auto bg-restword-secondary px-4 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="font-restword text-5xl md:text-6xl font-bold mb-6">Trova il lavoro perfetto nella ristorazione</h1>
        <p className="text-xl text-gray-600 font-light mb-8">
          Crea il tuo profilo professionale su Restworld e connettiti con i migliori datori di lavoro nel settore
          Ho.Re.Ca.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <Link href="/create-profile">
            <Button size="lg">
              Crea il tuo profilo
            </Button>
          </Link>
          <Link href="/profile">
            <Button size="lg" variant="outline" >
              Visualizza profilo
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

