const express = require("express");
const path = require("path");
const bcrypt = require("bcryptjs");     // TAMBAH
const db = require("./db");             // TAMBAH

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

/* REGISTER */
app.post("/register", (req, res) => {
    const { username, password } = req.body;

    const hashed = bcrypt.hashSync(password, 10);

    db.query(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        [username, hashed],
        (err) => {
            if (err) return res.json({ status: 500, message: "Register gagal" });
            res.json({ status: 200, message: "Register berhasil" });
        }
    );
});

/* LOGIN */
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    db.query(
        "SELECT * FROM users WHERE username = ?",
        [username],
        (err, results) => {
            if (err) return res.json({ status: 500 });

            if (results.length === 0)
                return res.json({ status: 404, message: "User tidak ditemukan" });

            const user = results[0];

            if (!bcrypt.compareSync(password, user.password)) {
                return res.json({ status: 401, message: "Password salah" });
            }

            res.json({ status: 200, message: "Login berhasil" });
        }
    );
});

app.get("/check-login", (req, res) => {
    res.json({ loggedIn: true });
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
