import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-restworld rounded-2xl m-2 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <h2 className="font-restworld text-5xl md:text-6xl font-light mb-6 leading-tight">
              Making
              <br />
              great teams
            </h2>
            <p className="text-purple-200 mb-8 max-w-md">
              Siamo gruppo giovane ed eterogeneo di psicologi, ingegneri, economisti e non solo uniti dalla medesima
              passione: la ristorazione.
            </p>

            <Link href="/profilo" className="inline-block">
              <button className="bg-[#d6e450] hover:bg-[#c9d643] text-black font-medium px-6 py-2 rounded-md">
                Accedi
              </button>
            </Link>

            <div className="mt-12">
              <Image
                src="/images/logo.png"
                alt="Restworld"
                width={154}
                height={40}
                className="object-contain brightness-0 invert"
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-6 uppercase">Business</h3>
            <ul className="space-y-4">
              <li>
                <Link href="#" className="text-purple-200 hover:text-white cursor-not-allowed">
                  Format Innovativo
                </Link>
              </li>
              <li>
                <Link href="#" className="text-purple-200 hover:text-white cursor-not-allowed">
                  Grandi Ristoranti
                </Link>
              </li>
              <li>
                <Link href="#" className="text-purple-200 hover:text-white cursor-not-allowed">
                  Stelle Michelin
                </Link>
              </li>
              <li>
                <Link href="#" className="text-purple-200 hover:text-white cursor-not-allowed">
                  Franchising e Catene
                </Link>
              </li>
              <li>
                <Link href="#" className="text-purple-200 hover:text-white cursor-not-allowed">
                  Piccoli Ristoranti
                </Link>
              </li>
              <li>
                <Link href="#" className="text-purple-200 hover:text-white cursor-not-allowed">
                  Stagionali
                </Link>
              </li>
              <li>
                <Link href="#" className="text-purple-200 hover:text-white cursor-not-allowed">
                  Hotel
                </Link>
              </li>
              <li>
                <Link href="#" className="text-purple-200 hover:text-white cursor-not-allowed">
                  Altre attività
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-6 uppercase">Collaborazioni</h3>
            <ul className="space-y-4">
              <li>
                <Link href="#" className="text-purple-200 hover:text-white cursor-not-allowed">
                  Referral Program
                </Link>
              </li>
              <li>
                <Link href="#" className="text-purple-200 hover:text-white cursor-not-allowed">
                  Ambassador Program
                </Link>
              </li>
              <li>
                <Link href="#" className="text-purple-200 hover:text-white cursor-not-allowed">
                  Lavora con noi
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-6 uppercase">Risorse</h3>
            <ul className="space-y-4">
              <li>
                <Link href="#" className="text-purple-200 hover:text-white cursor-not-allowed">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-purple-200 hover:text-white cursor-not-allowed">
                  Press Release
                </Link>
              </li>
            </ul>

            <h3 className="text-lg font-medium mb-6 mt-10 uppercase">Lavoratori</h3>
            <ul className="space-y-4">
              <li>
                <Link href="#" className="text-purple-200 hover:text-white cursor-not-allowed">
                  Investitori
                </Link>
              </li>
              <li>
                <Link href="#" className="text-purple-200 hover:text-white cursor-not-allowed">
                  Chi Siamo
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

