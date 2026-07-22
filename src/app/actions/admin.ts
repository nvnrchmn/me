"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"

const prisma = new PrismaClient()

// Authentication Wrapper
async function requireAuth() {
  const session = await getServerSession(authOptions)
  if (!session) {
    throw new Error("Unauthorized")
  }
  return session
}

// ----------------------
// PROFILE ACTIONS
// ----------------------

export async function updateProfile(data: {
  name: string
  tagline: string
  shortBio: string
  fullBio: string
  cvUrl?: string
  yearsOfExperience: string
  projectsCompleted: string
  happyClients: string
  email: string
  github: string
  linkedin: string
  twitter: string
}) {
  await requireAuth()

  // Assuming there's only one profile record. We find the first one.
  const existing = await prisma.profile.findFirst()
  
  if (existing) {
    await prisma.profile.update({
      where: { id: existing.id },
      data
    })
  } else {
    await prisma.profile.create({ data })
  }

  revalidatePath("/")
  revalidatePath("/admin/profile")
  revalidatePath("/cv")
  return { success: true }
}

// ----------------------
// EXPERIENCE ACTIONS
// ----------------------

export async function createExperience(data: {
  role: string
  company: string
  period: string
  description: string
  highlights: string[]
}) {
  await requireAuth()
  await prisma.experience.create({ data })
  revalidatePath("/")
  revalidatePath("/experience")
  revalidatePath("/cv")
  revalidatePath("/admin/experience")
  return { success: true }
}

export async function updateExperience(id: string, data: {
  role: string
  company: string
  period: string
  description: string
  highlights: string[]
}) {
  await requireAuth()
  await prisma.experience.update({
    where: { id },
    data
  })
  revalidatePath("/")
  revalidatePath("/experience")
  revalidatePath("/cv")
  revalidatePath("/admin/experience")
  return { success: true }
}

export async function deleteExperience(id: string) {
  await requireAuth()
  await prisma.experience.delete({ where: { id } })
  revalidatePath("/")
  revalidatePath("/experience")
  revalidatePath("/cv")
  revalidatePath("/admin/experience")
  return { success: true }
}

// ----------------------
// PROJECTS ACTIONS
// ----------------------

export async function createProject(data: {
  slug: string
  title: string
  category: string
  description: string
  techStack: string[]
  image?: string
  demoUrl?: string
}) {
  await requireAuth()
  await prisma.project.create({ data })
  revalidatePath("/")
  revalidatePath("/projects")
  revalidatePath("/admin/projects")
  return { success: true }
}

export async function updateProject(id: string, data: {
  slug: string
  title: string
  category: string
  description: string
  techStack: string[]
  image?: string
  demoUrl?: string
}) {
  await requireAuth()
  await prisma.project.update({
    where: { id },
    data
  })
  revalidatePath("/")
  revalidatePath("/projects")
  revalidatePath(`/projects/${data.slug}`)
  revalidatePath("/admin/projects")
  return { success: true }
}

export async function deleteProject(id: string) {
  await requireAuth()
  await prisma.project.delete({ where: { id } })
  revalidatePath("/")
  revalidatePath("/projects")
  revalidatePath("/admin/projects")
  return { success: true }
}

// ----------------------
// SKILLS ACTIONS
// ----------------------

export async function createSkillCategory(data: { name: string }) {
  await requireAuth()
  await prisma.skillCategory.create({ data })
  revalidatePath("/")
  revalidatePath("/skills")
  revalidatePath("/cv")
  revalidatePath("/admin/skills")
  return { success: true }
}

export async function deleteSkillCategory(id: string) {
  await requireAuth()
  await prisma.skillCategory.delete({ where: { id } })
  revalidatePath("/")
  revalidatePath("/skills")
  revalidatePath("/cv")
  revalidatePath("/admin/skills")
  return { success: true }
}

export async function createSkillItem(categoryId: string, data: { name: string }) {
  await requireAuth()
  await prisma.skillItem.create({
    data: {
      name: data.name,
      categoryId
    }
  })
  revalidatePath("/")
  revalidatePath("/skills")
  revalidatePath("/cv")
  revalidatePath("/admin/skills")
  return { success: true }
}

export async function deleteSkillItem(id: string) {
  await requireAuth()
  await prisma.skillItem.delete({ where: { id } })
  revalidatePath("/")
  revalidatePath("/skills")
  revalidatePath("/cv")
  revalidatePath("/admin/skills")
  return { success: true }
}

// ----------------------
// SETTINGS ACTIONS
// ----------------------

export async function saveSettings(settings: Record<string, string>) {
  await requireAuth()
  
  // Use a transaction to upsert all settings
  const operations = Object.entries(settings).map(([key, value]) => {
    return prisma.setting.upsert({
      where: { key },
      update: { value },
      create: { key, value }
    })
  })
  
  await prisma.$transaction(operations)
  revalidatePath("/admin/settings")
  revalidatePath("/api/contact")
  return { success: true }
}

// ----------------------
// VISITOR ACTIONS
// ----------------------

export async function getVisitors() {
  await requireAuth()
  return await prisma.visitor.findMany({
    orderBy: { createdAt: "desc" },
    take: 500 // Limit for performance
  })
}

export async function deleteVisitor(id: string) {
  await requireAuth()
  await prisma.visitor.delete({ where: { id } })
  revalidatePath("/admin/visitors")
  return { success: true }
}
