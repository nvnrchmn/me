# Setup Fase 1 - Framework & Design System

## Dikerjakan
- Menginisialisasi project Next.js 15+ App Router di direktori root.
- Konfigurasi Tailwind CSS v4 dengan menggunakan sintaks `@theme` inline di `src/app/globals.css`.
- Mengatur *dual theme* (Personal vs Logikraf) menggunakan CSS variables dan data attribute `data-brand` yang dikontrol melalui Context API `BrandProvider`.
- Menambahkan integrasi *dark/light mode* yang dikontrol melalui `next-themes` (menggunakan class `dark`).
- Membuat struktur `Navbar` dan `Footer` interaktif lengkap dengan toggle switch untuk tema.
- Membuat skeleton CMS kustom dengan data statis lokal berformat JSON (`src/data/projects.json` dan `src/data/experience.json`) yang siap dibaca oleh API Functions (`src/lib/api.ts`).

## Diasumsikan
- CMS kustom sementara menggunakan file JSON statis, mengasumsikan karena tidak jadi menggunakan Sanity.io, data akan tetap di-maintain secara manual via JSON di fase awal ini hingga ditambahkan form admin lokal jika perlu.
- Struktur data JSON menggunakan kolom wajib (`id`, `title`, `description`, dsb) yang paling umum untuk portofolio.

## Belum Diverifikasi
- Deployment ke DirectAdmin (Passenger Node.js) belum bisa diverifikasi secara langsung di dalam workspace lokal dan harus diuji di production / live server nantinya.
