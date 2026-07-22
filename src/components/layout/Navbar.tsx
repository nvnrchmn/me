"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { Moon, Sun, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/cv", label: "CV" },
  { href: "/contact", label: "Contact" },
]

export function Navbar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  // Hide Navbar for Admin and Login pages
  if (pathname.startsWith("/admin") || pathname.startsWith("/login")) {
    return null
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-md transition-colors duration-300">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-xl font-bold tracking-tighter">
            NOVA<span className="text-[var(--primary)]">.</span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative transition-colors hover:text-[var(--primary)]",
                pathname === link.href ? "text-[var(--primary)]" : "text-[var(--foreground)]/70"
              )}
            >
              {link.label}
              {pathname === link.href && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute -bottom-6 left-0 right-0 h-[2px] bg-[var(--primary)]"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 border-r border-[var(--border)] pr-4">
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-md hover:bg-[var(--card)] transition-colors"
                title="Toggle Light/Dark Mode"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden border-b border-[var(--border)] bg-[var(--background)]">
          <div className="flex flex-col space-y-4 p-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block text-sm font-medium transition-colors hover:text-[var(--primary)]",
                  pathname === link.href ? "text-[var(--primary)]" : "text-[var(--foreground)]/70"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-4 pt-4 border-t border-[var(--border)]">
              {mounted && (
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-md hover:bg-[var(--card)] transition-colors flex items-center gap-2"
                >
                  {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                  <span className="text-sm">Toggle Theme</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
