"use client"

import { useState } from "react"
import { createProject, updateProject, deleteProject } from "@/app/actions/admin"
import { useRouter } from "next/navigation"
import { Plus, Edit2, Trash2, X, Save, Loader2, GripVertical } from "lucide-react"
import type { Project } from "@/lib/api"

export function ProjectsClient({ initialProjects }: { initialProjects: Project[] }) {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    description: "",
    techStack: [""]
  })

  // Basic slug generator from title
  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    setFormData({
      ...formData,
      title,
      slug: isCreating ? generateSlug(title) : formData.slug // Auto-update slug only on create
    })
  }

  const handleEdit = (project: Project) => {
    setFormData({
      title: project.title,
      slug: project.slug,
      category: project.category,
      description: project.description,
      techStack: project.techStack.length > 0 ? [...project.techStack] : [""]
    })
    setEditingId(project.id)
    setIsCreating(false)
  }

  const handleCreateNew = () => {
    setFormData({
      title: "",
      slug: "",
      category: "",
      description: "",
      techStack: [""]
    })
    setEditingId(null)
    setIsCreating(true)
  }

  const handleCancel = () => {
    setEditingId(null)
    setIsCreating(false)
  }

  const handleTechChange = (index: number, value: string) => {
    const newTech = [...formData.techStack]
    newTech[index] = value
    setFormData({ ...formData, techStack: newTech })
  }

  const addTech = () => {
    setFormData({ ...formData, techStack: [...formData.techStack, ""] })
  }

  const removeTech = (index: number) => {
    if (formData.techStack.length > 1) {
      const newTech = [...formData.techStack]
      newTech.splice(index, 1)
      setFormData({ ...formData, techStack: newTech })
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      await deleteProject(id)
      setProjects(projects.filter(p => p.id !== id))
      router.refresh()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    
    const cleanedData = {
      ...formData,
      techStack: formData.techStack.filter(t => t.trim() !== "")
    }

    try {
      if (editingId) {
        await updateProject(editingId, cleanedData)
      } else {
        await createProject(cleanedData)
      }
      
      router.refresh()
      setIsCreating(false)
      setEditingId(null)
    } catch (error) {
      console.error(error)
      alert("Failed to save project. Make sure slug is unique.")
    } finally {
      setIsSaving(false)
    }
  }

  if (isCreating || editingId) {
    return (
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 md:p-8">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-[var(--border)]">
          <h2 className="text-xl font-bold">{isCreating ? "Add New Project" : "Edit Project"}</h2>
          <button onClick={handleCancel} className="p-2 hover:bg-[var(--background)] rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Project Title</label>
              <input 
                type="text" 
                value={formData.title} 
                onChange={handleTitleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-[var(--background)] border border-[var(--border)] focus:border-[var(--primary)] focus:outline-none transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Slug (URL friendly)</label>
              <input 
                type="text" 
                value={formData.slug} 
                onChange={(e) => setFormData({...formData, slug: e.target.value})}
                required
                className="w-full px-4 py-2 rounded-lg bg-[var(--background)] border border-[var(--border)] focus:border-[var(--primary)] focus:outline-none transition-colors"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Category</label>
              <input 
                type="text" 
                value={formData.category} 
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                required
                placeholder="e.g. Web Development"
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
              rows={4}
              className="w-full px-4 py-2 rounded-lg bg-[var(--background)] border border-[var(--border)] focus:border-[var(--primary)] focus:outline-none transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium flex justify-between items-center">
              <span>Tech Stack</span>
              <button 
                type="button" 
                onClick={addTech}
                className="text-xs text-[var(--primary)] hover:underline flex items-center gap-1"
              >
                <Plus size={14} /> Add Tech
              </button>
            </label>
            <div className="flex flex-wrap gap-3">
              {formData.techStack.map((tech, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <input 
                    type="text" 
                    value={tech} 
                    onChange={(e) => handleTechChange(index, e.target.value)}
                    placeholder="E.g. Next.js"
                    className="w-32 px-3 py-2 rounded-lg bg-[var(--background)] border border-[var(--border)] focus:border-[var(--primary)] focus:outline-none transition-colors text-sm"
                  />
                  <button 
                    type="button" 
                    onClick={() => removeTech(index)}
                    disabled={formData.techStack.length === 1}
                    className="p-1 text-red-500 hover:bg-red-500/10 rounded transition-colors disabled:opacity-30"
                  >
                    <X size={16} />
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
              {isSaving ? "Saving..." : "Save Project"}
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
        {initialProjects.length === 0 ? (
          <div className="text-center py-12 bg-[var(--card)] border border-[var(--border)] rounded-2xl">
            <p className="text-[var(--foreground)]/50">No projects found.</p>
          </div>
        ) : (
          initialProjects.map((project) => (
            <div key={project.id} className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 flex flex-col md:flex-row justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <span className="text-xs font-mono px-2 py-1 bg-[var(--background)] border border-[var(--border)] rounded text-[var(--primary)]">
                    {project.category}
                  </span>
                </div>
                <div className="text-[var(--foreground)]/50 font-mono text-sm mb-3">/projects/{project.slug}</div>
                <p className="text-sm text-[var(--foreground)]/70 line-clamp-2 max-w-2xl mb-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map(tech => (
                    <span key={tech} className="text-xs bg-[var(--background)] border border-[var(--border)] px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex items-start gap-2 shrink-0">
                <button 
                  onClick={() => handleEdit(project)}
                  className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Edit2 size={18} />
                </button>
                <button 
                  onClick={() => handleDelete(project.id)}
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
