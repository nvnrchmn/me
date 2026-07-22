"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function VisitorTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // Jalankan tracker hanya 1 kali saat komponen dimount, tapi kirim pathname pertama
    // Atau jika ingin track tiap perpindahan halaman, biarkan pathname di dependency array.
    // Berdasarkan request, kita mendeteksi sesi unik harian, jadi panggil sekali saja per mount.
    
    // Cegah API hit berulang kali jika dipanggil di strict mode dev
    const hasTracked = sessionStorage.getItem("hasTrackedSession")
    if (hasTracked) return

    sessionStorage.setItem("hasTrackedSession", "true")

    fetch("/api/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ path: pathname })
    }).catch((err) => {
      console.error("Failed to track visitor:", err)
    })
  }, []) // Empty dependency array, jalankan sekali per sesi browser (atau saat sessionStorage hilang)

  return null
}
