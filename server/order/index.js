const express = require("express");

const app = express();
const PORT = 8040;

app.get('/', (req, res) => {
    res.send("order");
})

app.listen(PORT, () => {
    console.log(`Order Service running on http://localhost:${PORT}`);
});