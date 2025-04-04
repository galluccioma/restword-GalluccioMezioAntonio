"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function PreferencesForm({ data, updateData }) {
  const [formData, setFormData] = useState({
    jobType: [],
    position: "",
    location: "",
    contractType: "",
    availability: "",
    salary: "",
    additionalInfo: "",
  })

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

  useEffect(() => {
    if (data) {
      setFormData({
        ...data,
        jobType: data.jobType || [],
        additionalInfo: data.additionalInfo || "",
      })
    }
  }, [data])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    updateData({
      ...formData,
      [name]: value,
    })
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    updateData({
      ...formData,
      [name]: value,
    })
  }

  const handleJobTypeChange = (id, checked) => {
    const updatedJobTypes = checked ? [...formData.jobType, id] : formData.jobType.filter((type) => type !== id)

    setFormData((prev) => ({
      ...prev,
      jobType: updatedJobTypes,
    }))

    updateData({
      ...formData,
      jobType: updatedJobTypes,
    })
  }

  return (
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
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contractType">Tipo di contratto</Label>
          <Select value={formData.contractType} onValueChange={(value) => handleSelectChange("contractType", value)}>
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
          <Select value={formData.availability} onValueChange={(value) => handleSelectChange("availability", value)}>
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
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="additionalInfo">Informazioni aggiuntive</Label>
        <Textarea
          id="additionalInfo"
          name="additionalInfo"
          value={formData.additionalInfo}
          onChange={handleChange}
          placeholder="Altre preferenze o requisiti per il tuo prossimo lavoro..."
          rows={4}
        />
      </div>
    </div>
  )
}

