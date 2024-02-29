const express = require("express");
const router = express.Router();
const sites = require("../data.json");

/* GET home page. */
router.get("/", (req, res) => {
    res.json(sites);
});

module.exports = router;
