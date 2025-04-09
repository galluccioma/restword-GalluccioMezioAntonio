"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit, Check, X } from "lucide-react"
import { updateProfileField } from "@/lib/data"

interface Preferences {
  jobType: string[]
  position: string
  location: string
  contractType: string
  availability: string
  salary: string
  additionalInfo?: string
}

interface EditablePreferencesProps {
  preferences: Preferences
  onUpdate?: () => void
}

export default function EditablePreferences({ preferences, onUpdate }: EditablePreferencesProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<Preferences>(preferences)

  const jobTypes = [
    { id: "restaurant", label: "Ristorante" },
    { id: "hotel", label: "Hotel" },
    { id: "bar", label: "Bar/Caffetteria" },
    { id: "catering", label: "Catering" },
    { id: "pastry", label: "Pasticceria" },
  ]

  const contractTypes = [
    { value: "full-time", label: "Tempo pieno" },
    { value: "part-time", label: "Part-time" },
    { value: "seasonal", label: "Stagionale" },
    { value: "temporary", label: "Temporaneo" },
    { value: "freelance", label: "Freelance" },
  ]

  const availabilityOptions = [
    { value: "immediate", label: "Immediata" },
    { value: "1-week", label: "Entro 1 settimana" },
    { value: "2-weeks", label: "Entro 2 settimane" },
    { value: "1-month", label: "Entro 1 mese" },
    { value: "negotiable", label: "Da concordare" },
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleJobTypeChange = (id, checked) => {
    const updatedJobTypes = checked ? [...formData.jobType, id] : formData.jobType.filter((type) => type !== id)

    setFormData({
      ...formData,
      jobType: updatedJobTypes,
    })
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      await updateProfileField("preferences", formData)
      setIsEditing(false)
      if (onUpdate) onUpdate()
    } catch (error) {
      console.error("Error updating preferences:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setFormData(preferences)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Modifica preferenze lavorative</h3>
            <div className="flex gap-1">
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-green-600"
                onClick={handleSave}
                disabled={isLoading}
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-red-500"
                onClick={handleCancel}
                disabled={isLoading}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <Label>Tipo di attività</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {jobTypes.map((type) => (
                  <div key={type.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={type.id}
                      checked={formData.jobType.includes(type.id)}
                      onCheckedChange={(checked) => handleJobTypeChange(type.id, checked)}
                      disabled={isLoading}
                    />
                    <Label htmlFor={type.id} className="font-normal">
                      {type.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="position">Posizione desiderata</Label>
                <Input
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  placeholder="Es. Chef, Cameriere, Barista"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Località preferita</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Es. Milano, Roma, Torino"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contractType">Tipo di contratto</Label>
                <Select
                  value={formData.contractType}
                  onValueChange={(value) => handleSelectChange("contractType", value)}
                  disabled={isLoading}
                >
                  <SelectTrigger id="contractType">
                    <SelectValue placeholder="Seleziona tipo di contratto" />
                  </SelectTrigger>
                  <SelectContent>
                    {contractTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="availability">Disponibilità</Label>
                <Select
                  value={formData.availability}
                  onValueChange={(value) => handleSelectChange("availability", value)}
                  disabled={isLoading}
                >
                  <SelectTrigger id="availability">
                    <SelectValue placeholder="Seleziona disponibilità" />
                  </SelectTrigger>
                  <SelectContent>
                    {availabilityOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="salary">Retribuzione desiderata</Label>
                <Input
                  id="salary"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="Es. €1500-2000 mensili"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalInfo">Informazioni aggiuntive</Label>
              <Textarea
                id="additionalInfo"
                name="additionalInfo"
                value={formData.additionalInfo || ""}
                onChange={handleChange}
                placeholder="Altre preferenze o requisiti per il tuo prossimo lavoro..."
                rows={4}
                disabled={isLoading}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

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
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Preferenze Lavorative</h3>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="h-8 w-8 text-purple-600"
            onClick={() => setIsEditing(true)}
          >
            <Edit className="h-4 w-4" />
          </Button>
        </div>

        {preferences.jobType && preferences.jobType.length > 0 && (
          <div className="mb-6">
            <h4 className="font-medium text-gray-500 text-sm mb-2">Tipo di attività</h4>
            <div className="flex flex-wrap gap-2">
              {preferences.jobType.map((type) => (
                <span key={type} className="skill-tag">
                  {getJobTypeLabel(type)}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {preferences.position && (
            <div>
              <h4 className="font-medium text-gray-500 text-sm mb-1">Posizione desiderata</h4>
              <p>{preferences.position}</p>
            </div>
          )}

          {preferences.location && (
            <div>
              <h4 className="font-medium text-gray-500 text-sm mb-1">Località preferita</h4>
              <p>{preferences.location}</p>
            </div>
          )}

          {preferences.contractType && (
            <div>
              <h4 className="font-medium text-gray-500 text-sm mb-1">Tipo di contratto</h4>
              <p>{getContractTypeLabel(preferences.contractType)}</p>
            </div>
          )}

          {preferences.availability && (
            <div>
              <h4 className="font-medium text-gray-500 text-sm mb-1">Disponibilità</h4>
              <p>{getAvailabilityLabel(preferences.availability)}</p>
            </div>
          )}

          {preferences.salary && (
            <div>
              <h4 className="font-medium text-gray-500 text-sm mb-1">Retribuzione desiderata</h4>
              <p>{preferences.salary}</p>
            </div>
          )}
        </div>

        {preferences.additionalInfo && (
          <div className="mt-6 pt-6 border-t">
            <h4 className="font-medium text-gray-500 text-sm mb-2">Informazioni aggiuntive</h4>
            <p>{preferences.additionalInfo}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

