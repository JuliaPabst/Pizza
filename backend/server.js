const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const port = 9001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("frontend"));
app.use("/pizza/list", express.static("frontend/src/list"));
app.use("/order", express.static("frontend/src/order"));

const pizzasRaw = fs.readFileSync(`${__dirname}/../pizzas.json`, "utf8");

app.listen(port, () => console.log(`http://127.0.0.1:${port}/pizza/list`));
