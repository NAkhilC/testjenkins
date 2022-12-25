"use strict";

const express = require("express");
// App
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

// Constants
const PORT = 8080;
const HOST = "0.0.0.0";

app.get("/", (req, res) => {
  res.render("firstpage");
});

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});
