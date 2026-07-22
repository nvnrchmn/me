"use client"

import { useState } from "react"
import { createExperience, updateExperience, deleteExperience } from "@/app/actions/admin"
import { useRouter } from "next/navigation"
import { Plus, Edit2, Trash2, X, Save, Loader2, GripVertical } from "lucide-react"
import type { Experience } from "@/lib/api"

export function ExperienceClient({ initialExperiences }: { initialExperiences: Experience[] }) {
  const router = useRouter()
  const [experiences, setExperiences] = useState<Experience[]>(initialExperiences)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const [formData, setFormData] = useState({
    role: "",
    company: "",
    period: "",
    description: "",
    highlights: [""]
  })

  const handleEdit = (exp: Experience) => {
    setFormData({
      role: exp.role,
      company: exp.company,
      period: exp.period,
      description: exp.description,
      highlights: exp.highlights.length > 0 ? [...exp.highlights] : [""]
    })
    setEditingId(exp.id)
    setIsCreating(false)
  }

  const handleCreateNew = () => {
    setFormData({
      role: "",
      company: "",
      period: "",
      description: "",
      highlights: [""]
    })
    setEditingId(null)
    setIsCreating(true)
  }

  const handleCancel = () => {
    setEditingId(null)
    setIsCreating(false)
  }

  const handleHighlightChange = (index: number, value: string) => {
    const newHighlights = [...formData.highlights]
    newHighlights[index] = value
    setFormData({ ...formData, highlights: newHighlights })
  }

  const addHighlight = () => {
    setFormData({ ...formData, highlights: [...formData.highlights, ""] })
  }

  const removeHighlight = (index: number) => {
    if (formData.highlights.length > 1) {
      const newHighlights = [...formData.highlights]
      newHighlights.splice(index, 1)
      setFormData({ ...formData, highlights: newHighlights })
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this experience?")) {
      await deleteExperience(id)
      setExperiences(experiences.filter(e => e.id !== id))
      router.refresh()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    
    // Filter out empty highlights
    const cleanedData = {
      ...formData,
      highlights: formData.highlights.filter(h => h.trim() !== "")
    }

    try {
      if (editingId) {
        await updateExperience(editingId, cleanedData)
      } else {
        await createExperience(cleanedData)
      }
      
      // Temporary optimistic UI or just reload
      router.refresh()
      setIsCreating(false)
      setEditingId(null)
      // Since router.refresh is async and we want to show new data, we rely on the server revalidation.
      // But we can also force a reload if needed. We'll let router.refresh() do its job.
    } catch (error) {
      console.error(error)
      alert("Failed to save experience")
    } finally {
      setIsSaving(false)
    }
  }

  if (isCreating || editingId) {
    return (
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 md:p-8">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-[var(--border)]">
          <h2 className="text-xl font-bold">{isCreating ? "Add New Experience" : "Edit Experience"}</h2>
          <button onClick={handleCancel} className="p-2 hover:bg-[var(--background)] rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Role / Job Title</label>
              <input 
                type="text" 
                value={formData.role} 
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                required
                className="w-full px-4 py-2 rounded-lg bg-[var(--background)] border border-[var(--border)] focus:border-[var(--primary)] focus:outline-none transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Company</label>
              <input 
                type="text" 
                value={formData.company} 
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                required
                className="w-full px-4 py-2 rounded-lg bg-[var(--background)] border border-[var(--border)] focus:border-[var(--primary)] focus:outline-none transition-colors"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Period (e.g. 2021 - Present)</label>
              <input 
                type="text" 
                value={formData.period} 
                onChange={(e) => setFormData({...formData, period: e.target.value})}
                required
                className="w-full px-4 py-2 rounded-lg bg-[var(--background)] border border-[var(--border)] focus:border-[var(--primary)] focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <textarea 
              value={formData.description} 
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
              rows={3}
              className="w-full px-4 py-2 rounded-lg bg-[var(--background)] border border-[var(--border)] focus:border-[var(--primary)] focus:outline-none transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium flex justify-between items-center">
              <span>Highlights / Key Responsibilities</span>
              <button 
                type="button" 
                onClick={addHighlight}
                className="text-xs text-[var(--primary)] hover:underline flex items-center gap-1"
              >
                <Plus size={14} /> Add Highlight
              </button>
            </label>
            <div className="space-y-3">
              {formData.highlights.map((highlight, index) => (
                <div key={index} className="flex gap-2">
                  <div className="mt-2 text-[var(--foreground)]/30"><GripVertical size={18} /></div>
                  <input 
                    type="text" 
                    value={highlight} 
                    onChange={(e) => handleHighlightChange(index, e.target.value)}
                    placeholder="E.g. Developed a new feature..."
                    className="flex-1 px-4 py-2 rounded-lg bg-[var(--background)] border border-[var(--border)] focus:border-[var(--primary)] focus:outline-none transition-colors"
                  />
                  <button 
                    type="button" 
                    onClick={() => removeHighlight(index)}
                    disabled={formData.highlights.length === 1}
                    className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-30"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-3 rounded-lg font-medium hover:bg-[var(--background)] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 bg-[var(--primary)] text-[var(--background)] px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
              {isSaving ? "Saving..." : "Save Experience"}
            </button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button 
          onClick={handleCreateNew}
          className="inline-flex items-center gap-2 bg-[var(--primary)] text-[var(--background)] px-4 py-2 rounded-lg font-bold hover:opacity-90 transition-opacity"
        >
          <Plus size={18} /> Add New
        </button>
      </div>

      <div className="grid gap-4">
        {initialExperiences.length === 0 ? (
          <div className="text-center py-12 bg-[var(--card)] border border-[var(--border)] rounded-2xl">
            <p className="text-[var(--foreground)]/50">No experience records found.</p>
          </div>
        ) : (
          initialExperiences.map((exp) => (
            <div key={exp.id} className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 flex flex-col md:flex-row justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-xl font-bold">{exp.role}</h3>
                  <span className="text-xs font-mono px-2 py-1 bg-[var(--background)] border border-[var(--border)] rounded text-[var(--foreground)]/70">
                    {exp.period}
                  </span>
                </div>
                <div className="text-[var(--primary)] font-medium mb-3">{exp.company}</div>
                <p className="text-sm text-[var(--foreground)]/70 line-clamp-2 max-w-2xl">
                  {exp.description}
                </p>
              </div>
              
              <div className="flex items-start gap-2 shrink-0">
                <button 
                  onClick={() => handleEdit(exp)}
                  className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Edit2 size={18} />
                </button>
                <button 
                  onClick={() => handleDelete(exp.id)}
                  className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
