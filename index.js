const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.json("hi");
});

app.listen(PORT, () => console.log("Server listening at localhost:" + PORT));
