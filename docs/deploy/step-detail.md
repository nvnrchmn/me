# Panduan Deployment: Next.js 15+ di DirectAdmin (Node.js Selector / Phusion Passenger)

Dokumen ini menjelaskan langkah demi langkah cara melakukan peluncuran (deployment) aplikasi **Next.js 15+ (App Router)** yang menggunakan **Prisma** dan **MySQL** ke dalam *shared hosting* atau *VPS* yang menggunakan panel **DirectAdmin** (dengan fitur *Setup Node.js App*).

---

## 1. Persiapan Database (MySQL)
Sebelum mengunggah kode, siapkan pangkalan data (database) terlebih dahulu:
1. Login ke panel DirectAdmin.
2. Buka menu **MySQL Management**.
3. Klik **Create New Database**.
4. Isi Nama Database, Username, dan Password.
5. Simpan kredensial tersebut dengan baik karena akan kita butuhkan di langkah selanjutnya.

## 2. Mengunggah Kode / Clone Repositori
Karena kita akan membangun aplikasi langsung di dalam server (menghindari error arsitektur/binari), ikuti aturan ini:
1. Buka fitur **Terminal** atau **SSH** di DirectAdmin.
2. Lakukan clone repositori Anda ke direktori yang dituju, misal:
   ```bash
   cd /home/sbdigita/
   git clone https://github.com/nvnrchmn/me.git novanurachman-my-id
   ```
3. **Penting:** Pastikan folder `node_modules` dan `.next` dari komputer lokal Anda TIDAK diunggah ke server.

## 3. Membuat Aplikasi Node.js di Panel DirectAdmin
Masuk ke menu **Setup Node.js App** di dalam cPanel/DirectAdmin dan klik **CREATE APPLICATION**.
Isi formulir pendaftaran dengan detail berikut:

- **Node.js version**: Pilih versi LTS (misal: `18.x.x` atau `20.x.x`). *Versi 24.x masih tahap pengembangan awal, hindari jika ragu.*
- **Application mode**: Pilih `Production`.
- **Application root**: Path tempat folder diletakkan (misal: `/home/sbdigita/novanurachman-my-id`).
- **Application URL**: Pilih domain atau subdomain Anda (misal: `novanurachman.my.id`).
- **Application startup file**: Ketik `server.js` (file ini sudah tersedia di dalam repositori).

### Mengatur Environment Variables
Klik tombol **+ ADD VARIABLE** untuk menambahkan *environment variables* berikut secara satu persatu:

| Nama Variabel | Contoh Value / Nilai |
|---|---|
| `DATABASE_URL` | `mysql://USER_DB:PASSWORD_DB@localhost:3306/NAMA_DB` |
| `NEXTAUTH_SECRET` | *(masukkan kunci rahasia acak, misal buatan `openssl rand -base64 32`)* |
| `NEXTAUTH_URL` | `https://novanurachman.my.id` (URL website lengkap dengan https) |
| `PORT` | *(Opsional)* Jika terjadi konflik port, isi `3000` |

Setelah semua terisi, klik tombol **CREATE** (atau **SAVE**) di pojok kanan atas.

## 4. Proses Instalasi dan Kompilasi (Build)
Setelah aplikasi berhasil dibuat, DirectAdmin akan menampilkan perintah berlatar belakang hitam untuk memasuki lingkungan virtual (*Virtual Environment*). Tulisannya biasanya seperti:
`source /home/sbdigita/nodevenv/novanurachman-my-id/20/bin/activate && cd /home/sbdigita/novanurachman-my-id`

1. **Salin (*Copy*) perintah tersebut.**
2. Buka fitur **Terminal / SSH** di DirectAdmin.
3. **Tempel (*Paste*) dan tekan Enter**. (Tampilan terminal akan berubah menandakan Anda sudah di dalam virtual env).
4. Jalankan perintah instalasi paket:
   ```bash
   npm install
   ```
5. Jalankan sinkronisasi database Prisma:
   ```bash
   npx prisma db push
   ```
6. Bangkitkan Prisma Client (Penting agar tidak terjadi error 500):
   ```bash
   npx prisma generate
   ```
7. Terakhir, lakukan Build Next.js:
   ```bash
   npm run build
   ```
   *(Pastikan proses build selesai 100% tanpa tulisan Error "Failed to compile").*

## 5. Restart Aplikasi (Live!)
1. Kembali ke antarmuka **Setup Node.js App** di panel DirectAdmin.
2. Cari aplikasi yang baru saja Anda buat.
3. Klik tombol **RESTART** (ikon panah melingkar).
4. Buka domain Anda (`https://novanurachman.my.id`) di browser. 

Website Portofolio Anda kini sudah berhasil *Live*!

---

### Solusi Masalah Umum (Troubleshooting)
- **Error 500 saat Login Admin atau Contact Form:** Terjadi karena Prisma gagal terhubung ke Database atau Prisma Client tidak di-*generate* ulang di server. Ulangi perintah `npx prisma generate` lalu **Restart** aplikasi.
- **Tampilan CSS Berantakan:** Cache lama belum terhapus. Cobalah merestart kembali Node App atau buka situs menggunakan mode *Incognito/Private*.
- **"Application Startup File Error":** Pastikan file `server.js` benar-benar berada di direktori *root* (sejajar dengan `package.json`). File tersebut wajib ada karena DirectAdmin/Passenger memerlukan *entry point* kustom selain Next.js standar.
