"use client"

import { useState } from "react"
import { saveSettings } from "@/app/actions/admin"
import { Save, Loader2, Mail } from "lucide-react"

export function SettingsForm({ initialSettings }: { initialSettings: Record<string, string> }) {
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error", text: string } | null>(null)

  const [formData, setFormData] = useState({
    smtp_host: initialSettings.smtp_host || "",
    smtp_port: initialSettings.smtp_port || "",
    smtp_user: initialSettings.smtp_user || "",
    smtp_pass: initialSettings.smtp_pass || "",
    smtp_secure: initialSettings.smtp_secure || "true",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setMessage(null)

    try {
      await saveSettings(formData)
      setMessage({ type: "success", text: "Settings saved successfully!" })
    } catch (error) {
      setMessage({ type: "error", text: "Failed to save settings." })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {message && (
        <div className={`p-4 rounded-lg font-medium text-sm ${
          message.type === "success" 
            ? "bg-green-500/10 text-green-500 border border-green-500/20" 
            : "bg-red-500/10 text-red-500 border border-red-500/20"
        }`}>
          {message.text}
        </div>
      )}

      <div>
        <div className="flex items-center gap-2 mb-4 text-[var(--primary)]">
          <Mail size={20} />
          <h2 className="text-xl font-bold">SMTP / Email Configuration</h2>
        </div>
        <p className="text-sm text-[var(--foreground)]/60 mb-6">
          This is used by the Contact Form to send emails to your inbox. We recommend using an App Password if you are using Gmail.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">SMTP Host</label>
            <input 
              type="text" 
              value={formData.smtp_host}
              onChange={(e) => setFormData({...formData, smtp_host: e.target.value})}
              placeholder="e.g. smtp.gmail.com"
              className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border border-[var(--border)] focus:border-[var(--primary)] focus:outline-none transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">SMTP Port</label>
            <input 
              type="text" 
              value={formData.smtp_port}
              onChange={(e) => setFormData({...formData, smtp_port: e.target.value})}
              placeholder="e.g. 465 or 587"
              className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border border-[var(--border)] focus:border-[var(--primary)] focus:outline-none transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">SMTP Username (Email)</label>
            <input 
              type="text" 
              value={formData.smtp_user}
              onChange={(e) => setFormData({...formData, smtp_user: e.target.value})}
              placeholder="your@email.com"
              className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border border-[var(--border)] focus:border-[var(--primary)] focus:outline-none transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">SMTP Password (App Password)</label>
            <input 
              type="password" 
              value={formData.smtp_pass}
              onChange={(e) => setFormData({...formData, smtp_pass: e.target.value})}
              placeholder="••••••••••••••••"
              className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border border-[var(--border)] focus:border-[var(--primary)] focus:outline-none transition-colors"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">Use TLS/SSL Secure Connection</label>
            <select 
              value={formData.smtp_secure}
              onChange={(e) => setFormData({...formData, smtp_secure: e.target.value})}
              className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border border-[var(--border)] focus:border-[var(--primary)] focus:outline-none transition-colors"
            >
              <option value="true">Yes (Port 465)</option>
              <option value="false">No / STARTTLS (Port 587)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-[var(--border)] flex justify-end">
        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex items-center gap-2 bg-[var(--primary)] text-[var(--background)] px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity shadow-lg shadow-[var(--primary)]/20 disabled:opacity-50"
        >
          {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
          {isSaving ? "Saving..." : "Save Configuration"}
        </button>
      </div>
    </form>
  )
}
