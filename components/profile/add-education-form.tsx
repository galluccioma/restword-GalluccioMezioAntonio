"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, X } from "lucide-react"
import { addEducation } from "@/lib/data"

interface AddEducationFormProps {
  onAdd?: () => void
  onCancel?: () => void
}

export default function AddEducationForm({ onAdd, onCancel }: AddEducationFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    institution: "",
    degree: "",
    field: "",
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
      await addEducation(formData)
      if (onAdd) onAdd()
    } catch (error) {
      console.error("Error adding education:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-medium">Aggiungi formazione</h4>
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
              <Label htmlFor="institution">Istituto/Università *</Label>
              <Input
                id="institution"
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>
            <div>
              <Label htmlFor="degree">Titolo di studio *</Label>
              <Input
                id="degree"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>
            <div>
              <Label htmlFor="field">Campo di studio</Label>
              <Input id="field" name="field" value={formData.field} onChange={handleChange} disabled={isLoading} />
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
              <Label htmlFor="current">In corso</Label>
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
            variant="ghost"
            disabled={isLoading || !formData.institution || !formData.degree || !formData.startDate}
          >
            <Plus className="h-4 w-4 mr-2" />
            Aggiungi formazione
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

