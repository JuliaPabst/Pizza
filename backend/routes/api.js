const express = require("express");
const router = express.Router();
const fs = require("fs");
const pizzasRaw = fs.readFileSync(`${__dirname}/../pizzas.json`, "utf8");
const allergeneRaw = fs.readFileSync(`${__dirname}/../allergene.json`, "utf8");
const ordersRaw = fs.readFileSync(`${__dirname}/../orders.json`, "utf8");

router.get("/pizza", (req, res) => {
  res.json(pizzasRaw);
});

router.get("/allergene", (req, res) => {
  res.json(allergeneRaw);
});

router.get("/order/list", (req, res) => {
  res.json(JSON.parse(ordersRaw));
});

router.post("/order", (req, res) => {
  // read orders.json
  const allOrders = JSON.parse(ordersRaw);
  // add new order

  allOrders.push({ date: new Date(), ...req.body });
  // write orders.json

  fs.writeFile(
    `${__dirname}/../orders.json`,
    JSON.stringify(allOrders),
    () => {}
  );
  res.json(req.body);
});

module.exports = router;
