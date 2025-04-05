"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, X } from "lucide-react"
import { addWorkExperience } from "@/lib/data"

interface AddExperienceFormProps {
  onAdd?: () => void
  onCancel?: () => void
}

export default function AddExperienceForm({ onAdd, onCancel }: AddExperienceFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    position: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await addWorkExperience(formData)
      if (onAdd) onAdd()
    } catch (error) {
      console.error("Error adding experience:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-medium">Aggiungi esperienza</h4>
          {onCancel && (
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="h-8 w-8"
              onClick={onCancel}
              disabled={isLoading}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="position">Posizione *</Label>
              <Input
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>
            <div>
              <Label htmlFor="company">Azienda *</Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
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
              <Label htmlFor="startDate">Data inizio *</Label>
              <Input
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
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
                  value={formData.endDate}
                  onChange={handleChange}
                  disabled={isLoading || formData.current}
                />
              </div>
            )}
          </div>

          <div className="mb-4">
            <Label htmlFor="description">Descrizione</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              disabled={isLoading}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700"
            disabled={isLoading || !formData.position || !formData.company || !formData.startDate}
          >
            <Plus className="h-4 w-4 mr-2" />
            Aggiungi esperienza
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

