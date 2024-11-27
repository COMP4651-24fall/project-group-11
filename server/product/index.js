const express = require("express");
const cors = require('cors');
const mysql = require("mysql");
const serverless = require("serverless-http");
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

db.connect((err) => {
    if (err) throw err;
    console.log("Connected to RDS");
});

const app = express();
app.use(express.json());
app.use(cors());

const productRouter = express.Router();

productRouter.get('/', (req, res) => {
    const query = 'SELECT * FROM products';
  
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

productRouter.get('/:type', (req, res) => {
    const type = req.params.type;
    const query = 'SELECT * FROM products WHERE type = ?';
  
    db.query(query, [type], (err, results) => {
        if (err) {
            console.error('Error retrieving products by type:', err);
            return res.status(500).json({ error: 'Error retrieving products' });
        }
        res.json(results);
    });
});

productRouter.get('/id/:id', (req, res) => {
    const product_id = req.params.id;
    const query = 'SELECT * FROM products WHERE product_id = ?';

    db.query(query, [product_id], (err, results) => {
        if (err) {
            console.error('Error retrieving products by Product Id:', err);
            return res.status(500).json({ error: 'Error retrieving products' });
        }
        res.json(results[0]); // Only return one product
    });
});

productRouter.post('/', (req, res) => {
    const { type, description, image_url, price } = req.body;

    const query = `
        INSERT INTO products (type, description, image_url, price) 
        VALUES (?, ?, ?, ?)
    `;

    db.query(query, [type, description, image_url, price], (err, results) => {
        if (err) {
            console.error('Error creating product:', err);
            return res.status(500).json({ error: 'Error creating product' });
        }
        res.status(201).json({ message: 'Product created', productId: results.insertId });
    });
});

app.use('/product', productRouter);

module.exports.handler = serverless(app);