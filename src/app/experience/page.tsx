import { getExperiences } from "@/lib/api"
import { Timeline } from "@/components/ui/timeline"

export default async function Experience() {
  const experiences = await getExperiences()

  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tighter mb-2">Experience</h1>
        <div className="h-1 w-20 bg-[var(--primary)]"></div>
      </div>

      <div className="mb-8">
        <p className="text-[var(--foreground)]/70 max-w-2xl">
          My professional journey and the companies I&apos;ve helped build.
        </p>
      </div>

      <Timeline items={experiences} />
    </div>
  )
}
