import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // 1. Create Superadmin User
  const adminPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@logikraf.com' },
    update: {},
    create: {
      email: 'admin@logikraf.com',
      name: 'Super Admin',
      password: adminPassword,
    },
  })
  console.log('Admin user created/verified.')

  // 2. Seed Profile
  const profileDataPath = path.join(process.cwd(), 'src/data/profile.json')
  if (fs.existsSync(profileDataPath)) {
    const profileJson = JSON.parse(fs.readFileSync(profileDataPath, 'utf8'))
    await prisma.profile.create({
      data: {
        name: profileJson.name,
        tagline: profileJson.tagline,
        shortBio: profileJson.shortBio,
        fullBio: profileJson.fullBio,
        cvUrl: profileJson.cvUrl,
        yearsOfExperience: profileJson.stats.yearsOfExperience,
        projectsCompleted: profileJson.stats.projectsCompleted,
        happyClients: profileJson.stats.happyClients,
        email: profileJson.contact.email,
        github: profileJson.contact.github,
        linkedin: profileJson.contact.linkedin,
        twitter: profileJson.contact.twitter,
      }
    })
    console.log('Profile seeded.')
  }

  // 3. Seed Experiences
  const expDataPath = path.join(process.cwd(), 'src/data/experience.json')
  if (fs.existsSync(expDataPath)) {
    const expJson = JSON.parse(fs.readFileSync(expDataPath, 'utf8'))
    for (const exp of expJson) {
      await prisma.experience.create({
        data: {
          id: exp.id,
          role: exp.role,
          company: exp.company,
          period: exp.period,
          description: exp.description,
          highlights: exp.highlights, // Stored as JSON
        }
      })
    }
    console.log('Experiences seeded.')
  }

  // 4. Seed Skills
  const skillsDataPath = path.join(process.cwd(), 'src/data/skills.json')
  if (fs.existsSync(skillsDataPath)) {
    const skillsJson = JSON.parse(fs.readFileSync(skillsDataPath, 'utf8'))
    for (const cat of skillsJson) {
      const category = await prisma.skillCategory.create({
        data: {
          name: cat.category,
        }
      })
      
      for (const item of cat.items) {
        await prisma.skillItem.create({
          data: {
            name: item,
            categoryId: category.id
          }
        })
      }
    }
    console.log('Skills seeded.')
  }

  // 5. Seed Projects
  const projectsDataPath = path.join(process.cwd(), 'src/data/projects.json')
  if (fs.existsSync(projectsDataPath)) {
    const projectsJson = JSON.parse(fs.readFileSync(projectsDataPath, 'utf8'))
    for (const proj of projectsJson) {
      await prisma.project.create({
        data: {
          id: proj.id,
          slug: proj.slug,
          title: proj.title,
          category: proj.category,
          description: proj.description,
          techStack: proj.techStack,
          image: proj.image,
          demoUrl: proj.demoUrl,
        }
      })
    }
    console.log('Projects seeded.')
  }

  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
