import { getSkillsRaw } from "@/lib/api"
import { SkillsClient } from "./client"

export default async function SkillsAdminPage() {
  const categories = await getSkillsRaw()

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Skills Settings</h1>
        <p className="text-[var(--foreground)]/60">Manage your technical skills categories and items.</p>
      </div>

      <SkillsClient initialCategories={categories} />
    </div>
  )
}
