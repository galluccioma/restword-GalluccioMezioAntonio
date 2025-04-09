import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MapPin, Mail, Phone } from "lucide-react"

export default function ProfileHeader({ profile }) {
  if (!profile || !profile.personal) return null

  const { personal } = profile

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
        <Avatar className="w-24 h-24">
          <AvatarImage src={personal.photo || "/placeholder.svg?height=96&width=96"} alt="Profile photo" />
          <AvatarFallback>
            {personal.firstName?.charAt(0)}
            {personal.lastName?.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold">
            {personal.firstName} {personal.lastName}
          </h2>

          {profile.preferences?.position && (
            <p className="text-gray-600 text-lg mb-2">{profile.preferences.position}</p>
          )}

          <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
            {profile.preferences?.jobType &&
              profile.preferences.jobType.map((type) => (
                <Badge key={type} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  {type === "restaurant" && "Ristorante"}
                  {type === "hotel" && "Hotel"}
                  {type === "bar" && "Bar/Caffetteria"}
                  {type === "catering" && "Catering"}
                  {type === "pastry" && "Pasticceria"}
                </Badge>
              ))}
          </div>

          <div className="flex flex-col md:flex-row gap-4 text-sm text-gray-600">
            {personal.city && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{personal.city}</span>
              </div>
            )}

            {personal.email && (
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                <span>{personal.email}</span>
              </div>
            )}

            {personal.phone && (
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                <span>{personal.phone}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {personal.bio && (
        <div className="mt-6 pt-6 border-t">
          <h3 className="font-semibold mb-2">Chi sono</h3>
          <p className="text-gray-700">{personal.bio}</p>
        </div>
      )}
    </div>
  )
}

