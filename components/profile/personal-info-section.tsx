import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Mail, Phone, MapPin } from "lucide-react"

export default function PersonalInfoSection({ data }) {
  if (!data) return null

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.dateOfBirth && (
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-500 text-sm">Data di nascita</h4>
                <p>{data.dateOfBirth}</p>
              </div>
            </div>
          )}

          {data.email && (
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-500 text-sm">Email</h4>
                <p>{data.email}</p>
              </div>
            </div>
          )}

          {data.phone && (
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-500 text-sm">Telefono</h4>
                <p>{data.phone}</p>
              </div>
            </div>
          )}

          {(data.address || data.city) && (
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-500 text-sm">Indirizzo</h4>
                <p>{[data.address, data.city].filter(Boolean).join(", ")}</p>
              </div>
            </div>
          )}
        </div>

        {data.bio && (
          <div className="mt-6 pt-6 border-t">
            <h4 className="font-medium text-gray-500 text-sm mb-2">Biografia</h4>
            <p>{data.bio}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

