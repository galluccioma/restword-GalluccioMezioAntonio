"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Edit, Check, X } from "lucide-react"
import { updateProfileField } from "@/lib/data"

interface EditableFieldProps {
  value: string
  label?: string
  type?: "text" | "textarea"
  fieldName: string // e.g., "personal.bio", "preferences.position"
  onUpdate?: (value: string) => void
}

export default function EditableField({ value, label, type = "text", fieldName, onUpdate }: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(value)
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = async () => {
    setIsLoading(true)
    try {
      await updateProfileField(fieldName, editValue)
      if (onUpdate) {
        onUpdate(editValue)
      }
      setIsEditing(false)
    } catch (error) {
      console.error("Error updating field:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setEditValue(value)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div>
        {label && <div className="text-sm text-gray-500 mb-1">{label}</div>}
        <div className="flex items-start gap-2">
          <div className="flex-1">
            {type === "text" ? (
              <Input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="w-full"
                disabled={isLoading}
              />
            ) : (
              <Textarea
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="w-full"
                rows={4}
                disabled={isLoading}
              />
            )}
          </div>
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
      </div>
    )
  }

  return (
    <div>
      {label && <div className="text-sm text-gray-500 mb-1">{label}</div>}
      <div className="flex items-start group">
        <div className="flex-1">
          {type === "textarea" ? (
            <p className="text-gray-700 whitespace-pre-wrap">{value}</p>
          ) : (
            <p className="text-gray-700">{value}</p>
          )}
        </div>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-purple-600"
          onClick={() => setIsEditing(true)}
        >
          <Edit className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

