import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import * as z from "zod"

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    // Server-side validation
    const result = contactSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ error: "Invalid form data" }, { status: 400 })
    }

    const { name, email, message } = result.data

    // Fetch SMTP settings from DB (configured by Superadmin)
    const { getSettings, getProfile } = await import("@/lib/api")
    const settings = await getSettings()
    const profile = await getProfile() // to get target email

    const smtpUser = settings.smtp_user || process.env.SMTP_USER
    
    // Nodemailer configuration (SMTP with TLS support)
    const transporter = nodemailer.createTransport({
      host: settings.smtp_host || process.env.SMTP_HOST || "smtp.example.com",
      port: Number(settings.smtp_port) || Number(process.env.SMTP_PORT) || 587,
      secure: settings.smtp_secure === "true", // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: settings.smtp_pass || process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: process.env.NODE_ENV === "production",
      }
    })

    // Prepare email options
    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: profile.contact.email || process.env.CONTACT_EMAIL || "hello@example.com",
      subject: `New Contact Request from ${name} via Personal Website`,
      text: message,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New Message from Personal Website</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    }

    // Only attempt to send if SMTP_USER is configured, otherwise just mock success for now
    if (smtpUser) {
      await transporter.sendMail(mailOptions)
    } else {
      console.log("Mocking email send (SMTP not configured):", mailOptions)
    }

    return NextResponse.json({ success: true, message: "Email sent successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error sending contact email:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
