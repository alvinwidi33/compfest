# Compfest Frontend (HARAP BACA)

### React.Js Framework
1. Buka terminal pada directory proyek
2. Jalankan ```npm start``` atau ```npm run start``` atau buka di link **https://seasalon.vercel.app**
3. Lakukan register dengan menggunakan email asli
4. Setelah register, buka email untuk melakukan verifikasi email (terkirimnya mungkin agak lama untuk pertama kali)
5. Username emailnya adalah *cropnesia@gmail.com*
6. Buka di spam atau di inbox (biasanya di spam) ubah jadi not-spam terlebih dahulu
7. Login baru berhasil ketika email sudah diverifikasi
8. Sesuai dengan soal hanya customer dengan status Member yang bisa melakukan reservasi
9. Login dulu sebagai admin username : thomas.n pw: Admin123
10. Menuju ke halaman customer dan ubah status customer menjadi member
11. Setelah itu kembali login ke customer baru bisa melakukan reservasi
12. Pada soal tertera bahwa treatment dilakukan selama 1 jam. Maka, ketika salon tutup pukul 21.00, customer tidak bisa memilih jam reservasi 20.01, karena akan selesai melebihi jam 21.00
13. setelah reservasi berhasil dibuat, customer bisa men-cancel reservasi atau menyelesaikan reservasi
14. jika reservasi di cancel atau treatment selesai bisa muncul di halaman riwayat reservasi
15. customer yang melakukan cancel tidak bisa memberikan ulasan, hanya yang reservasinya selesai yang bisa memberikan ulasan
   
Note :
  1. Harus sudah menginstall npm dan dependency lain yang dibutuhkan.
  2. Jika ada dependency yang belum terinstall pada local biasanya terjadi error. Contoh : belum menginstall react-icons, tailwinds
  ### Tailwind
  ``` 
  npm install -D tailwindcss postcss autoprefixer
  npm tailwindcss init -p
  ```
  ### React Icons
  ```npm install react-icons```

  ### Date FNS ###
  ```npm install date-fns```

  ### React Router DOM
  ```npm install react-router-dom```

  ### React Scripts
  ``` npm install react-scripts```
  
  ### React Slick
  ```npm install react-slick```

  ### Slick Carousel
  ```npm install slick-carousel```

  ### Styled Components
  ```npm install styled-components```
  
  ### Supabase
  ```npm install @supabase/supabase-js```

  (Seinget saya hanya pakai itu)

  3. Data dari backend diambil menggunakan link API yang ada pada backend **https://compfest-be.vercel.app** (sesuaikan link API yang ada)
  4. Saya sudah deploy juga, maka dari itu lebih baik buka dari **https://seasalon.vercel.app**
