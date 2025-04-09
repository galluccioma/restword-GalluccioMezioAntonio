"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Upload, X, Check } from "lucide-react"

export default function CvUploadForm({ data, updateData }) {
  const [cvFiles, setCvFiles] = useState([])

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setCvFiles(data)
    }
  }, [data])

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      // In a real app, this would upload to a server
      // For now, we'll just use the file object
      const newFile = {
        id: Date.now().toString(),
        name: file.name,
        size: file.size,
        type: file.type,
        language: detectLanguage(file.name),
        date: new Date().toISOString(),
        default: cvFiles.length === 0,
      }

      const updatedFiles = [...cvFiles, newFile]
      setCvFiles(updatedFiles)
      updateData(updatedFiles)
    }
  }

  const detectLanguage = (filename) => {
    if (filename.toLowerCase().includes("_en") || filename.toLowerCase().includes("_eng")) {
      return "English"
    } else if (filename.toLowerCase().includes("_it") || filename.toLowerCase().includes("_ita")) {
      return "Italiano"
    } else {
      return "Italiano" // Default
    }
  }

  const removeFile = (id) => {
    const updatedFiles = cvFiles.filter((file) => file.id !== id)
    setCvFiles(updatedFiles)
    updateData(updatedFiles)
  }

  const setDefaultFile = (id) => {
    const updatedFiles = cvFiles.map((file) => ({
      ...file,
      default: file.id === id,
    }))
    setCvFiles(updatedFiles)
    updateData(updatedFiles)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}`
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Carica il tuo CV</h2>

      <div className="mb-8">
        <p className="text-gray-600 mb-4">
          Carica il tuo curriculum vitae per permettere ai recruiter di conoscere meglio le tue esperienze e competenze.
        </p>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <div className="flex justify-center mb-4">
            <FileText className="h-12 w-12 text-purple-600" />
          </div>
          <p className="mb-4 font-medium">Trascina qui il tuo CV o clicca per caricarlo</p>
          <p className="text-sm text-gray-500 mb-6">Formati supportati: PDF, DOC, DOCX (max 5MB)</p>

          <input id="cv-upload" type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFileUpload} />
          <label htmlFor="cv-upload">
            <Button variant="outline" className="border-purple-600 text-purple-600">
              <Upload className="h-4 w-4 mr-2" />
              Seleziona file
            </Button>
          </label>
        </div>
      </div>

      {cvFiles.length > 0 && (
        <div>
          <h3 className="font-medium mb-4">CV caricati</h3>

          <div className="space-y-4">
            {cvFiles.map((file) => (
              <Card key={file.id}>
                <CardContent className="p-4 flex items-center">
                  <FileText className="h-8 w-8 text-purple-600 mr-4" />

                  <div className="flex-1">
                    <div className="flex items-center">
                      <p className="font-medium">{file.name}</p>
                      {file.default && (
                        <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">Default</span>
                      )}
                    </div>
                    <div className="flex text-sm text-gray-500 mt-1">
                      <span className="mr-4">Ultima modifica: {formatDate(file.date)}</span>
                      <span className="mr-4">{file.language}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {!file.default && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDefaultFile(file.id)}
                        className="text-green-600"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" onClick={() => removeFile(file.id)} className="text-red-500">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

