"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Edit, Trash2, Check, X } from "lucide-react"
import { updateWorkExperience, deleteWorkExperience } from "@/lib/data"

interface Experience {
  id: string
  position: string
  company: string
  location: string
  startDate: string
  endDate?: string
  current?: boolean
  description?: string
}

interface EditableExperienceProps {
  experience: Experience
  onUpdate?: () => void
}

export default function EditableExperience({ experience, onUpdate }: EditableExperienceProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<Experience>(experience)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      await updateWorkExperience(experience.id, formData)
      setIsEditing(false)
      if (onUpdate) onUpdate()
    } catch (error) {
      console.error("Error updating experience:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      await deleteWorkExperience(experience.id)
      if (onUpdate) onUpdate()
    } catch (error) {
      console.error("Error deleting experience:", error)
    } finally {
      setIsLoading(false)
      setIsDeleting(false)
    }
  }

  const handleCancel = () => {
    setFormData(experience)
    setIsEditing(false)
    setIsDeleting(false)
  }

  if (isEditing) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium">Modifica esperienza</h4>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="position">Posizione</Label>
              <Input
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
            <div>
              <Label htmlFor="company">Azienda</Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
            <div>
              <Label htmlFor="location">Località</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
            <div>
              <Label htmlFor="startDate">Data inizio</Label>
              <Input
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="current"
                name="current"
                checked={formData.current}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    current: checked === true,
                  })
                }
                disabled={isLoading}
              />
              <Label htmlFor="current">Lavoro attuale</Label>
            </div>
            {!formData.current && (
              <div>
                <Label htmlFor="endDate">Data fine</Label>
                <Input
                  id="endDate"
                  name="endDate"
                  value={formData.endDate || ""}
                  onChange={handleChange}
                  disabled={isLoading || formData.current}
                />
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="description">Descrizione</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              rows={3}
              disabled={isLoading}
            />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (isDeleting) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="text-center">
            <p className="mb-4">Sei sicuro di voler eliminare questa esperienza?</p>
            <div className="flex justify-center gap-4">
              <Button variant="alert" onClick={handleDelete} disabled={isLoading}>
                Elimina
              </Button>
              <Button variant="outline" onClick={handleCancel} disabled={isLoading}>
                Annulla
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="flex gap-4 group">
      <div className="w-12 h-12 bg-gray-200 rounded-md flex-shrink-0"></div>
      <div className="flex-1">
        <div className="flex justify-between">
          <div>
            <h4 className="font-medium">{experience.position}</h4>
            <p className="text-purple-600">{experience.company}</p>
            <p className="text-sm text-gray-500">
              {experience.startDate} - {experience.current ? "Presente" : experience.endDate}
            </p>
            <p className="text-sm text-gray-500">{experience.location}</p>
            {experience.description && <p className="mt-2 text-sm">{experience.description}</p>}
          </div>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-purple-600"
              onClick={() => setIsEditing(true)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-red-500"
              onClick={() => setIsDeleting(true)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

