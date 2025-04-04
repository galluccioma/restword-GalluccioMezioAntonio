"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle } from "lucide-react"

export default function ReviewForm({ data }) {
  // Calculate profile completeness
  const calculateCompleteness = () => {
    const sections = [
      // Personal info
      !!data.personal.firstName && !!data.personal.lastName,
      !!data.personal.email,
      !!data.personal.phone,
      !!data.personal.city,
      !!data.personal.photo,

      // Work experience
      data.workExperience.length > 0,

      // Education
      data.education.length > 0,

      // Preferences
      !!data.preferences.position,
      data.preferences.jobType && data.preferences.jobType.length > 0,

      // CV
      data.cv && data.cv.length > 0,
    ]

    const completedSections = sections.filter(Boolean).length
    return Math.round((completedSections / sections.length) * 100)
  }

  const completeness = calculateCompleteness()

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Revisione del profilo</h2>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium">Completezza del profilo</h3>
          <span className="text-lg font-semibold">{completeness}%</span>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {data.personal.firstName && data.personal.lastName ? (
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              ) : (
                <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
              )}
              <span>Informazioni personali</span>
            </div>
            <Badge variant={data.personal.firstName && data.personal.lastName ? "success" : "outline"}>
              {data.personal.firstName && data.personal.lastName ? "Completato" : "Incompleto"}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {data.workExperience.length > 0 ? (
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              ) : (
                <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
              )}
              <span>Esperienze lavorative</span>
            </div>
            <Badge variant={data.workExperience.length > 0 ? "success" : "outline"}>
              {data.workExperience.length > 0 ? "Completato" : "Incompleto"}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {data.education.length > 0 ? (
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              ) : (
                <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
              )}
              <span>Formazione</span>
            </div>
            <Badge variant={data.education.length > 0 ? "success" : "outline"}>
              {data.education.length > 0 ? "Completato" : "Incompleto"}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {data.preferences.position && data.preferences.jobType && data.preferences.jobType.length > 0 ? (
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              ) : (
                <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
              )}
              <span>Preferenze lavorative</span>
            </div>
            <Badge
              variant={
                data.preferences.position && data.preferences.jobType && data.preferences.jobType.length > 0
                  ? "success"
                  : "outline"
              }
            >
              {data.preferences.position && data.preferences.jobType && data.preferences.jobType.length > 0
                ? "Completato"
                : "Incompleto"}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {data.cv && data.cv.length > 0 ? (
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              ) : (
                <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
              )}
              <span>Curriculum Vitae</span>
            </div>
            <Badge variant={data.cv && data.cv.length > 0 ? "success" : "outline"}>
              {data.cv && data.cv.length > 0 ? "Completato" : "Incompleto"}
            </Badge>
          </div>
        </div>
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <h3 className="font-medium mb-4">Anteprima del profilo</h3>

          <div className="flex items-center gap-4 mb-6">
            <Avatar className="h-16 w-16">
              <AvatarImage src={data.personal.photo} alt="Profile" />
              <AvatarFallback>
                {data.personal.firstName?.charAt(0) || ""}
                {data.personal.lastName?.charAt(0) || ""}
              </AvatarFallback>
            </Avatar>

            <div>
              <h4 className="text-lg font-semibold">
                {data.personal.firstName} {data.personal.lastName}
              </h4>
              <p className="text-purple-600">{data.preferences.position || "Chef"}</p>
              <p className="text-sm text-gray-500">{data.personal.city || ""}</p>
            </div>
          </div>

          {data.workExperience.length > 0 && (
            <div className="mb-4">
              <h5 className="font-medium text-sm text-gray-500 mb-2">Ultima esperienza lavorativa</h5>
              <p className="font-medium">{data.workExperience[0].position}</p>
              <p>{data.workExperience[0].company}</p>
            </div>
          )}

          {data.education.length > 0 && (
            <div className="mb-4">
              <h5 className="font-medium text-sm text-gray-500 mb-2">Formazione</h5>
              <p className="font-medium">
                {data.education[0].degree} {data.education[0].field && `in ${data.education[0].field}`}
              </p>
              <p>{data.education[0].institution}</p>
            </div>
          )}

          {data.preferences.jobType && data.preferences.jobType.length > 0 && (
            <div>
              <h5 className="font-medium text-sm text-gray-500 mb-2">Preferenze</h5>
              <div className="flex flex-wrap gap-2">
                {data.preferences.jobType.map((type, index) => (
                  <span key={index} className="skill-tag">
                    {type === "restaurant" && "Ristorante"}
                    {type === "hotel" && "Hotel"}
                    {type === "bar" && "Bar/Caffetteria"}
                    {type === "catering" && "Catering"}
                    {type === "pastry" && "Pasticceria"}
                  </span>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start">
          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <p className="font-medium text-green-800">Pronto per pubblicare!</p>
            <p className="text-sm text-green-700 mt-1">
              Il tuo profilo è pronto per essere pubblicato. Una volta pubblicato, i recruiter potranno visualizzarlo e
              contattarti per opportunità di lavoro.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

