import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Briefcase, DollarSign, Info } from "lucide-react"

export default function PreferencesSection({ data }) {
  if (!data) return null

  const getContractTypeLabel = (type) => {
    const types = {
      "full-time": "Tempo pieno",
      "part-time": "Part-time",
      seasonal: "Stagionale",
      temporary: "Temporaneo",
      freelance: "Freelance",
    }
    return types[type] || type
  }

  const getAvailabilityLabel = (availability) => {
    const options = {
      immediate: "Immediata",
      "1-week": "Entro 1 settimana",
      "2-weeks": "Entro 2 settimane",
      "1-month": "Entro 1 mese",
      negotiable: "Da concordare",
    }
    return options[availability] || availability
  }

  const getJobTypeLabel = (type) => {
    const types = {
      restaurant: "Ristorante",
      hotel: "Hotel",
      bar: "Bar/Caffetteria",
      catering: "Catering",
      pastry: "Pasticceria",
    }
    return types[type] || type
  }

  return (
    <Card>
      <CardContent className="pt-6">
        {data.jobType && data.jobType.length > 0 && (
          <div className="mb-6">
            <h4 className="font-medium text-gray-500 text-sm mb-2">Tipo di attività</h4>
            <div className="flex flex-wrap gap-2">
              {data.jobType.map((type) => (
                <Badge key={type} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  {getJobTypeLabel(type)}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.position && (
            <div className="flex items-start gap-3">
              <Briefcase className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-500 text-sm">Posizione desiderata</h4>
                <p>{data.position}</p>
              </div>
            </div>
          )}

          {data.location && (
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-500 text-sm">Località preferita</h4>
                <p>{data.location}</p>
              </div>
            </div>
          )}

          {data.contractType && (
            <div className="flex items-start gap-3">
              <Briefcase className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-500 text-sm">Tipo di contratto</h4>
                <p>{getContractTypeLabel(data.contractType)}</p>
              </div>
            </div>
          )}

          {data.availability && (
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-500 text-sm">Disponibilità</h4>
                <p>{getAvailabilityLabel(data.availability)}</p>
              </div>
            </div>
          )}

          {data.salary && (
            <div className="flex items-start gap-3">
              <DollarSign className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-500 text-sm">Retribuzione desiderata</h4>
                <p>{data.salary}</p>
              </div>
            </div>
          )}
        </div>

        {data.additionalInfo && (
          <div className="mt-6 pt-6 border-t flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-gray-500 text-sm mb-2">Informazioni aggiuntive</h4>
              <p>{data.additionalInfo}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

