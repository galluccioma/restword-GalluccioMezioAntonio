import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export default function Header() {
  return (
    <header className="border-b sticky top-0 bg-white z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <div className="relative h-10 w-32">
            <Image src="/images/logo.png" alt="Restworld" width={154} height={40} className="object-contain" />
          </div>
        </Link>

        <nav className="hidden lg:flex items-center space-x-8">
          <div className="relative group">
            <button className="flex items-center text-gray-700 hover:text-purple-600 font-medium">
              Servizi
              <ChevronDown className="h-4 w-4 ml-1" />
            </button>
          </div>

          <div className="relative group">
            <button className="flex items-center text-gray-700 hover:text-purple-600 font-medium">
              Collaborazioni
              <ChevronDown className="h-4 w-4 ml-1" />
            </button>
          </div>

          <Link href="/" className="text-gray-700 hover:text-purple-600 font-medium">
            Investitori
          </Link>

          <div className="relative group">
            <button className="flex items-center text-gray-700 hover:text-purple-600 font-medium">
              Risorse
              <ChevronDown className="h-4 w-4 ml-1" />
            </button>
          </div>

          <Link href="/" className="text-gray-700 hover:text-purple-600 font-medium">
            Chi siamo
          </Link>

          <Link href="/" className="text-gray-700 hover:text-purple-600 font-medium">
            Contatti
          </Link>
        </nav>

        <div className="flex items-center">
        <Link href="/profile">
          <Button className="bg-[#d6e450] hover:bg-[#c9d643] text-black font-medium">Accedi</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

