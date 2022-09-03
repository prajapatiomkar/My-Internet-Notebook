const express = require("express");
const body_parser = require("body-parser");
const _ = require("lodash");

const app = express();

let dateAndTime = new Date();
var option = {
    year: "numeric",
    month: "short",
    day: "numeric"
}
var day = dateAndTime.toLocaleDateString("en-US", option);



app.set("view engine", "ejs");
app.use(body_parser.urlencoded({ extended: true }));
app.use(express.static("public"));

let blogArray = [];

app.get("/", (req, res) => {
    res.render("home", { m_message: blogArray,dAndT:day });
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/docs", (req, res) => {
    res.render("docs");
});

app.get("/create", (req, res) => {
    res.render("create");
});

app.post("/create", (req, res) => {
    let message = {
        title: req.body.blog_title,
        description: req.body.blog_description
    }

    blogArray.push(message);
    res.redirect("/")
});

app.get("/delete", (req, res) => {
    blogArray.pop();
    res.redirect("/")
})
app.get("/clear", (req, res) => {
    blogArray = []
    res.redirect("/")
})






app.listen(process.env.PORT || 3000, () => {
    console.log("Server Started Listening at PORT 3000. http://localhost:3000");
});

