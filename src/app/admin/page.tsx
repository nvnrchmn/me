import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-sm">
          <h3 className="text-lg font-medium text-[var(--foreground)]/70 mb-2">Welcome Back</h3>
          <p className="text-2xl font-bold">{session?.user?.name || "Admin"}</p>
        </div>
        
        <div className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-sm">
          <h3 className="text-lg font-medium text-[var(--foreground)]/70 mb-2">Status</h3>
          <div className="flex items-center gap-2 text-green-500">
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
            <span className="font-bold">System Online</span>
          </div>
        </div>
        
        <div className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-sm">
          <h3 className="text-lg font-medium text-[var(--foreground)]/70 mb-2">Database</h3>
          <p className="text-2xl font-bold text-[var(--primary)]">MySQL Connected</p>
        </div>
      </div>

      <div className="mt-12 p-8 rounded-xl bg-[var(--card)] border border-[var(--primary)]/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-16 bg-[var(--primary)]/10 blur-[100px] rounded-full"></div>
        <h2 className="text-xl font-bold mb-4 relative z-10">Next Steps (Phase 6)</h2>
        <p className="text-[var(--foreground)]/80 max-w-2xl relative z-10 leading-relaxed">
          The foundation for the Superadmin portal has been established with NextAuth and Prisma MySQL. 
          The next phase will involve building out the specific CRUD interfaces for Profile, Experience, Projects, Skills, and Settings.
        </p>
      </div>
    </div>
  )
}
