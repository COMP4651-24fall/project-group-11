const express = require("express");

const app = express();
const PORT = 8010;

app.get('/', (req, res) => {
    res.send("user");
})

app.listen(PORT, () => {
    console.log(`User Service running on http://localhost:${PORT}`);
});