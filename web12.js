if (document.getElementById('user-name')) {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const activeUser = localStorage.getItem('activeUser');
  
    if (!isLoggedIn) {
      window.location.href = "login.html";
    } else {
      document.getElementById('user-name').textContent = activeUser;
    }
  }

/*Kritik dan saran*/
function kirimWhatsapp() {
    const nomor = "6287836530514";
    const pesan = document.getElementById("pesan").value.trim(); // pakai trim() untuk hilangkan spasi
  
    if (pesan === "") {
      alert("Pesan tidak boleh kosong!");
      return; // hentikan fungsi
    }
  
    const url = "https://wa.me/" + nomor + "?text=" + encodeURIComponent(pesan);
    window.open(url, "_blank");
  }
  
    
    
  /*sidebar*/
  /*bisa make karna ada penggunaan simbol yg sdh ada*/
  document.addEventListener("DOMContentLoaded", function() {
        const menuBtn = document.getElementById("menu-btn");
        const sidebar = document.getElementById("sidebar");
        const closeBtn = document.getElementById("close-btn");
  /*jika menu diklik maka tampilin yg lain*/
        menuBtn.addEventListener("click", function() {
          sidebar.classList.add("active");
          /*nambah css atau ngeaktifin css*/
        });
  
        closeBtn.addEventListener("click", function() {
          sidebar.classList.remove("active");
          /*matiin cssnya*/
        });
      });
  
  
      
  /*keranjang*/
      const produkList = [
        { nama: "Makaroni Pedas", harga: 4000, qty: 0 },
        { nama: "Makaroni Keju", harga: 4000, qty: 0 },
        { nama: "Makaroni Jagung Manis", harga: 4000, qty: 0 }
      ];
  
      // Fungsi update tampilan
      function updateDisplay() {
        let totalQty = 0;
        let totalHarga = 0;
        let isiKeranjang = "";
  
        produkList.forEach((p, i) => {
          if (p.qty > 0) {
            isiKeranjang += `
              <li>
                ${p.nama} — ${p.qty} pcs x Rp ${p.harga.toLocaleString()} = Rp ${(p.qty * p.harga).toLocaleString()}
                <button onclick="kurang(${i})">-</button>
                <button onclick="tambah(${i})">+</button>
              </li>`;
          }
          totalQty += p.qty;
          totalHarga += p.qty * p.harga;
        });
  
        document.getElementById('keranjang').innerHTML = isiKeranjang || "<li>Keranjang kosong</li>";
        document.getElementById('qty').textContent = totalQty;
        document.getElementById('total').textContent = "Rp" + totalHarga.toLocaleString();
      }
  
      // Fungsi tambah & kurang per produk
      function tambah(index) {
        produkList[index].qty++;
        updateDisplay();
      }
  
      function kurang(index) {
        if (produkList[index].qty > 0) {
          produkList[index].qty--;
          updateDisplay();
        }
      }
  
      // Kurangi semua qty satu per satu (opsional)
      function kurangSemua() {
        produkList.forEach(p => {
          if (p.qty > 0) p.qty--;
        });
        updateDisplay();
      }
  
      // Reset semua produk
      function resetQty() {
        produkList.forEach(p => p.qty = 0);
        updateDisplay();
      }
  
      // Checkout ke WhatsApp
      function checkout() {
        const produkDipesan = produkList.filter(p => p.qty > 0);
        if (produkDipesan.length === 0) {
          alert("Tambah dulu produknya!");
          return;
        }
  
        let pesan = "Halo! Saya ingin beli:\n\n";
        let total = 0;
  
        produkDipesan.forEach(p => {
          pesan += ` ${p.nama} - ${p.qty} pcs x Rp ${p.harga.toLocaleString()} = Rp ${(p.qty * p.harga).toLocaleString()}\n`;
          total += p.qty * p.harga;
        });
  
        pesan += `\n Total: Rp ${total.toLocaleString()}`;
  
        const noWA = "6287836530514"; // Ganti dengan nomor WA kamu
        const link = `https://wa.me/${noWA}?text=${encodeURIComponent(pesan)}`;
        window.open(link, '_blank');
      }
  
      updateDisplay();
   
  
  
  // ==== REVIEW PRODUK ====
  let rating = 0;
  const stars = document.querySelectorAll('.star');
  const daftarReview = document.getElementById('daftarReview');
  const namaInput = document.getElementById('nama');
  const komentarInput = document.getElementById('komentar');
  
  // klik bintang untuk rating
  stars.forEach((star, i) => {
    star.onclick = () => {
      rating = i + 1;
      stars.forEach((s, j) => s.classList.toggle('active', j < rating));
    };
  });
  
  // kirim review
  document.getElementById('kirimReview').onclick = () => {
    const nama = namaInput.value.trim();
    const komentar = komentarInput.value.trim();
    if (!nama || !komentar || rating === 0) return alert('Mohon isi nama, review, dan pilih rating bintang.');
  
    const reviewBaru = document.createElement('div');
    reviewBaru.className = 'review-item';
    reviewBaru.innerHTML = `
      <div class="review-rating">${'⭐'.repeat(rating)}</div>
      <h4 class="review-nama">${nama}</h4>
      <p class="review-komentar">"${komentar}"</p>
      <button class="edit-review">Edit</button>
      <button class="hapus-review">Hapus</button>
    `;
    daftarReview.prepend(reviewBaru);
  
    // reset form
    namaInput.value = '';
    komentarInput.value = '';
    stars.forEach(s => s.classList.remove('active'));
    rating = 0;
  };
  
  // edit & hapus review menggunakan event delegation
  daftarReview.onclick = e => {
    const review = e.target.closest('.review-item');
    if (!review) return;
  
    if (e.target.classList.contains('hapus-review')) review.remove();
  
    if (e.target.classList.contains('edit-review')) {
      namaInput.value = review.querySelector('.review-nama').textContent;
      komentarInput.value = review.querySelector('.review-komentar').textContent.replace(/"/g,'');
      rating = review.querySelector('.review-rating').textContent.length;
      stars.forEach((s, i) => s.classList.toggle('active', i < rating));
      review.remove();
    }

    fetch("/check-login")
    .then(res => res.json())
    .then(data => {
        if (!data.loggedIn) {
            window.location.href = "login.html";
        }
    });

  };
