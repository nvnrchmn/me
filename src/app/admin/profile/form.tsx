"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { updateProfile } from "@/app/actions/admin"
import { Save, Loader2 } from "lucide-react"
import type { ProfileUI } from "@/lib/api"

export function ProfileForm({ initialData }: { initialData: ProfileUI }) {
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSaving(true)
    setMessage(null)

    const formData = new FormData(e.currentTarget)
    
    try {
      await updateProfile({
        name: formData.get("name") as string,
        tagline: formData.get("tagline") as string,
        shortBio: formData.get("shortBio") as string,
        fullBio: formData.get("fullBio") as string,
        yearsOfExperience: formData.get("yearsOfExperience") as string,
        projectsCompleted: formData.get("projectsCompleted") as string,
        happyClients: formData.get("happyClients") as string,
        email: formData.get("email") as string,
        github: formData.get("github") as string,
        linkedin: formData.get("linkedin") as string,
        twitter: formData.get("twitter") as string,
      })
      
      setMessage({ type: 'success', text: 'Profile updated successfully!' })
      router.refresh()
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {message && (
        <div className={`p-4 rounded-lg ${message.type === 'success' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
          {message.text}
        </div>
      )}

      {/* Basic Info */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-b border-[var(--border)] pb-2 mb-4">Basic Information</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">Full Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              defaultValue={initialData.name} 
              required
              className="w-full px-4 py-2 rounded-lg bg-[var(--background)] border border-[var(--border)] focus:border-[var(--primary)] focus:outline-none transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="tagline" className="text-sm font-medium">Tagline / Title</label>
            <input 
              type="text" 
              id="tagline" 
              name="tagline" 
              defaultValue={initialData.tagline} 
              required
              className="w-full px-4 py-2 rounded-lg bg-[var(--background)] border border-[var(--border)] focus:border-[var(--primary)] focus:outline-none transition-colors"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="shortBio" className="text-sm font-medium">Short Bio (Hero section)</label>
          <textarea 
            id="shortBio" 
            name="shortBio" 
            defaultValue={initialData.shortBio} 
            required
            rows={2}
            className="w-full px-4 py-2 rounded-lg bg-[var(--background)] border border-[var(--border)] focus:border-[var(--primary)] focus:outline-none transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="fullBio" className="text-sm font-medium">Full Bio (About & CV section)</label>
          <textarea 
            id="fullBio" 
            name="fullBio" 
            defaultValue={initialData.fullBio} 
            required
            rows={5}
            className="w-full px-4 py-2 rounded-lg bg-[var(--background)] border border-[var(--border)] focus:border-[var(--primary)] focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-b border-[var(--border)] pb-2 mb-4 mt-8">Statistics</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label htmlFor="yearsOfExperience" className="text-sm font-medium">Years of Experience</label>
            <input 
              type="text" 
              id="yearsOfExperience" 
              name="yearsOfExperience" 
              defaultValue={initialData.stats.yearsOfExperience} 
              required
              className="w-full px-4 py-2 rounded-lg bg-[var(--background)] border border-[var(--border)] focus:border-[var(--primary)] focus:outline-none transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="projectsCompleted" className="text-sm font-medium">Projects Completed</label>
            <input 
              type="text" 
              id="projectsCompleted" 
              name="projectsCompleted" 
              defaultValue={initialData.stats.projectsCompleted} 
              required
              className="w-full px-4 py-2 rounded-lg bg-[var(--background)] border border-[var(--border)] focus:border-[var(--primary)] focus:outline-none transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="happyClients" className="text-sm font-medium">Happy Clients</label>
            <input 
              type="text" 
              id="happyClients" 
              name="happyClients" 
              defaultValue={initialData.stats.happyClients} 
              required
              className="w-full px-4 py-2 rounded-lg bg-[var(--background)] border border-[var(--border)] focus:border-[var(--primary)] focus:outline-none transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-b border-[var(--border)] pb-2 mb-4 mt-8">Contact Links</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              defaultValue={initialData.contact.email} 
              required
              className="w-full px-4 py-2 rounded-lg bg-[var(--background)] border border-[var(--border)] focus:border-[var(--primary)] focus:outline-none transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="github" className="text-sm font-medium">GitHub URL</label>
            <input 
              type="url" 
              id="github" 
              name="github" 
              defaultValue={initialData.contact.github} 
              className="w-full px-4 py-2 rounded-lg bg-[var(--background)] border border-[var(--border)] focus:border-[var(--primary)] focus:outline-none transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="linkedin" className="text-sm font-medium">LinkedIn URL</label>
            <input 
              type="url" 
              id="linkedin" 
              name="linkedin" 
              defaultValue={initialData.contact.linkedin} 
              className="w-full px-4 py-2 rounded-lg bg-[var(--background)] border border-[var(--border)] focus:border-[var(--primary)] focus:outline-none transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="twitter" className="text-sm font-medium">Twitter / X URL</label>
            <input 
              type="url" 
              id="twitter" 
              name="twitter" 
              defaultValue={initialData.contact.twitter} 
              className="w-full px-4 py-2 rounded-lg bg-[var(--background)] border border-[var(--border)] focus:border-[var(--primary)] focus:outline-none transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="pt-6 flex justify-end">
        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex items-center gap-2 bg-[var(--primary)] text-[var(--background)] px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  )
}
