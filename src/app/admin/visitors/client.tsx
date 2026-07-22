"use client"

import { useState } from "react"
import { deleteVisitor } from "@/app/actions/admin"
import { useRouter } from "next/navigation"
import { Trash2, Globe, MapPin, Map, Clock } from "lucide-react"

type Visitor = {
  id: string
  ip: string
  userAgent: string | null
  country: string | null
  region: string | null
  city: string | null
  lat: number | null
  lon: number | null
  isp: string | null
  path: string | null
  createdAt: Date
}

export function VisitorsClient({ initialVisitors }: { initialVisitors: Visitor[] }) {
  const router = useRouter()
  const [visitors, setVisitors] = useState<Visitor[]>(initialVisitors)

  const handleDelete = async (id: string) => {
    if (confirm("Delete this visitor log?")) {
      await deleteVisitor(id)
      setVisitors(visitors.filter(v => v.id !== id))
      router.refresh()
    }
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    })
  }

  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-[var(--background)] border-b border-[var(--border)]">
            <tr>
              <th className="px-6 py-4 font-semibold">IP Address</th>
              <th className="px-6 py-4 font-semibold">Location</th>
              <th className="px-6 py-4 font-semibold">ISP</th>
              <th className="px-6 py-4 font-semibold">Landing Page</th>
              <th className="px-6 py-4 font-semibold">Date / Time</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {visitors.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-[var(--foreground)]/50">
                  No visitors tracked yet.
                </td>
              </tr>
            ) : (
              visitors.map((visitor) => (
                <tr key={visitor.id} className="hover:bg-[var(--background)]/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-mono">{visitor.ip}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="flex items-center gap-1 font-medium">
                        <Globe size={14} className="text-[var(--primary)]" />
                        {visitor.country || "Unknown"}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-[var(--foreground)]/60">
                        <Map size={12} /> {visitor.city}, {visitor.region}
                      </span>
                      {visitor.lat && visitor.lon && (
                        <span className="flex items-center gap-1 text-xs text-[var(--foreground)]/40 font-mono">
                          <MapPin size={12} /> {visitor.lat}, {visitor.lon}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[var(--foreground)]/80 max-w-[150px] truncate" title={visitor.isp || ""}>
                    {visitor.isp || "-"}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded text-xs font-mono">
                      {visitor.path || "/"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1 text-[var(--foreground)]/80">
                      <Clock size={14} />
                      {formatDate(visitor.createdAt)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleDelete(visitor.id)}
                      className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                      title="Delete log"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
