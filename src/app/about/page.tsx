import { getProfile } from "@/lib/api"
import { Code2, Briefcase, Users } from "lucide-react"

export default async function About() {
  const profile = await getProfile()

  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tighter mb-2">About Me</h1>
        <div className="h-1 w-20 bg-[var(--primary)]"></div>
      </div>

      <div className="grid md:grid-cols-3 gap-12 items-start">
        <div className="md:col-span-1 flex flex-col items-center">
          <div className="relative w-48 h-48 rounded-full bg-[var(--card)] border border-[var(--border)] overflow-hidden flex items-center justify-center shadow-[0_0_30px_rgba(0,240,255,0.15)] mb-6">
            <span className="text-6xl text-[var(--foreground)]/20">N</span>
          </div>
          <h2 className="text-2xl font-bold">{profile.name}</h2>
          <p className="text-[var(--primary)] text-sm mb-4 text-center">{profile.tagline}</p>
        </div>

        <div className="md:col-span-2">
          <div className="prose prose-invert max-w-none text-[var(--foreground)]/80 leading-relaxed mb-10">
            <p>{profile.fullBio}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[var(--card)]/50 border border-[var(--border)] backdrop-blur-sm flex flex-col items-center text-center transition-transform hover:scale-105">
              <Code2 className="text-[var(--primary)] mb-3" size={32} />
              <span className="text-3xl font-bold mb-1">{profile.stats.yearsOfExperience}</span>
              <span className="text-sm text-[var(--foreground)]/60">Years Experience</span>
            </div>
            
            <div className="p-6 rounded-2xl bg-[var(--card)]/50 border border-[var(--border)] backdrop-blur-sm flex flex-col items-center text-center transition-transform hover:scale-105">
              <Briefcase className="text-[var(--primary)] mb-3" size={32} />
              <span className="text-3xl font-bold mb-1">{profile.stats.projectsCompleted}</span>
              <span className="text-sm text-[var(--foreground)]/60">Projects Completed</span>
            </div>
            
            <div className="p-6 rounded-2xl bg-[var(--card)]/50 border border-[var(--border)] backdrop-blur-sm flex flex-col items-center text-center transition-transform hover:scale-105">
              <Users className="text-[var(--primary)] mb-3" size={32} />
              <span className="text-3xl font-bold mb-1">{profile.stats.happyClients}</span>
              <span className="text-sm text-[var(--foreground)]/60">Happy Clients</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
