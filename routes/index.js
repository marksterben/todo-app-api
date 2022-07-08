const express = require("express");
const apiRouter = require("./api.js");

const router = express.Router({ caseSensitive: true });

router.use("/api", apiRouter);

module.exports = router;
