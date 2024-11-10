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

app.use('/user', proxy('http://localhost:8010'))
app.use('/product', proxy('http://localhost:8020'))
app.use('/cart', authenticateJWT, proxy('http://localhost:8030'))
app.use('/order', authenticateJWT, proxy('http://localhost:8040'))

app.listen(process.env.PORT, () => {
    console.log(`API gateway running on http://localhost:${process.env.PORT}`);
});