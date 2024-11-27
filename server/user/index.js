const express = require("express");
const cors = require('cors');
const serverless = require("serverless-http");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
app.use(cors());

const userRouter = express.Router();

userRouter.post('/signup', (req, res) => {
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
        res.status(201).json({ message: 'User created' });
    });
})

userRouter.post('/signin', (req, res) => {
    const { email, password } = req.body;

    const query = `SELECT password FROM users WHERE email = ?`;
    db.query(query, [email], (err, results) => {
        if (err) {
            console.error('Error creating product:', err);
            return res.status(500).json({ error: 'Error' });
        }
        if (!results.length || !bcrypt.compareSync(password, results[0].password)) {
            return res.status(400).json({ error: 'Incorrect email/password' });
        }
        const getUsername = `SELECT user_id, username FROM users WHERE email = ?`;
        db.query(getUsername, [email], (err, results) => {
            if (err) {
                console.error('Error creating product:', err);
                return res.status(500).json({ error: 'Error' });
            }
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ message: 'Login Success', userId: results[0].user_id, username: results[0].username, token });
        })
    });
})

app.use('/user', userRouter);

module.exports.handler = serverless(app);