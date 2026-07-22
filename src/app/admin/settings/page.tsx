import { getSettings } from "@/lib/api"
import { SettingsForm } from "./form"

export default async function SettingsPage() {
  const settings = await getSettings()

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Global Settings</h1>
        <p className="text-[var(--foreground)]/60">Configure SMTP email server for your contact form and other global variables.</p>
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 md:p-8">
        <SettingsForm initialSettings={settings} />
      </div>
    </div>
  )
}
