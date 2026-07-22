import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export type { Profile, SkillCategory, SkillItem } from "@prisma/client"
import type { Project as PrismaProject, Experience as PrismaExperience } from "@prisma/client"

export interface SkillCategoryUI {
  category: string
  items: string[]
}

export interface Project extends Omit<PrismaProject, 'techStack'> {
  techStack: string[]
}

export interface Experience extends Omit<PrismaExperience, 'highlights'> {
  highlights: string[]
}

export interface ProfileUI {
  name: string
  tagline: string
  shortBio: string
  fullBio: string
  cvUrl: string | null
  stats: {
    yearsOfExperience: string
    projectsCompleted: string
    happyClients: string
  }
  contact: {
    email: string
    github: string
    linkedin: string
    twitter: string
  }
}

export async function getProjects(): Promise<Project[]> {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" }
  })
  return projects.map(p => ({
    ...p,
    techStack: p.techStack as string[]
  }))
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const project = await prisma.project.findUnique({
    where: { slug }
  })
  if (!project) return undefined
  return {
    ...project,
    techStack: project.techStack as string[]
  }
}

export async function getExperiences(): Promise<Experience[]> {
  const experiences = await prisma.experience.findMany({
    orderBy: { createdAt: "desc" }
  })
  return experiences.map(e => ({
    ...e,
    highlights: e.highlights as string[]
  }))
}

export async function getSkills(): Promise<SkillCategoryUI[]> {
  const categories = await prisma.skillCategory.findMany({
    include: {
      items: true
    },
    orderBy: { createdAt: "asc" }
  })
  
// Transform to match the old shape expected by UI
  return categories.map(cat => ({
    category: cat.name,
    items: cat.items.map(i => i.name)
  }))
}

export async function getSkillsRaw() {
  return await prisma.skillCategory.findMany({
    include: {
      items: true
    },
    orderBy: { createdAt: "asc" }
  })
}

export async function getProfile(): Promise<ProfileUI> {
  const profile = await prisma.profile.findFirst()
  
  if (!profile) {
    throw new Error("Profile not found in database")
  }

  // Transform to match old JSON shape expected by UI
  return {
    name: profile.name,
    tagline: profile.tagline,
    shortBio: profile.shortBio,
    fullBio: profile.fullBio,
    cvUrl: profile.cvUrl,
    stats: {
      yearsOfExperience: profile.yearsOfExperience,
      projectsCompleted: profile.projectsCompleted,
      happyClients: profile.happyClients,
    },
    contact: {
      email: profile.email,
      github: profile.github,
      linkedin: profile.linkedin,
      twitter: profile.twitter,
    }
  }
}

export async function getSettings(): Promise<Record<string, string>> {
  const settings = await prisma.setting.findMany()
  const result: Record<string, string> = {}
  for (const s of settings) {
    result[s.key] = s.value
  }
  return result
}
