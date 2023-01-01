"use strict";

const express = require("express");
// App
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

// Constants
const PORT = 3000;

app.get("/", (req, res) => {
  res.render("firstpage");
});

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});
