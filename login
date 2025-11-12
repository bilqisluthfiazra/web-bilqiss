<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Makreszz - Login & Register</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');
    * { box-sizing: border-box; }

    body {
      margin: 0;
      font-family: 'Poppins', sans-serif;
      background: #e8d8c4;
      color: #4a4a4a;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      flex-direction: column;
      padding: 1rem;
    }

    .container {
      background: #fff3e6;
      padding: 2rem 2.5rem;
      border-radius: 15px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.15);
      width: 100%;
      max-width: 400px;
      text-align: center;
    }

    h2 {
      color: #bb3e1a;
      margin-bottom: 1.5rem;
    }

    input {
      width: 100%;
      padding: 0.8rem;
      margin: 0.5rem 0;
      border-radius: 8px;
      border: 1px solid #ccc;
      font-size: 1rem;
      font-family: inherit;
    }

    button {
      background-color: #561c24;
      color: white;
      border: none;
      padding: 0.8rem 2rem;
      border-radius: 30px;
      font-size: 1rem;
      cursor: pointer;
      width: 100%;
      margin-top: 1rem;
      font-weight: 600;
      transition: 0.3s ease;
    }

    button:hover {
      background-color: green;
    }

    .error-message {
      color: #561c24;
      margin-top: 0.8rem;
      font-size: 0.9rem;
    }

    .footer {
      margin-top: 1rem;
      font-size: 0.9rem;
      color: #4a4a4a;
      text-align: center;
    }

    img.logo {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin-bottom: 1rem;
    }

    a {
      color: #bb3e1a;
      text-decoration: none;
      display: block;
      margin-top: 1rem;
      font-size: 0.9rem;
    }

    .hidden {
      display: none;
    }

    /* Halaman kolos */
    .dashboard {
      text-align: center;
    }

    header {
      background: #561c24;
      color: white;
      padding: 1rem 2rem;
      border-radius: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .dashboard button {
      background: white;
      color: #bb3e1a;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-weight: bold;
      cursor: pointer;
      transition: 0.3s ease;
    }

    .dashboard button:hover {
      background: green;
      color: white;
    }

  </style>
</head>
<body>

  <img src="https://i.pinimg.com/736x/c4/96/ba/c496ba17716acb2ee4a0e8501868666e.jpg" class="logo" alt="Logo Makreszz">

  <!-- LOGIN -->
  <div id="login-page" class="container">
    <h2>Login Makreszz</h2>
    <input type="text" id="username" placeholder="Masukkan Username">
    <input type="password" id="password" placeholder="Masukkan Password">
    <button id="btn-login">Masuk</button>
    <div id="error-login" class="error-message"></div>
    <a href="#" id="go-register">Belum punya akun? Daftar di sini</a>
  </div>

  <!-- REGISTER -->
  <div id="register-page" class="container hidden">
    <h2>Daftar Akun Baru</h2>
    <input type="text" id="new-username" placeholder="Buat Username">
    <input type="password" id="new-password" placeholder="Buat Password">
    <button id="btn-register">Daftar</button>
    <div id="error-register" class="error-message"></div>
    <a href="#" id="go-login">Sudah punya akun? Login di sini</a>
  </div>

  <!-- DASHBOARD -->
  <div id="dashboard-page" class="container hidden dashboard">
    <header>
      <h3>Selamat Datang di Makreszz!</h3>
      <button id="logout">Logout</button>
    </header>
    <h2>Halo, <span id="user-name"></span> 👋</h2>
    <p>Anda berhasil login. Selamat menikmati layanan kami!</p>
  </div>

  <div class="footer">&copy; 2025 makreszz</div>

  <script>
    const loginPage = document.getElementById('login-page');
    const registerPage = document.getElementById('register-page');
    const dashboardPage = document.getElementById('dashboard-page');
    const usernameDisplay = document.getElementById('user-name');

    const showPage = (page) => {
      loginPage.classList.add('hidden');
      registerPage.classList.add('hidden');
      dashboardPage.classList.add('hidden');
      page.classList.remove('hidden');
    };

    // Pindah halaman login/register
    document.getElementById('go-register').addEventListener('click', () => showPage(registerPage));
    document.getElementById('go-login').addEventListener('click', () => showPage(loginPage));

    // Tombol Register
    document.getElementById('btn-register').addEventListener('click', () => {
      const user = document.getElementById('new-username').value.trim();
      const pass = document.getElementById('new-password').value.trim();
      const error = document.getElementById('error-register');

      if (user === '' || pass === '') {
        error.textContent = 'Harap isi semua kolom.';
        return;
      }

      localStorage.setItem('registeredUser', user);
      localStorage.setItem('registeredPass', pass);

      alert('Pendaftaran berhasil! Silakan login.');
      showPage(loginPage);
    });

    // Tombol Login
    document.getElementById('btn-login').addEventListener('click', () => {
      const user = document.getElementById('username').value.trim();
      const pass = document.getElementById('password').value.trim();
      const error = document.getElementById('error-login');

      if (user === '' || pass === '') {
        error.textContent = 'Harap isi semua kolom.';
        return;
      }

      const regUser = localStorage.getItem('registeredUser');
      const regPass = localStorage.getItem('registeredPass');

      if (user === regUser && pass === regPass) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('activeUser', user);
        usernameDisplay.textContent = user;
        showPage(dashboardPage);
      } else {
        error.textContent = 'Username atau password salah.';
      }
    });

    // Logout
    document.getElementById('logout').addEventListener('click', () => {
      localStorage.removeItem('isLoggedIn');
      showPage(loginPage);
    });

    // Cek login saat reload
    window.onload = () => {
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      const activeUser = localStorage.getItem('activeUser');
      if (isLoggedIn && activeUser) {
        usernameDisplay.textContent = activeUser;
        showPage(dashboardPage);
      } else {
        showPage(loginPage);
      }
    };
  </script>

</body>
</html>
