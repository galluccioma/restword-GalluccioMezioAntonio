"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"

export default function WorkExperienceForm({ data, updateData }) {
  const [experiences, setExperiences] = useState([])
  const [newExperience, setNewExperience] = useState({
    id: "",
    company: "",
    position: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
  })

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setExperiences(data)
    }
  }, [data])

  const handleNewExperienceChange = (e) => {
    const { name, value, type, checked } = e.target
    setNewExperience((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const addExperience = () => {
    const experienceWithId = {
      ...newExperience,
      id: Date.now().toString(),
    }

    const updatedExperiences = [...experiences, experienceWithId]
    setExperiences(updatedExperiences)
    updateData(updatedExperiences)

    // Reset form
    setNewExperience({
      id: "",
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    })
  }

  const removeExperience = (id) => {
    const updatedExperiences = experiences.filter((exp) => exp.id !== id)
    setExperiences(updatedExperiences)
    updateData(updatedExperiences)
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Le tue esperienze lavorative</h3>

        {experiences.length === 0 ? (
          <p className="text-gray-500 italic">Nessuna esperienza lavorativa aggiunta.</p>
        ) : (
          <div className="space-y-4">
            {experiences.map((exp) => (
              <Card key={exp.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-semibold">{exp.position}</h4>
                      <p className="text-gray-600">
                        {exp.company}, {exp.location}
                      </p>
                      <p className="text-sm text-gray-500">
                        {exp.startDate} - {exp.current ? "Presente" : exp.endDate}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeExperience(exp.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                  <p className="text-sm">{exp.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-medium mb-4">Aggiungi nuova esperienza</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div className="space-y-2">
            <Label htmlFor="company">Azienda *</Label>
            <Input
              id="company"
              name="company"
              value={newExperience.company}
              onChange={handleNewExperienceChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="position">Posizione *</Label>
            <Input
              id="position"
              name="position"
              value={newExperience.position}
              onChange={handleNewExperienceChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Località</Label>
            <Input id="location" name="location" value={newExperience.location} onChange={handleNewExperienceChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="startDate">Data inizio *</Label>
            <Input
              id="startDate"
              name="startDate"
              type="date"
              value={newExperience.startDate}
              onChange={handleNewExperienceChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="endDate">Data fine</Label>
            <Input
              id="endDate"
              name="endDate"
              type="date"
              value={newExperience.endDate}
              onChange={handleNewExperienceChange}
              disabled={newExperience.current}
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="current"
              name="current"
              checked={newExperience.current}
              onChange={handleNewExperienceChange}
              className="rounded border-gray-300"
            />
            <Label htmlFor="current">Lavoro attuale</Label>
          </div>
        </div>

        <div className="space-y-2 mb-6">
          <Label htmlFor="description">Descrizione</Label>
          <Textarea
            id="description"
            name="description"
            value={newExperience.description}
            onChange={handleNewExperienceChange}
            placeholder="Descrivi le tue responsabilità e risultati..."
            rows={4}
          />
        </div>

        <Button
        variant="ghost"
          type="button"
          onClick={addExperience}
          disabled={!newExperience.company || !newExperience.position || !newExperience.startDate}
        >
          <Plus className="h-4 w-4" />
          Aggiungi esperienza
        </Button>
      </div>
    </div>
  )
}

