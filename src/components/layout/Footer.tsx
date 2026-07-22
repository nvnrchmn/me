"use client"

import Link from "next/link"
import { Mail } from "lucide-react"
import { usePathname } from "next/navigation"

export function Footer() {
  const pathname = usePathname()
  const currentYear = new Date().getFullYear()

  if (pathname?.startsWith("/admin") || pathname?.startsWith("/login")) {
    return null
  }

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--background)]/80 py-8 md:py-12 mt-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-xl font-bold tracking-tighter">
              NOVA<span className="text-[var(--primary)]">.</span>
            </span>
            <p className="text-sm text-[var(--foreground)]/60 max-w-xs text-center md:text-left">
              Solo Developer & Founder of Logikraf. Building digital experiences that matter.
            </p>
          </div>

          <div className="flex gap-4">
            <Link href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-[var(--card)] transition-colors text-[var(--foreground)]/70 hover:text-[var(--primary)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            </Link>
            <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-[var(--card)] transition-colors text-[var(--foreground)]/70 hover:text-[var(--primary)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </Link>
            <Link href="mailto:hello@novanurachman.my.id" className="p-2 rounded-full hover:bg-[var(--card)] transition-colors text-[var(--foreground)]/70 hover:text-[var(--primary)]">
              <Mail size={20} />
            </Link>
            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-[var(--card)] transition-colors text-[var(--foreground)]/70 hover:text-[var(--primary)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </Link>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-[var(--border)] flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[var(--foreground)]/50">
          <p>© {currentYear} Nova Nurachman. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-[var(--foreground)] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[var(--foreground)] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
