const mongoose = require("mongoose");
const express = require("express");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.send("hi");
});

const mongoDB =
    "mongodb+srv://admin:ronakraj1@cluster0.bjksk03.mongodb.net/authentication?retryWrites=true&w=majority";

(async function main() {
    await mongoose.connect(mongoDB);
    console.log("connected");
})().catch((err) => console.log(err));

app.listen(PORT, () => console.log("Server listening at localhost:" + PORT));
