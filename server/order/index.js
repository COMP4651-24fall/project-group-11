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
    console.log("Connected");
})

const app = express();
app.use(express.json());
app.use(cors());

const orderRouter = express.Router();

orderRouter.post('/create-order', (req, res) => {
    const { user_id, total_price } = req.body;
    const orderQuery = `
        INSERT INTO orders (user_id, total_price, status) 
        VALUES (?, ?, 1)
    `;
    db.query(orderQuery, [user_id, total_price], (err, orderResult) => {
        if (err) {
            console.error('Error sending order:', err);
            return res.status(500).json({ error: 'Error sending order' });
        }
        const order_id = orderResult.insertId;
        res.status(201).json({order_id});
    });
});

orderRouter.post('/add-order-items', (req, res) => {
    const { orderItemsValues } = req.body;
    const orderItemsQuery = `
        INSERT INTO order_items (order_id, product_id, quantity)
        VALUES ?
    `;
    db.query(orderItemsQuery, [orderItemsValues], (err, itemsResult) => {
        if (err) {
            console.error('Error adding order items:', err);
            return res.status(500).json({ error: 'Error adding order items' });
        }
        res.status(201).json({ message: 'Order items added' });
    });
});

app.use('/order', orderRouter);

module.exports.handler = serverless(app);