const express = require("express");

const app = express();
const PORT = 8020;

app.get('/', (req, res) => {
    res.send("product-service");
})

app.listen(PORT, () => {
    console.log(`User Service running on http://localhost:${PORT}`);
});