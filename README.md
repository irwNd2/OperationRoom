# OperationRoom

Sebuah REST API sederhana yang mengakomodasi pemesanan sebuah ruang operasi dimana jarak satu operasi ke operasi lainnya minimal 2 jam. Jika seorang dokter ingin memesan sebuah kamar operasi, dokter tersebut harus menyampaikan tanggal dan jam kapan dia mau menggunakan kamar operasi tersebut dan estimasi durasinya.

### Endpoint

```
POST /bookingkamaroperasi/:booking/:duration
```

Parameter:
```
booking: string,
duration: number
```

Pada aplikasi ini, parameter *booking* harus berupa sebuah string dengan format *YYYY-MM-DDTHH:MM*, dimana *YYYY* adalah tahun, *MM* adalah bulan, *DD* adalah hari, *HH* adalah jam (dalam format 24 jam) dan *MM* adalah menit. Nilai *bookingDate* dan *startTime* kemudian diekstrak dari parameter tersebut dengan menggunakan perintah split karakter 'T'.

Beberapa contoh parameter yang valid:
```
 - 2023-01-09T09:00 (9 Januari 2023 jam 09:00 AM)
 - 2022-12-25T15:30 (12 Desember 2022 jam 03:30 PM)
```

Contoh, untuk memesan ruang operasi tanggal 9 Januari 2023 pada jam 09:00 AM selama 2 jam, endpoint dan parameternya akan menjadi seperti ini:

```
POST /bookingkamaroperasi/2023-01-09T09:00/2
```

