require("dotenv").config();

const express = require("express");
const cors = require("cors");

const router = require("./routes");
const { sequelize } = require("./models");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

try {
  (async () => {
    await sequelize.authenticate();
  })();
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
