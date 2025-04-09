"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Edit, Trash2, Check, X } from "lucide-react"
import { updateEducation, deleteEducation } from "@/lib/data"

interface Education {
  id: string
  institution: string
  degree: string
  field?: string
  startDate: string
  endDate?: string
  current?: boolean
  description?: string
}

interface EditableEducationProps {
  education: Education
  onUpdate?: () => void
}

export default function EditableEducation({ education, onUpdate }: EditableEducationProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<Education>(education)

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
      await updateEducation(education.id, formData)
      setIsEditing(false)
      if (onUpdate) onUpdate()
    } catch (error) {
      console.error("Error updating education:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      await deleteEducation(education.id)
      if (onUpdate) onUpdate()
    } catch (error) {
      console.error("Error deleting education:", error)
    } finally {
      setIsLoading(false)
      setIsDeleting(false)
    }
  }

  const handleCancel = () => {
    setFormData(education)
    setIsEditing(false)
    setIsDeleting(false)
  }

  if (isEditing) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium">Modifica formazione</h4>
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
              <Label htmlFor="institution">Istituto/Università</Label>
              <Input
                id="institution"
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
            <div>
              <Label htmlFor="degree">Titolo di studio</Label>
              <Input id="degree" name="degree" value={formData.degree} onChange={handleChange} disabled={isLoading} />
            </div>
            <div>
              <Label htmlFor="field">Campo di studio</Label>
              <Input
                id="field"
                name="field"
                value={formData.field || ""}
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
              <Label htmlFor="current">In corso</Label>
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
            <p className="mb-4">Sei sicuro di voler eliminare questa formazione?</p>
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
            <h4 className="font-medium">
              {education.degree} {education.field && `in ${education.field}`}
            </h4>
            <p className="text-purple-600">{education.institution}</p>
            <p className="text-sm text-gray-500">
              {education.startDate} - {education.current ? "In corso" : education.endDate}
            </p>
            {education.description && <p className="mt-2 text-sm">{education.description}</p>}
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

