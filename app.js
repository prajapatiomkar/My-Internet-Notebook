const express = require("express");
const body_parser = require("body-parser");
const _ = require("lodash");

const app = express();
app.set("view engine", "ejs");
app.use(body_parser.urlencoded({ extended: true }));
app.use(express.static("public"));



app.get("/", (req, res) => {
    res.render("home");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/docs", (req, res) => {
    res.render("docs");
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server Started Listening at PORT 3000. http://localhost:3000");
});

