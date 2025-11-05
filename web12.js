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
    let qty = 0;
    const harga = 13000;

    function updateDisplay() {
      document.getElementById('qty').textContent = qty;
      document.getElementById('total').textContent = (qty * harga).toLocaleString();
    }

    function tambah() {
      qty++;
      updateDisplay();
    }

    function kurang() {
      if (qty > 0) {
        qty--;
        updateDisplay();
      }
    }
    
     function resetQty() {
      qty = 0;
      updateDisplay();
    }

    function checkout() {
      if (qty === 0) {
        alert("Tambah dulu produknya!");
        return;
      }
      const pesan = `Halo! Saya ingin beli Chicken katsunya sebanyak ${qty} pcs. Total: Rp.  ${(qty * harga).toLocaleString()}`;
      const noWA = "6287836530514"; // Ganti dengan nomor WA kamu
      const link = `https://wa.me/${noWA}?text=${encodeURIComponent(pesan)}`;
      window.open(link, '_blank');
    }

 


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
};

