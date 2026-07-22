import { getProjects } from "@/lib/api"
import { ProjectsClient } from "./client"

export default async function ProjectsAdminPage() {
  const projects = await getProjects()

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Projects Settings</h1>
        <p className="text-[var(--foreground)]/60">Manage your portfolio projects and case studies.</p>
      </div>

      <ProjectsClient initialProjects={projects} />
    </div>
  )
}
