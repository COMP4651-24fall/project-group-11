const express = require("express");
const mysql = require("mysql");
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// carts data structure
// carts: user_id, cart_list([product_id, product_id, ...]), quantity_list([1, 1, ...])

db.connect((err) => {
    if (err) throw err;
    console.log("Connected");
})

const app = express();

app.use(express.json());

app.get('/id', (req, res) => {
    const cart_id = req.params.id;
    const query = 'SELECT * FROM carts WHERE cart_id = ?';
    
    db.query(query, [cart_id], (err, results) => {
        if (err) {
            console.error('Error retrieving cart by Cart Id:', err);
            return res.status(500).json({ error: 'Error retrieving cart' });
        }
        res.json(results[0]);
    });
});

// app.post('/', (req, res) => {
//     const { cart_id, product_id, quantity } = req.body;

//     const query_get = 'SELECT * FROM'

//     const query = `
//         INSERT INTO products (type, description, image_url, price) 
//         VALUES (?, ?, ?, ?)
//     `;

//     db.query(query, [type, description, image_url, price], (err, results) => {
//         if (err) {
//             console.error('Error creating product:', err);
//             return res.status(500).json({ error: 'Error creating product' });
//         }
//         res.status(201).json({ message: 'Product created', productId: results.insertId });
//     });
// });

app.listen(process.env.PORT, () => {
    console.log(`Cart Service running on http://localhost:${process.env.PORT}`);
});