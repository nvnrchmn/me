import { getProfile, getExperiences, getSkills } from "@/lib/api"
import { PrintButton } from "@/components/ui/print-button"

export default async function CV() {
  const profile = await getProfile()
  const experiences = await getExperiences()
  const skills = await getSkills()

  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl print:py-0 print:max-w-none">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 print:hidden">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter mb-2">Curriculum Vitae</h1>
          <div className="h-1 w-20 bg-[var(--primary)]"></div>
        </div>

        <PrintButton />
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] p-8 md:p-12 rounded-2xl print:border-none print:shadow-none print:p-0 print:bg-white print:text-black">
        {/* Header CV */}
        <div className="border-b border-[var(--border)] pb-8 mb-8 text-center md:text-left">
          <h2 className="text-3xl font-bold mb-2">{profile.name}</h2>
          <p className="text-[var(--primary)] text-lg mb-4">{profile.tagline}</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-[var(--foreground)]/70">
            <span>{profile.contact.email}</span>
            <span className="hidden md:inline">•</span>
            <span>{profile.contact.linkedin}</span>
            <span className="hidden md:inline">•</span>
            <span>{profile.contact.github}</span>
          </div>
        </div>

        {/* Summary */}
        <div className="mb-10">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="w-6 h-px bg-[var(--primary)] inline-block"></span> 
            Professional Summary
          </h3>
          <p className="text-[var(--foreground)]/80 leading-relaxed">
            {profile.fullBio}
          </p>
        </div>

        {/* Experience */}
        <div className="mb-10">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="w-6 h-px bg-[var(--primary)] inline-block"></span> 
            Experience
          </h3>
          <div className="space-y-8">
            {experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
                  <h4 className="text-lg font-bold">{exp.role}</h4>
                  <span className="text-sm font-mono text-[var(--foreground)]/60">{exp.period}</span>
                </div>
                <div className="text-[var(--primary)] font-medium mb-3">{exp.company}</div>
                <ul className="list-disc list-inside space-y-1 text-[var(--foreground)]/80 text-sm">
                  {exp.highlights.map((highlight, i) => (
                    <li key={i}>{highlight}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div>
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="w-6 h-px bg-[var(--primary)] inline-block"></span> 
            Technical Skills
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {skills.map((category) => (
              <div key={category.category}>
                <h4 className="font-bold mb-2 text-[var(--foreground)]/90">{category.category}</h4>
                <p className="text-sm text-[var(--foreground)]/70 leading-relaxed">
                  {category.items.join(", ")}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
