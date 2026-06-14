
console.log("yoyo");
const express = require("express");g
console.log("Hello")
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});