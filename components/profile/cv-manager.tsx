"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { FileText, Trash2, Upload, Download, Check, Edit } from "lucide-react"
import { deleteCV, addCV, updateCV } from "@/lib/data"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

interface CV {
  id: string
  name: string
  date: string
  language?: string
  default?: boolean
  size?: string
}

interface CVManagerProps {
  cvList: CV[]
  onUpdate?: () => void
}

export default function CVManager({ cvList, onUpdate }: CVManagerProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [editingCV, setEditingCV] = useState<CV | null>(null)
  const [editForm, setEditForm] = useState({
    name: "",
    language: "",
    default: false,
  })

  const handleDelete = async (id: string) => {
    setIsLoading(true)
    try {
      await deleteCV(id)
      if (onUpdate) onUpdate()
    } catch (error) {
      console.error("Error deleting CV:", error)
    } finally {
      setIsLoading(false)
      setDeletingId(null)
    }
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setIsUploading(true)
    try {
      // In a real app, this would upload to a server
      // For now, we'll just use the file object
      const newCV = {
        name: file.name,
        date: new Date().toISOString(),
        language: detectLanguage(file.name),
        default: cvList.length === 0,
        size: formatFileSize(file.size),
      }

      await addCV(newCV)
      if (onUpdate) onUpdate()
    } catch (error) {
      console.error("Error uploading CV:", error)
    } finally {
      setIsUploading(false)
    }
  }

  const handleEditCV = (cv: CV) => {
    setEditingCV(cv)
    setEditForm({
      name: cv.name,
      language: cv.language || "Italiano",
      default: cv.default || false,
    })
  }

  const handleSaveEdit = async () => {
    if (!editingCV) return

    setIsLoading(true)
    try {
      await updateCV(editingCV.id, editForm)
      if (onUpdate) onUpdate()
      setEditingCV(null)
    } catch (error) {
      console.error("Error updating CV:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSetDefault = async (id: string) => {
    setIsLoading(true)
    try {
      await updateCV(id, { default: true })
      if (onUpdate) onUpdate()
    } catch (error) {
      console.error("Error setting default CV:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const detectLanguage = (filename: string): string => {
    if (filename.toLowerCase().includes("_en") || filename.toLowerCase().includes("_eng")) {
      return "English"
    } else if (filename.toLowerCase().includes("_it") || filename.toLowerCase().includes("_ita")) {
      return "Italiano"
    } else {
      return "Italiano" // Default
    }
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}`
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const handleDownloadCV = (cv: CV) => {
    // In una vera app, questo scaricherebbe il file dal server
    // Per ora, creiamo un file fittizio e lo scarichiamo
    const blob = new Blob(["Contenuto del CV fittizio"], { type: "application/pdf" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = cv.name
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-medium text-[#351471]">Curriculum Vitae</h2>
        <div>
          <input
            id="cv-upload"
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={handleFileUpload}
            disabled={isUploading}
          />
          <label htmlFor="cv-upload">
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-purple-600 border-purple-600"
              disabled={isUploading}
            >
              Aggiungi CV
            </Button>
          </label>
        </div>
      </div>

      <div className="space-y-4">
        {cvList.length === 0 ? (
          <div className="text-center p-6 border border-dashed rounded-lg">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Nessun CV caricato</p>
            <p className="text-sm text-gray-400 mb-4">
              Carica il tuo CV per aumentare le possibilità di essere contattato
            </p>
            <label htmlFor="cv-upload-empty">
              <input
                id="cv-upload-empty"
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={handleFileUpload}
                disabled={isUploading}
              />
              <Button variant="outline" className="border-purple-600 text-purple-600" disabled={isUploading}>
                <Upload className="h-4 w-4 mr-2" />
                Carica CV
              </Button>
            </label>
          </div>
        ) : (
          cvList.map((cv) => (
            <div key={cv.id} className="flex items-center p-4 rounded-lg bg-purple-50">
              {deletingId === cv.id ? (
                <div className="flex-1 text-center">
                  <p className="mb-2">Sei sicuro di voler eliminare questo CV?</p>
                  <div className="flex justify-center gap-2">
                    <Button variant="alert" size="sm" onClick={() => handleDelete(cv.id)} disabled={isLoading}>
                      Elimina
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setDeletingId(null)} disabled={isLoading}>
                      Annulla
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <FileText className="h-6 w-6 text-purple-600 mr-4" />
                  <div className="flex-1">
                    <div className="flex items-center">
                      <p className="font-medium text-purple-600">{cv.name}</p>
                      {cv.default && (
                        <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">Default</span>
                      )}
                    </div>
                    <div className="flex text-sm text-gray-500 mt-1">
                      <span className="mr-4">Ultima modifica: {formatDate(cv.date)}</span>
                      {cv.language && <span className="mr-4">{cv.language}</span>}
                      {cv.size && <span className="hidden md:block">{cv.size}</span>}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleDownloadCV(cv)} title="Scarica CV">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleEditCV(cv)} title="Modifica CV">
                      <Edit className="h-4 w-4" />
                    </Button>
                    {!cv.default && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSetDefault(cv.id)}
                        title="Imposta come default"
                        className="text-green-600"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500"
                      onClick={() => setDeletingId(cv.id)}
                      title="Elimina CV"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>

      {/* Dialog per modificare il CV */}
      <Dialog open={editingCV !== null} onOpenChange={(open) => !open && setEditingCV(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifica CV</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="cv-name">Nome file</Label>
              <Input
                id="cv-name"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cv-language">Lingua</Label>
              <Select
                value={editForm.language}
                onValueChange={(value) => setEditForm({ ...editForm, language: value })}
              >
                <SelectTrigger id="cv-language">
                  <SelectValue placeholder="Seleziona lingua" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Italiano">Italiano</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Español">Español</SelectItem>
                  <SelectItem value="Français">Français</SelectItem>
                  <SelectItem value="Deutsch">Deutsch</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-top space-x-2">
              <Checkbox
                id="cv-default"
                checked={editForm.default}
                onCheckedChange={(checked) => setEditForm({ ...editForm, default: checked === true })}
              />
              <div className="flex flex-col gap-2">
              <Label htmlFor="cv-default">Imposta come CV predefinito</Label>
              <Label className="text-sm font-light">Solo il CV predefinito sarà visibile direttamente sul tuo profilo, Puoi comunque selezionare un cv diverso per l'invio ai recreuiter.</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingCV(null)}>
              Annulla
            </Button>
            <Button onClick={handleSaveEdit} disabled={isLoading}>
              Salva
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

