const mongoose = require("mongoose");
const express = require("express");
const sites = require("./data.json");

const app = express();
const PORT = 3000;

app.use(express.static('./public'));

app.get("/", (req, res) => {
    res.json(sites);
});

const mongoDB =
    "mongodb+srv://admin:ronakraj1@cluster0.bjksk03.mongodb.net/authentication?retryWrites=true&w=majority";

(async function main() {
    await mongoose.connect(mongoDB);
    console.log("connected");
})().catch((err) => console.log(err));

app.listen(PORT, () => console.log("Server listening at localhost:" + PORT));
