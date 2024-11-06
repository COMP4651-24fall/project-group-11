const express = require("express");

const app = express();
const PORT = 8030;

app.get('/', (req, res) => {
    res.send("cart");
})

app.listen(PORT, () => {
    console.log(`Cart Service running on http://localhost:${PORT}`);
});