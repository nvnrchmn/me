import { getSkills } from "@/lib/api"
import { SkillsGrid } from "@/components/ui/skills-grid"

export default async function Skills() {
  const skills = await getSkills()

  return (
    <div className="container mx-auto px-4 py-20 max-w-5xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tighter mb-2">Skills & Technologies</h1>
        <div className="h-1 w-20 bg-[var(--primary)]"></div>
      </div>

      <div className="mb-12">
        <p className="text-[var(--foreground)]/70 max-w-2xl">
          The tools, languages, and frameworks I use to bring digital products to life. I continuously learn and adapt to the modern web ecosystem.
        </p>
      </div>

      <SkillsGrid categories={skills} />
    </div>
  )
}
