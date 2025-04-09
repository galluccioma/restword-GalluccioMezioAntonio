"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"

export default function PersonalInfoForm({ data, updateData }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    photo: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    cap: "",
  })

  useEffect(() => {
    if (data) {
      setFormData({
        ...data,
      })
    }
  }, [data])

  const handleChange = (e) => {
    const { name, value } = e.target
    const updatedData = {
      ...formData,
      [name]: value,
    }
    setFormData(updatedData)
    updateData(updatedData)
  }

  const handlePhotoUpload = (e) => {
    // In a real app, this would upload to a server
    // For now, we'll just use a placeholder or file reader
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const updatedData = {
          ...formData,
          photo: e.target.result,
        }
        setFormData(updatedData)
        updateData(updatedData)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Informazioni Personali</h2>

      <div className="flex justify-center mb-8">
        <div className="text-center">
          <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-4 relative overflow-hidden">
            {formData.photo ? (
              <img src={formData.photo || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                <Upload className="h-8 w-8" />
              </div>
            )}
          </div>

          <div>
            <Input id="photo-upload" type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
            <Label htmlFor="photo-upload" className="cursor-pointer">
              <Button type="button" variant="outline" size="sm" className="text-purple-600 border-purple-600">
                Carica Foto
              </Button>
            </Label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <Label htmlFor="firstName" className="mb-1 block">
            Nome <span className="text-red-500">*</span>
          </Label>
          <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </div>

        <div>
          <Label htmlFor="lastName" className="mb-1 block">
            Cognome <span className="text-red-500">*</span>
          </Label>
          <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </div>
      </div>

      <div className="mb-6">
        <Label htmlFor="dateOfBirth" className="mb-1 block">
          Data di Nascita <span className="text-red-500">*</span>
        </Label>
        <Input
          id="dateOfBirth"
          name="dateOfBirth"
          type="date"
          value={formData.dateOfBirth}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-6">
        <Label htmlFor="email" className="mb-1 block">
          Email <span className="text-red-500">*</span>
        </Label>
        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
      </div>

      <div className="mb-6">
        <Label htmlFor="phone" className="mb-1 block">
          Telefono <span className="text-red-500">*</span>
        </Label>
        <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
      </div>

      <div className="mb-6">
        <Label htmlFor="address" className="mb-1 block">
          Indirizzo <span className="text-red-500">*</span>
        </Label>
        <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="city" className="mb-1 block">
            Città <span className="text-red-500">*</span>
          </Label>
          <Input id="city" name="city" value={formData.city} onChange={handleChange} required />
        </div>

        <div>
          <Label htmlFor="cap" className="mb-1 block">
            CAP <span className="text-red-500">*</span>
          </Label>
          <Input id="cap" name="cap" value={formData.cap} onChange={handleChange} required />
        </div>
      </div>

      <p className="text-sm text-gray-500 mt-6">
        <span className="text-red-500">*</span> Campi obbligatori
      </p>
    </div>
  )
}

