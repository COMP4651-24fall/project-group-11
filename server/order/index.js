const express = require("express");
const mysql = require("mysql");
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

app.listen(process.env.PORT, () => {
    console.log(`Cart Service running on http://localhost:${process.env.PORT}`);
});