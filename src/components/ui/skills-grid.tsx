"use client"

import { motion } from "framer-motion"
import type { SkillCategoryUI } from "@/lib/api"

export function SkillsGrid({ categories }: { categories: SkillCategoryUI[] }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div className="grid md:grid-cols-2 gap-10">
      {categories.map((category, idx) => (
        <motion.div
          key={category.category}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)]"
        >
          <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
            <span className="text-[var(--primary)] font-mono text-sm">0{idx + 1}.</span>
            {category.category}
          </h3>
          
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-wrap gap-3"
          >
            {category.items.map((skill) => (
              <motion.span
                key={skill}
                variants={item}
                className="px-4 py-2 rounded-full text-sm font-medium bg-[var(--background)] border border-[var(--border)] transition-all hover:border-[var(--primary)] hover:text-[var(--primary)] hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}
