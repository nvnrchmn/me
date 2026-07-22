import { getProjects } from "@/lib/api"
import { ProjectCard } from "@/components/ui/project-card"

export default async function Projects() {
  const projects = await getProjects()

  return (
    <div className="container mx-auto px-4 py-20 max-w-6xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tighter mb-2">Projects</h1>
        <div className="h-1 w-20 bg-[var(--primary)]"></div>
      </div>

      <div className="mb-12">
        <p className="text-[var(--foreground)]/70 max-w-2xl">
          A selection of my recent work, highlighting case studies of digital products I&apos;ve built from the ground up.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}
