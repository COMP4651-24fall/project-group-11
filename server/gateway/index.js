const express = require("express");
const cors = require('cors');
const proxy = require('express-http-proxy')

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

app.use('/user', proxy('http://localhost:8010'))
app.use('/product', proxy('http://localhost:8020'))
app.use('/cart', proxy('http://localhost:8030'))
app.use('/order', proxy('http://localhost:8040'))

app.get('/', (req, res) => {
    res.send("gateway");
})

app.listen(PORT, () => {
    console.log(`User Service running on http://localhost:${PORT}`);
});