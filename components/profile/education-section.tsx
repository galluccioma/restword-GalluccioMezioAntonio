import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Calendar } from "lucide-react"

export default function EducationSection({ data }) {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-gray-500 italic">Nessuna formazione aggiunta.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {data.map((education) => (
        <Card key={education.id}>
          <CardContent className="pt-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold">
                {education.degree} {education.field && `in ${education.field}`}
              </h3>

              <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 text-sm text-gray-600 mt-1">
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span>{education.institution}</span>
                </div>

                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {education.startDate} - {education.current ? "In corso" : education.endDate}
                  </span>
                </div>
              </div>
            </div>

            {education.description && <p className="text-gray-700">{education.description}</p>}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

