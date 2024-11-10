const express = require("express");
const cors = require('cors');
const proxy = require('express-http-proxy')
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.sendStatus(403);
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

const app = express();

app.use(cors());
app.use(express.json());

app.use('/user', proxy(process.env.USER_SERVICE))
app.use('/product', proxy(process.env.PRODUCT_SERVICE))
app.use('/cart', authenticateJWT, proxy(process.env.CART_SERVICE))
app.use('/order', authenticateJWT, proxy(process.env.ORDER_SERVICE))

app.listen(process.env.PORT, () => {
    console.log(`API gateway running on http://localhost:${process.env.PORT}`);
});