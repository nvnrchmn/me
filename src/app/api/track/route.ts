import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const { path } = await req.json()
    
    // Get IP Address
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || 
               req.headers.get("x-real-ip") || 
               "127.0.0.1"

    const userAgent = req.headers.get("user-agent") || ""

    // Cek apakah IP ini sudah tercatat hari ini (mencegah spam database)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const existingVisit = await prisma.visitor.findFirst({
      where: {
        ip: ip,
        createdAt: {
          gte: today
        }
      }
    })

    if (existingVisit) {
      // Jika sudah ada kunjungan hari ini, abaikan (Unique visitor per hari)
      return NextResponse.json({ success: true, message: "Already tracked today" }, { status: 200 })
    }

    // Ambil data geolokasi dari ip-api.com
    let geoData = {
      country: "Unknown",
      region: "Unknown",
      city: "Unknown",
      lat: 0,
      lon: 0,
      isp: "Unknown"
    }

    if (ip !== "127.0.0.1" && ip !== "::1" && ip !== "localhost") {
      try {
        const res = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,regionName,city,lat,lon,isp`)
        const data = await res.json()
        if (data.status === "success") {
          geoData = {
            country: data.country,
            region: data.regionName,
            city: data.city,
            lat: data.lat,
            lon: data.lon,
            isp: data.isp
          }
        }
      } catch (err) {
        console.error("Failed to fetch geolocation", err)
      }
    }

    // Simpan ke database
    await prisma.visitor.create({
      data: {
        ip,
        userAgent,
        path: path || "/",
        ...geoData
      }
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("Tracking error:", error)
    return NextResponse.json({ error: "Tracking failed" }, { status: 500 })
  }
}
