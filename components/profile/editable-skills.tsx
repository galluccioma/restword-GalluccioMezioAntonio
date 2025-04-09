"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Edit, Check, X, Plus } from "lucide-react"
import { updateProfileField } from "@/lib/data"
import { Card, CardContent } from "@/components/ui/card"

interface EditableSkillsProps {
  skills: string[]
  onUpdate?: (skills: string[]) => void
}

export default function EditableSkills({ skills, onUpdate }: EditableSkillsProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editSkills, setEditSkills] = useState<string[]>(skills)
  const [newSkill, setNewSkill] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = async () => {
    setIsLoading(true)
    try {
      await updateProfileField("skills", editSkills)
      if (onUpdate) {
        onUpdate(editSkills)
      }
      setIsEditing(false)
    } catch (error) {
      console.error("Error updating skills:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setEditSkills(skills)
    setIsEditing(false)
  }

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setEditSkills([...editSkills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const handleRemoveSkill = (index: number) => {
    setEditSkills(editSkills.filter((_, i) => i !== index))
  }

  if (isEditing) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Competenze</h3>
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

          <div className="flex flex-wrap mb-4">
            {editSkills.map((skill, index) => (
              <div key={index} className="skill-tag group flex items-center">
                {skill}
                <button
                  type="button"
                  className="ml-1 text-purple-800 hover:text-red-500"
                  onClick={() => handleRemoveSkill(index)}
                  disabled={isLoading}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Aggiungi una competenza"
              className="flex-1"
              disabled={isLoading}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleAddSkill()
                }
              }}
            />
            <Button
              type="button"
              onClick={handleAddSkill}
              className="bg-purple-600 hover:bg-purple-700"
              disabled={isLoading || !newSkill.trim()}
            >
              <Plus className="h-4 w-4 mr-1" />
              Aggiungi
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Competenze</h3>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="h-8 w-8 text-purple-600"
            onClick={() => setIsEditing(true)}
          >
            <Edit className="h-4 w-4" />
          </Button>
        </div>

        {skills.length > 0 ? (
          <div className="flex flex-wrap">
            {skills.map((skill, index) => (
              <span key={index} className="skill-tag">
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">Nessuna competenza aggiunta.</p>
        )}
      </CardContent>
    </Card>
  )
}

