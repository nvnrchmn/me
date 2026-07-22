# Novanurachman - Personal Portfolio & CMS

This is a modern, full-stack Personal Portfolio website built for **Novanurachman**. It features a stunning public-facing UI/UX (with Dark Mode by default) and a powerful built-in Admin Content Management System (CMS) to manage the entire website dynamically.

## 🚀 Features

### Public Frontend
- **Dynamic Content**: Hero, About, Experience, Skills, Projects, and CV sections are entirely driven by the database.
- **Beautiful UI/UX**: Built with standard CSS and modern aesthetics. Includes smooth scroll, framer-motion animations, and glassmorphism.
- **Dark/Light Mode**: Full theme toggle support using `next-themes`.
- **CV / Resume**: A dedicated `/cv` page that formats beautifully when printed (`window.print()`).
- **Contact Form**: Direct email integration via Nodemailer.

### Superadmin Panel (`/admin`)
- **Secure Authentication**: Protected via NextAuth.js (Email & Password credentials).
- **CRUD Operations**: Fully functional interface to Create, Read, Update, and Delete data for:
  - Global Profile (Name, Tagline, Bio, Social Links)
  - Work Experience
  - Projects Portfolio
  - Skills List
- **Visitor Analytics**: Built-in IP Tracker to monitor where your visitors are coming from (Country, City, Region, ISP, Lat/Lon) using `ip-api.com`.
- **Dynamic Settings**: Configurable SMTP email settings directly from the dashboard (no code changes needed).

## 🛠️ Technology Stack

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Database**: MySQL (via Laragon / Local)
- **ORM**: Prisma
- **Authentication**: NextAuth.js v4
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Styling**: Vanilla CSS (CSS Variables for themes)

## 💻 Getting Started

### Prerequisites
- Node.js (v18+)
- MySQL Database

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/nvnrchmn/me.git
   cd me
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   # Database connection string (adjust with your MySQL credentials)
   DATABASE_URL="mysql://root:@localhost:3306/sbdigita_nova"
   
   # NextAuth Secret (generate one using: openssl rand -base64 32)
   NEXTAUTH_SECRET="your_generated_secret_key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. Run Database Migrations (Prisma):
   ```bash
   npx prisma db push
   npx prisma generate
   ```

5. Seed Admin User:
   *(By default, you can register an initial admin account via database manually, or check the seed script if available).*

6. Start Development Server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to view the site, and [http://localhost:3000/login](http://localhost:3000/login) to access the admin portal.

## 📝 License
Proprietary / Custom Build for Novanurachman.
