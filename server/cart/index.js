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

app.get('/:user_id', (req, res) => {
    const user_id = req.params.user_id;
    const query = 'SELECT * FROM carts WHERE user_id = ?';
    
    db.query(query, [user_id], (err, results) => {
        if (err) {
            console.error('Error retrieving cart items by user id:', err);
            return res.status(500).json({ error: 'Error retrieving cart' });
        }
        res.json(results);
    });
});

app.post('/', (req, res) => {
    const { user_id, product_id } = req.body;
    try {
        const existingCartItem = db.query('SELECT * FROM carts WHERE user_id = ? AND product_id = ?', [user_id, product_id]);
        if (existingCartItem.length > 0) {
          db.query('UPDATE carts SET quantity = quantity + 1 WHERE user_id = ? AND product_id = ?', [user_id, product_id]);
        } else {
          db.query('INSERT INTO carts (user_id, product_id, quantity) VALUES (?, ?, 1)', [user_id, product_id]);
        }
        res.status(200).json({ message: 'Item added to cart successfully' });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ error: 'An error occurred while adding item to cart' });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Cart Service running on http://localhost:${process.env.PORT}`);
});