import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { getProjectBySlug, getProjects } from "@/lib/api"

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-[var(--foreground)]/70 hover:text-[var(--primary)] transition-colors mb-10">
        <ArrowLeft size={16} /> Back to Projects
      </Link>

      <div className="mb-10">
        <div className="mb-4">
          <span className="text-sm font-mono px-3 py-1 rounded-full bg-[var(--card)] text-[var(--primary)] border border-[var(--border)]">
            {project.category}
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">{project.title}</h1>
        <p className="text-xl text-[var(--foreground)]/70 max-w-2xl leading-relaxed">
          {project.description}
        </p>
      </div>

      <div className="w-full aspect-video rounded-2xl bg-[var(--card)] border border-[var(--border)] overflow-hidden relative mb-16 shadow-[0_0_40px_rgba(0,240,255,0.05)]">
         {/* Placeholder large image */}
         <div className="absolute inset-0 flex items-center justify-center text-[10rem] font-bold text-[var(--foreground)]/5">
          {project.title.substring(0, 2).toUpperCase()}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2 prose prose-invert max-w-none text-[var(--foreground)]/80">
          <h2>About the Project</h2>
          <p>
            This is a placeholder for the detailed case study of <strong>{project.title}</strong>. 
            In a real scenario, this section would describe the problem statement, the solution proposed, 
            the design process, and the outcomes or metrics achieved.
          </p>
          <p>
            We used a combination of modern web technologies to ensure high performance, maintainability, 
            and a great user experience. The architecture was designed to be scalable from day one.
          </p>
        </div>

        <div className="md:col-span-1 space-y-8">
          <div className="p-6 rounded-2xl bg-[var(--card)]/50 border border-[var(--border)]">
            <h3 className="text-lg font-bold mb-4 border-b border-[var(--border)] pb-2">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span key={tech} className="px-3 py-1 bg-[var(--background)] border border-[var(--border)] rounded text-sm text-[var(--foreground)]/80">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {project.demoUrl && (
            <Link 
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-[var(--foreground)] text-[var(--background)] font-medium transition-transform hover:scale-105"
            >
              Visit Live Site <ExternalLink size={18} />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
