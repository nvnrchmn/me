import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import Link from "next/link"
import { LayoutDashboard, Users, Briefcase, Code, FileText, Settings, LogOut, Globe } from "lucide-react"
import { SignOutButton } from "./sign-out-button"
import NextAuthProvider from "@/components/providers/next-auth-provider"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Profile", href: "/admin/profile", icon: Users },
    { name: "Experience", href: "/admin/experience", icon: Briefcase },
    { name: "Projects", href: "/admin/projects", icon: Code },
    { name: "Skills", href: "/admin/skills", icon: FileText },
    { name: "Visitors", href: "/admin/visitors", icon: Globe },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ]

  return (
    <NextAuthProvider>
      <div className="min-h-screen bg-[var(--background)] flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-[var(--border)] bg-[var(--card)] hidden md:flex flex-col">
          <div className="h-16 flex items-center px-6 border-b border-[var(--border)]">
            <span className="text-xl font-bold">Admin Portal</span>
          </div>
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-3">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-[var(--primary)]/10 hover:text-[var(--primary)] transition-colors"
                  >
                    <item.icon size={18} />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="p-4 border-t border-[var(--border)]">
            <SignOutButton />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
          <header className="h-16 flex items-center justify-end px-6 border-b border-[var(--border)] bg-[var(--card)]">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">{session.user?.email}</span>
            </div>
          </header>
          <div className="flex-1 overflow-y-auto p-6">
            {children}
          </div>
        </main>
      </div>
    </NextAuthProvider>
  )
}

