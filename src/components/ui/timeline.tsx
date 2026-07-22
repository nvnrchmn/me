"use client"

import { motion } from "framer-motion"
import type { Experience } from "@/lib/api"

export function Timeline({ items }: { items: Experience[] }) {
  return (
    <div className="relative border-l border-[var(--border)] ml-3 md:ml-6 mt-8">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="mb-12 pl-8 relative"
        >
          {/* Timeline Node */}
          <div className="absolute w-4 h-4 rounded-full bg-[var(--primary)] -left-[9px] top-1.5 shadow-[0_0_10px_rgba(0,240,255,0.5)]"></div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
            <h3 className="text-xl font-bold">{item.role}</h3>
            <span className="text-sm text-[var(--foreground)]/50 font-mono mt-1 md:mt-0 bg-[var(--card)] px-2 py-1 rounded border border-[var(--border)]">
              {item.period}
            </span>
          </div>
          
          <h4 className="text-[var(--primary)] font-medium mb-4">{item.company}</h4>
          <p className="text-[var(--foreground)]/70 mb-4">{item.description}</p>
          
          <ul className="list-disc list-inside text-sm text-[var(--foreground)]/60 space-y-1">
            {item.highlights.map((highlight, i) => (
              <li key={i}>{highlight}</li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  )
}
