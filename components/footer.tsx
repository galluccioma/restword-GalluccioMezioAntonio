import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-restword rounded-2xl m-2 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <h2 className="font-restword text-5xl md:text-6xl font-light mb-6 leading-tight">
              Making
              <br />
              great teams
            </h2>
            <p className="text-purple-200 mb-8 max-w-md">
              Siamo gruppo giovane ed eterogeneo di psicologi, ingegneri, economisti e non solo uniti dalla medesima
              passione: la ristorazione.
            </p>

            <Link href="#" className="inline-block">
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
                <Link href="/" className="text-purple-200 hover:text-white">
                  Format Innovativo
                </Link>
              </li>
              <li>
                <Link href="/" className="text-purple-200 hover:text-white">
                  Grandi Ristoranti
                </Link>
              </li>
              <li>
                <Link href="/" className="text-purple-200 hover:text-white">
                  Stelle Michelin
                </Link>
              </li>
              <li>
                <Link href="/" className="text-purple-200 hover:text-white">
                  Franchising e Catene
                </Link>
              </li>
              <li>
                <Link href="/" className="text-purple-200 hover:text-white">
                  Piccoli Ristoranti
                </Link>
              </li>
              <li>
                <Link href="/" className="text-purple-200 hover:text-white">
                  Stagionali
                </Link>
              </li>
              <li>
                <Link href="/" className="text-purple-200 hover:text-white">
                  Hotel
                </Link>
              </li>
              <li>
                <Link href="/" className="text-purple-200 hover:text-white">
                  Altre attività
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-6 uppercase">Collaborazioni</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="text-purple-200 hover:text-white">
                  Referral Program
                </Link>
              </li>
              <li>
                <Link href="/" className="text-purple-200 hover:text-white">
                  Ambassador Program
                </Link>
              </li>
              <li>
                <Link href="/" className="text-purple-200 hover:text-white">
                  Lavora con noi
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-6 uppercase">Risorse</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="text-purple-200 hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/" className="text-purple-200 hover:text-white">
                  Press Release
                </Link>
              </li>
            </ul>

            <h3 className="text-lg font-medium mb-6 mt-10 uppercase">Lavoratori</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="text-purple-200 hover:text-white">
                  Investitori
                </Link>
              </li>
              <li>
                <Link href="/" className="text-purple-200 hover:text-white">
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

