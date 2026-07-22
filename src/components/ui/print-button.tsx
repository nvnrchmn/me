"use client"

import { Download } from "lucide-react"

export function PrintButton() {
  return (
    <button 
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--foreground)] text-[var(--background)] font-medium transition-transform hover:scale-105 print:hidden"
    >
      Download PDF <Download size={18} />
    </button>
  )
}
