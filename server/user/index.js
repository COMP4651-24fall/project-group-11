const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

db.connect((err) => {
    if (err) throw err;
    console.log("Connected");
})

const app = express();

app.use(express.json());

app.post('/signup', (req, res) => {
    const { email, password, username } = req.body;

    const query = `
        INSERT INTO users (email, password, username) 
        VALUES (?, ?, ?)
    `;

    db.query(query, [email, bcrypt.hashSync(password, 10), username], (err, results) => {
        if (err) {
            console.error('Error creating user:', err);
            return res.status(500).json({ error: 'Error creating user' });
        }
        res.status(201).json({ message: 'User created', productId: results.insertId });
    });
})

app.post('/signin', (req, res) => {
    const { email, password } = req.body;

    const query = `SELECT password FROM users WHERE email = ?`;
    db.query(query, [email], (err, results) => {
        if (err) {
            console.error('Error creating product:', err);
            return res.status(500).json({ error: 'Error creating product' });
        }
        if (!results.length || !bcrypt.compareSync(password, results[0].password)) {
            return res.status(400).json({ error: 'Incorrect email/password' });
        }
        res.status(200).json({ message: 'Login Success' });
    });
})

app.listen(process.env.PORT, () => {
    console.log(`User Service running on http://localhost:${process.env.PORT}`);
});