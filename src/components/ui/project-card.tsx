import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Project } from "@/lib/api"

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--card)] transition-all hover:border-[var(--primary)] hover:shadow-[0_0_20px_rgba(0,240,255,0.1)] flex flex-col h-full">
      <div className="relative aspect-video bg-[var(--background)] overflow-hidden border-b border-[var(--border)]">
        {/* Placeholder image representation since we don't have real images yet */}
        <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-[var(--foreground)]/10 group-hover:scale-110 transition-transform duration-500">
          {project.title.substring(0, 2).toUpperCase()}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-2">
          <span className="text-xs font-mono px-2 py-1 rounded bg-[var(--background)] text-[var(--primary)] border border-[var(--border)]">
            {project.category}
          </span>
        </div>
        
        <h3 className="text-2xl font-bold mb-2 group-hover:text-[var(--primary)] transition-colors">
          {project.title}
        </h3>
        
        <p className="text-[var(--foreground)]/70 text-sm mb-6 flex-grow">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack.map((tech) => (
            <span key={tech} className="text-xs text-[var(--foreground)]/50">
              {tech}
            </span>
          ))}
        </div>
        
        <Link 
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-2 text-sm font-medium hover:text-[var(--primary)] transition-colors mt-auto"
        >
          View Case Study <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  )
}
