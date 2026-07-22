"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Mail, Send, Loader2 } from "lucide-react"

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type ContactFormValues = z.infer<typeof contactSchema>

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true)
    setSubmitStatus("idle")
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      setSubmitStatus("success")
      reset()
    } catch (error) {
      console.error(error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-20 max-w-5xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tighter mb-2">Get In Touch</h1>
        <div className="h-1 w-20 bg-[var(--primary)]"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold mb-4">Let&apos;s talk about your project</h2>
          <p className="text-[var(--foreground)]/70 mb-8 leading-relaxed">
            Whether you have a question, a project idea, or just want to say hi, I&apos;ll try my best to get back to you!
          </p>

          <div className="space-y-6">
            <a href="mailto:hello@novanurachman.my.id" className="flex items-center gap-4 text-[var(--foreground)]/80 hover:text-[var(--primary)] transition-colors">
              <div className="w-12 h-12 rounded-full bg-[var(--card)] border border-[var(--border)] flex items-center justify-center">
                <Mail size={20} />
              </div>
              <div>
                <div className="text-sm font-bold">Email</div>
                <div>hello@novanurachman.my.id</div>
              </div>
            </a>
            
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-[var(--foreground)]/80 hover:text-[var(--primary)] transition-colors">
              <div className="w-12 h-12 rounded-full bg-[var(--card)] border border-[var(--border)] flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </div>
              <div>
                <div className="text-sm font-bold">LinkedIn</div>
                <div>Connect with me</div>
              </div>
            </a>

            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-[var(--foreground)]/80 hover:text-[var(--primary)] transition-colors">
              <div className="w-12 h-12 rounded-full bg-[var(--card)] border border-[var(--border)] flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              </div>
              <div>
                <div className="text-sm font-bold">GitHub</div>
                <div>Check out my repos</div>
              </div>
            </a>
          </div>
        </div>

        <div className="bg-[var(--card)] border border-[var(--border)] p-8 rounded-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
              <input
                id="name"
                type="text"
                className={`w-full px-4 py-3 rounded-lg bg-[var(--background)] border ${errors.name ? 'border-red-500' : 'border-[var(--border)]'} focus:outline-none focus:border-[var(--primary)] transition-colors`}
                placeholder="John Doe"
                {...register("name")}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
              <input
                id="email"
                type="email"
                className={`w-full px-4 py-3 rounded-lg bg-[var(--background)] border ${errors.email ? 'border-red-500' : 'border-[var(--border)]'} focus:outline-none focus:border-[var(--primary)] transition-colors`}
                placeholder="john@example.com"
                {...register("email")}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
              <textarea
                id="message"
                rows={5}
                className={`w-full px-4 py-3 rounded-lg bg-[var(--background)] border ${errors.message ? 'border-red-500' : 'border-[var(--border)]'} focus:outline-none focus:border-[var(--primary)] transition-colors resize-none`}
                placeholder="Tell me about your project..."
                {...register("message")}
              ></textarea>
              {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-lg bg-[var(--foreground)] text-[var(--background)] font-medium transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  Send Message <Send size={18} />
                </>
              )}
            </button>

            {submitStatus === "success" && (
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-500 text-sm text-center">
                Your message has been sent successfully! I will get back to you soon.
              </div>
            )}

            {submitStatus === "error" && (
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center">
                Failed to send message. Please try again later.
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
