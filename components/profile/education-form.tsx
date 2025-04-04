"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"

export default function EducationForm({ data, updateData }) {
  const [educations, setEducations] = useState([])
  const [newEducation, setNewEducation] = useState({
    id: "",
    institution: "",
    degree: "",
    field: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
  })

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setEducations(data)
    }
  }, [data])

  const handleNewEducationChange = (e) => {
    const { name, value, type, checked } = e.target
    setNewEducation((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const addEducation = () => {
    const educationWithId = {
      ...newEducation,
      id: Date.now().toString(),
    }

    const updatedEducations = [...educations, educationWithId]
    setEducations(updatedEducations)
    updateData(updatedEducations)

    // Reset form
    setNewEducation({
      id: "",
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    })
  }

  const removeEducation = (id) => {
    const updatedEducations = educations.filter((edu) => edu.id !== id)
    setEducations(updatedEducations)
    updateData(updatedEducations)
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">La tua formazione</h3>

        {educations.length === 0 ? (
          <p className="text-gray-500 italic">Nessuna formazione aggiunta.</p>
        ) : (
          <div className="space-y-4">
            {educations.map((edu) => (
              <Card key={edu.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-semibold">
                        {edu.degree} in {edu.field}
                      </h4>
                      <p className="text-gray-600">{edu.institution}</p>
                      <p className="text-sm text-gray-500">
                        {edu.startDate} - {edu.current ? "In corso" : edu.endDate}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeEducation(edu.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                  <p className="text-sm">{edu.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-medium mb-4">Aggiungi nuova formazione</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div className="space-y-2">
            <Label htmlFor="institution">Istituto/Università *</Label>
            <Input
              id="institution"
              name="institution"
              value={newEducation.institution}
              onChange={handleNewEducationChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="degree">Titolo di studio *</Label>
            <Input id="degree" name="degree" value={newEducation.degree} onChange={handleNewEducationChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="field">Campo di studio</Label>
            <Input id="field" name="field" value={newEducation.field} onChange={handleNewEducationChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="startDate">Data inizio *</Label>
            <Input
              id="startDate"
              name="startDate"
              type="date"
              value={newEducation.startDate}
              onChange={handleNewEducationChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="endDate">Data fine</Label>
            <Input
              id="endDate"
              name="endDate"
              type="date"
              value={newEducation.endDate}
              onChange={handleNewEducationChange}
              disabled={newEducation.current}
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="current"
              name="current"
              checked={newEducation.current}
              onChange={handleNewEducationChange}
              className="rounded border-gray-300"
            />
            <Label htmlFor="current">In corso</Label>
          </div>
        </div>

        <div className="space-y-2 mb-6">
          <Label htmlFor="description">Descrizione</Label>
          <Textarea
            id="description"
            name="description"
            value={newEducation.description}
            onChange={handleNewEducationChange}
            placeholder="Descrivi il corso di studi, certificazioni ottenute, ecc..."
            rows={4}
          />
        </div>

        <Button
          type="button"
          onClick={addEducation}
          variant="ghost"
          disabled={!newEducation.institution || !newEducation.degree || !newEducation.startDate}
        >
          <Plus className="h-4 w-4" />
          Aggiungi formazione
        </Button>
      </div>
    </div>
  )
}

