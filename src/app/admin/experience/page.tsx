import { getExperiences } from "@/lib/api"
import { ExperienceClient } from "./client"

export default async function ExperienceAdminPage() {
  const experiences = await getExperiences()

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Experience Settings</h1>
        <p className="text-[var(--foreground)]/60">Manage your work history and professional experience.</p>
      </div>

      <ExperienceClient initialExperiences={experiences} />
    </div>
  )
}
