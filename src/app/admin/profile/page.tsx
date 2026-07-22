import { getProfile } from "@/lib/api"
import { ProfileForm } from "./form"

export default async function ProfileAdminPage() {
  const profile = await getProfile()
  
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
        <p className="text-[var(--foreground)]/60">Update your personal information, biography, and contact details.</p>
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 md:p-8">
        <ProfileForm initialData={profile} />
      </div>
    </div>
  )
}
