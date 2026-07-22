import { getVisitors } from "@/app/actions/admin"
import { VisitorsClient } from "./client"

export default async function VisitorsAdminPage() {
  const visitors = await getVisitors()

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Visitor Analytics</h1>
        <p className="text-[var(--foreground)]/60">Monitor who is visiting your website (Unique Visitors per day).</p>
      </div>

      <VisitorsClient initialVisitors={visitors} />
    </div>
  )
}
