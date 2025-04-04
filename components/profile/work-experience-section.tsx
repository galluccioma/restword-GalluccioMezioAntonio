import { Card, CardContent } from "@/components/ui/card"
import { Building, MapPin, Calendar } from "lucide-react"

export default function WorkExperienceSection({ data }) {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-gray-500 italic">Nessuna esperienza lavorativa aggiunta.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {data.map((experience) => (
        <Card key={experience.id}>
          <CardContent className="pt-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold">{experience.position}</h3>

              <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 text-sm text-gray-600 mt-1">
                <div className="flex items-center gap-1">
                  <Building className="h-4 w-4" />
                  <span>{experience.company}</span>
                </div>

                {experience.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{experience.location}</span>
                  </div>
                )}

                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {experience.startDate} - {experience.current ? "Presente" : experience.endDate}
                  </span>
                </div>
              </div>
            </div>

            {experience.description && <p className="text-gray-700">{experience.description}</p>}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

