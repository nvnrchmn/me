# Implementasi Fitur Visitor Analytics

## Dikerjakan
- **Database (Prisma)**:
  - [prisma/schema.prisma](file:///d:/NOVA/PROJECT/novanurachman-my-id/prisma/schema.prisma): Menambahkan model `Visitor` untuk merekam alamat IP, User-Agent, Data Geografis (Negara, Provinsi, Kota, Lat/Lon, ISP), serta URL pendaratan pertama (*path*).
  - Skema telah didorong ke database MySQL melalui `npx prisma db push`.
- **API Endpoint**:
  - [src/app/api/track/route.ts](file:///d:/NOVA/PROJECT/novanurachman-my-id/src/app/api/track/route.ts): Membuat REST API yang akan menangkap request kunjungan. Endpoint ini akan mengambil *IP Address*, lalu melakukan pengecekan data *Geo-IP* secara transparan melalui layanan gratis **ip-api.com**.
  - Terdapat mekanisme proteksi agar sistem hanya mencatat 1 IP unik per hari untuk mencegah ledakan (*spam*) data database.
- **Client Tracker**:
  - [src/components/layout/visitor-tracker.tsx](file:///d:/NOVA/PROJECT/novanurachman-my-id/src/components/layout/visitor-tracker.tsx): Komponen nir-UI (*invisible*) yang menempel di Root Layout.
  - [src/app/layout.tsx](file:///d:/NOVA/PROJECT/novanurachman-my-id/src/app/layout.tsx): Menyuntikkan komponen pelacak ini. Tracker akan menembak API `/api/track` tepat satu kali saat pengunjung pertama kali membuka browser dengan bantuan proteksi status `sessionStorage`.
- **Admin Dashboard**:
  - [src/app/actions/admin.ts](file:///d:/NOVA/PROJECT/novanurachman-my-id/src/app/actions/admin.ts): Menyediakan dua Server Actions: `getVisitors` dan `deleteVisitor`.
  - [src/app/admin/visitors/page.tsx](file:///d:/NOVA/PROJECT/novanurachman-my-id/src/app/admin/visitors/page.tsx) & `client.tsx`: Tabel interaktif di sisi panel Superadmin untuk menjabarkan hasil pelacakan lengkap beserta opsi penumpasan (*delete*) riwayat.
  - [src/app/admin/layout.tsx](file:///d:/NOVA/PROJECT/novanurachman-my-id/src/app/admin/layout.tsx): Menambahkan tombol "Visitors" berlambang globe di menu navigasi samping Admin.

## Diasumsikan
- Metode "Unique Visitor per Day" menggunakan penyandingan waktu lokal server (jam 00:00 hari ini). Jika server di-hosting di zona waktu *UTC*, maka riset hari akan mengikuti *UTC*.

## Belum diverifikasi
- Server lokal Prisma gagal mem-*build* *Query Engine* secara dinamis karena adanya *lock file* akibat status `npm run dev` yang masih aktif di jendela terminal Anda selama proses generasi database. 
- Saat ini API me-retur *500 Internal Server Error* murni karena ketiadaan koneksi ke *Model Prisma* terbaru tersebut. Anda WAJIB me-restart terminal agar sinkronisasi terjadi.
