import { Progress } from "@/components/ui/progress"
import { CheckCircle2, XCircle } from "lucide-react"

export default function ProfileCompleteness({ profile }) {
  if (!profile) return null

  // Define sections to check
  const sections = [
    {
      name: "Dati personali",
      isComplete: profile.personal && profile.personal.firstName && profile.personal.lastName && profile.personal.email,
    },
    {
      name: "Foto profilo",
      isComplete: profile.personal && profile.personal.photo,
    },
    {
      name: "Biografia",
      isComplete: profile.personal && profile.personal.bio,
    },
    {
      name: "Esperienze lavorative",
      isComplete: profile.workExperience && profile.workExperience.length > 0,
    },
    {
      name: "Formazione",
      isComplete: profile.education && profile.education.length > 0,
    },
    {
      name: "Preferenze lavorative",
      isComplete:
        profile.preferences &&
        profile.preferences.position &&
        profile.preferences.jobType &&
        profile.preferences.jobType.length > 0,
    },
  ]

  const completedSections = sections.filter((section) => section.isComplete).length
  const completionPercentage = Math.round((completedSections / sections.length) * 100)

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium">{completionPercentage}% completato</span>
        <span className="text-sm text-gray-500">
          {completedSections}/{sections.length}
        </span>
      </div>

      <Progress value={completionPercentage} className="h-2 mb-6" />

      <div className="space-y-3">
        {sections.map((section, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-sm">{section.name}</span>
            {section.isComplete ? (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            ) : (
              <XCircle className="h-5 w-5 text-gray-300" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

