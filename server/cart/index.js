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
    const query = 'SELECT c.*, p.* FROM cart.carts AS c JOIN product.products AS p ON c.product_id = p.product_id WHERE c.user_id = ?';
    
    db.query(query, [user_id], (err, results) => {
        if (err) {
            console.error('Error retrieving all cart items by user id:', err);
            return res.status(500).json({ error: 'Error retrieving cart' });
        }
        res.json(results);
    });
});

app.get('/', (req, res) => {
    const query = 'SELECT * FROM carts';
    
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        
        res.json(results);
    });
});

app.post('/', (req, res) => {
    const { user_id, product_id } = req.body;
    db.query('SELECT * FROM carts WHERE user_id = ? AND product_id = ?', [user_id, product_id], (err, results) => {
        if (err) {
            console.error('Error adding item to cart:', err);
            res.status(500).json({ error: 'An error occurred while adding item to cart' });
        }
        if (results != null && results.length > 0) {
            db.query('UPDATE carts SET quantity = quantity + 1 WHERE user_id = ? AND product_id = ?', [user_id, product_id]);
        } else {
            db.query('INSERT INTO carts (user_id, product_id, quantity) VALUES (?, ?, 1)', [user_id, product_id]);
        }
        res.status(200).json({ message: 'Item added to cart successfully' });
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Cart Service running on http://localhost:${process.env.PORT}`);
});