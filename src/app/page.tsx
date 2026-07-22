"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, FileText } from "lucide-react"

export default function Home() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Glow Effect */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--primary)]/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block mb-4 px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--card)]/50 backdrop-blur-sm text-sm font-mono text-[var(--foreground)]/70"
        >
          <span className="text-[var(--primary)]">{"// "}</span>
          Available for new opportunities
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tighter mb-6"
        >
          Hi, I&apos;m <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary)] to-purple-500">Nova Nurachman</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl md:text-2xl text-[var(--foreground)]/70 mb-10 max-w-2xl mx-auto"
        >
          Solo Developer & Founder of Logikraf. Building digital experiences that matter with modern web technologies.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/projects"
            className="flex items-center gap-2 px-8 py-4 rounded-full bg-[var(--foreground)] text-[var(--background)] font-medium transition-transform hover:scale-105"
          >
            Lihat Proyek <ArrowRight size={18} />
          </Link>
          <Link
            href="/cv"
            className="flex items-center gap-2 px-8 py-4 rounded-full border border-[var(--border)] bg-[var(--card)]/50 backdrop-blur-sm font-medium transition-all hover:bg-[var(--card)] hover:border-[var(--primary)] hover:scale-105"
          >
            Download CV <FileText size={18} />
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
