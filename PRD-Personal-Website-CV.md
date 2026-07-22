# Product Requirements Document (PRD)
## Personal Website / CV — Nova Nurachman

| | |
|---|---|
| **Dokumen** | PRD v1.0 |
| **Pemilik Proyek** | Nova Nurachman (Solo Developer, Founder Logikraf) |
| **Tanggal** | 22 Juli 2026 |
| **Status** | Draft — untuk referensi implementasi (AI agent & developer) |

---

## 1. Ringkasan & Tujuan

Membangun website personal / CV interaktif untuk Nova Nurachman yang berfungsi sebagai:
- Portofolio profesional (developer, founder Logikraf)
- Digital CV / resume yang bisa diunduh (PDF) dan dibaca online
- Showcase proyek (Lemburin, SB Digital, Livine Profile, Logikraf.id, dsb.)
- Kanal kontak profesional (email, WhatsApp, LinkedIn, GitHub)

**Domain rencana:** `novanurachman.my.id`
**Hosting:** DirectAdmin (Hostdata.id) — Node.js App Manager (Passenger), shared hosting environment.

### Tujuan Utama
1. Membangun personal branding yang kuat dengan kesan **futuristik, modern, dan technical**.
2. Menampilkan portofolio kerja secara ringkas namun berdampak (case study style).
3. Performa tinggi (Core Web Vitals baik) meski di shared hosting.
4. Mudah di-maintain sendiri (solo developer, update konten cepat).
5. SEO-friendly agar mudah ditemukan oleh calon klien/employer.

---

## 2. Target Pengguna

| Persona | Kebutuhan |
|---|---|
| Recruiter / HR | Melihat CV singkat, skill, pengalaman kerja, unduh PDF cepat |
| Calon klien Logikraf | Melihat portofolio proyek, kredibilitas, cara kontak |
| Sesama developer / komunitas | Melihat stack teknis, GitHub, tulisan/insight |

---

## 3. Tech Stack

| Layer | Teknologi |
|---|---|
| Framework | **Next.js 15+ (App Router, Fullstack)** |
| Bahasa | **TypeScript** (strict mode) |
| Styling | **Tailwind CSS v4** (CSS-first config, `@theme`) |
| Animasi | Framer Motion / Motion One |
| Icon | Lucide React |
| Font | Variable font (mis. Geist / Space Grotesk + Inter) |
| Form/Backend ringan | Next.js Route Handlers (App Router) — kontak form, view counter, dsb. |
| CMS Konten | **CMS ringan (headless)** — mis. **Sanity.io** (free tier, generous API limit, cocok untuk shared hosting karena hosting CMS di cloud, bukan di server sendiri) untuk kelola konten proyek, CV, skill tanpa perlu redeploy |
| Database (opsional) | SQLite (better-sqlite3) atau file-based JSON hanya untuk data non-editorial (mis. counter, cache) — konten utama dikelola via CMS |
| Deployment | **DirectAdmin Node.js App (Passenger)**, mode Production |
| Version Control | Git + GitHub |
| Analytics | Umami / Plausible (self-host ringan) atau Vercel Analytics alternative |

> **Catatan infrastruktur:** Karena berjalan di shared hosting DirectAdmin (bukan VPS/Vercel), build harus di-generate lokal atau via CI, lalu hasil build (termasuk `.next`, `node_modules` production, `server.js`/`app.js` startup file) di-deploy ke `Application root`. Startup file harus disesuaikan dengan Passenger (biasanya `server.js` custom yang menjalankan `next start`).

---

## 4. Struktur Halaman (Sitemap)

```
/                → Hero + ringkasan singkat + CTA
/about           → Cerita profesional, journey, values
/experience      → Timeline pengalaman kerja & pendidikan
/projects        → Grid/list proyek (Lemburin, SB Digital, dsb.)
/projects/[slug] → Detail case study per proyek
/skills          → Tech stack, tools, kemampuan
/cv              → Versi CV formal + tombol Download PDF
/contact         → Form kontak + kanal sosial
```

Semua halaman dalam 1 domain, navigasi single-page-feel dengan smooth scroll/transition (opsional pakai route transition Next.js).

---

## 5. Fitur Utama

### 5.1 Hero Section
- Nama, tagline ("Solo Developer & Founder of Logikraf"), animasi teks (typewriter/gradient text).
- Background futuristik: grid pattern, particle/noise, glow gradient, atau subtle 3D (opsional Three.js/React Three Fiber jika resource memungkinkan).
- CTA: "Lihat Proyek", "Download CV".

### 5.2 About
- Ringkasan profesional, foto/avatar, highlight angka (jumlah proyek, tahun pengalaman).

### 5.3 Experience / Timeline
- Timeline vertikal dengan animasi scroll-reveal.

### 5.4 Projects Showcase
- Card grid dengan hover effect (glow border, tilt 3D ringan).
- Filter by kategori (Web App, SaaS, Mobile, Company Profile).
- Detail per proyek: masalah, solusi, tech stack, screenshot, link demo.

### 5.5 Skills
- Grouped by kategori: Frontend, Backend, DevOps/Infra, Tools.
- Visual progress/level indicator (bar, radar chart, atau badge grid — hindari skill bar generik, gunakan pendekatan modern seperti tag cloud interaktif).

### 5.6 CV Page
- Layout print-friendly + tombol "Download as PDF" (generate PDF dari data terstruktur, bukan screenshot).

### 5.7 Contact
- Form (nama, email, pesan) → kirim via Route Handler (email API: Resend/Nodemailer SMTP).
- Link langsung: WhatsApp, Email, LinkedIn, GitHub.
- Validasi form dengan Zod + React Hook Form.

### 5.8 Global
- Dark mode default (tema futuristik biasanya dark-first) dengan toggle light mode.
- Command palette (⌘K) untuk navigasi cepat antar section — nilai tambah "developer-y".
- Custom cursor / cursor glow effect (opsional, desktop only).
- Loading transition antar halaman.

---

## 6. Arah Desain (Futuristik & Modern UI/UX)

### 6.1 Prinsip Desain
- **Dark-first, high-contrast**, dengan aksen neon/gradient (cyan, violet, atau electric blue) sebagai signature color.
- **Glassmorphism** ringan pada card/navbar (backdrop-blur + border tipis semi-transparan).
- **Micro-interactions**: hover state, magnetic button, smooth scroll-reveal (Framer Motion `whileInView`).
- **Grid/mono aesthetic**: garis grid tipis di background, monospace font untuk label kecil (mis. "// 01 — Projects").
- **Whitespace tegas**, tipografi besar & bold untuk heading, kontras dengan body text kecil.
- Konsisten dengan Tailwind v4 `@theme` token: definisikan design tokens (color, spacing, radius) di CSS layer agar mudah dikonsisten-kan di semua komponen.

### 6.2 Referensi Gaya
- Portofolio developer modern (ala Linear, Vercel, Raycast landing page) — clean, dark, precise motion.

### 6.3 Dual Theme: Personal vs Logikraf
Website ini akan punya **dua identitas warna** yang bisa di-switch (bukan cuma light/dark):

| Theme | Konteks Pemakaian | Arah Warna (contoh) |
|---|---|---|
| **Personal** | Default saat pengunjung pertama masuk — merepresentasikan Nova sebagai individu/developer | Aksen electric blue/cyan + violet, terasa personal & eksploratif |
| **Logikraf** | Diaktifkan lewat toggle (mis. saat pengunjung datang dari konteks bisnis/klien Logikraf) — merepresentasikan brand studio | Palet mengikuti brand guideline Logikraf yang sudah ada (selaraskan dengan [[logikraf-id]] design system agar konsisten) |

- Implementasi via Tailwind v4 `@theme` dengan CSS custom properties per-tema (`data-theme="personal"` / `data-theme="logikraf"`), di-switch lewat toggle di navbar, tersimpan di `localStorage`.
- Struktur konten (copy, section) tetap sama — yang berubah hanya token warna, gradient, dan mungkin logo/wordmark kecil di navbar.

---

## 7. Non-Functional Requirements

| Aspek | Target |
|---|---|
| Performance | Lighthouse Performance ≥ 90 |
| SEO | Meta tags dinamis, OpenGraph image, sitemap.xml, robots.txt |
| Accessibility | Kontras warna sesuai WCAG AA meski dark theme |
| Responsive | Mobile-first, breakpoint standar Tailwind |
| Security | Rate limiting form kontak, sanitasi input |
| Maintainability | Konten proyek/CV disimpan sebagai data terstruktur (JSON/MDX) agar mudah update tanpa ubah kode komponen |

---

## 8. Deployment ke DirectAdmin (Node.js App)

1. Build project secara lokal: `next build` (mode production, bukan development seperti default di screenshot).
2. Siapkan `server.js` custom sebagai **Application startup file** untuk menjalankan `next start` di port yang di-assign Passenger (`process.env.PORT`).
3. Upload hasil build (`.next`, `public`, `package.json`, `server.js`, `node_modules` atau install via NPM di panel) ke **Application root**.
4. Set **Application mode** ke `Production` (bukan Development seperti pada screenshot saat ini).
5. Set **Application URL** ke `novanurachman.my.id`.
6. Tambahkan **Environment variables** yang dibutuhkan (mis. `NODE_ENV=production`, kredensial SMTP untuk form kontak).
7. Restart aplikasi via DirectAdmin setelah setiap deploy.

---

## 9. Roadmap / Fase Pengerjaan

| Fase | Deliverable |
|---|---|
| Fase 1 | Setup project, design system (Tailwind v4 theme), layout dasar |
| Fase 2 | Hero, About, Experience, Skills |
| Fase 3 | Projects showcase + detail case study |
| Fase 4 | CV page + PDF export, Contact form + email integration |
| Fase 5 | Polish animasi, SEO, testing performa |
| Fase 6 | Deploy ke DirectAdmin, testing production |

---

## 10. Out of Scope (v1)

- Multi-language (i18n) — bisa ditambahkan di v2.
- Blog penuh — hanya jika dibutuhkan di fase lanjutan.

---

## 11. Keputusan Terkonfirmasi

- ✅ Menggunakan **CMS ringan (headless, mis. Sanity.io)** untuk konten proyek/CV/skill — bukan file-based only.
- ✅ Menggunakan **dua tema warna** yang bisa di-switch: **Personal** (default) dan **Logikraf** (brand studio) — lihat bagian 6.3.
