const express = require("express");
const path = require("path");
const router = express.Router();
const fs = require("fs");
const pizzasRaw = fs.readFileSync(`${__dirname}/../pizzas.json`, "utf8");
const pizzas = JSON.parse(pizzasRaw);
const allergeneRaw = fs.readFileSync(`${__dirname}/../allergene.json`, "utf8");
const allergene = JSON.parse(allergeneRaw);

router.get("/", (req, res) => {
  res.render(path.join(`${__dirname}/../views/index.html`));
});

router.post("/", (req, res) => {
  req.body = JSON.stringify(req.body);
  fs.writeFile(path.join(`${__dirname}/../orders.json`), req.body, (err) => {});
  res.json(req.body);
});

module.exports = router;
