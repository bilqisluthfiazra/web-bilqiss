// ===================== LOGIN =====================
if (document.getElementById("btn-login")) {
  document.getElementById("btn-login").addEventListener("click", async () => {
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();
      const error = document.getElementById("error-login");

      if (username === "" || password === "") {
          error.textContent = "Harap isi semua kolom.";
          return;
      }

      try {
          const res = await fetch("/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ username, password }),
          });

          const data = await res.json();
          alert(data.message);

          if (data.status === 200) {
              window.location.href = "web12.html"; // halaman utama
          }

      } catch (err) {
          console.error(err);
          error.textContent = "Terjadi kesalahan server.";
      }
  });
}

// ===================== REGISTER =====================
if (document.getElementById("btn-register")) {
  document.getElementById("btn-register").addEventListener("click", async () => {
      const username = document.getElementById("new-username").value.trim();
      const password = document.getElementById("new-password").value.trim();
      const error = document.getElementById("error-register");

      if (username === "" || password === "") {
          error.textContent = "Harap isi semua kolom.";
          return;
      }

      try {
          const res = await fetch("/register", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ username, password }),
          });

          const data = await res.json();
          alert(data.message);

          if (data.status === 200) {
              window.location.href = "login.html";
          }

      } catch (err) {
          console.error(err);
          error.textContent = "Terjadi kesalahan server.";
      }
  });
}
