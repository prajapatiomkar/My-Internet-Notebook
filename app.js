const express = require("express");
const body_parser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const { render } = require("ejs");
const app = express();

app.set("view engine", "ejs");
app.use(body_parser.urlencoded({ extended: true }));
app.use(express.static("public"));
mongoose.connect("mongodb+srv://admin:admin@blog-website.ilb9vth.mongodb.net/blogWebsiteDB");

const postSchema = {
    Title: String,
    Description: String,
    ImageLink: String,
    Date: String
}
const posts = mongoose.model("posts", postSchema);

let dateAndTime = new Date();
var option = {
    year: "numeric",
    month: "short",
    day: "numeric"
}
var day = dateAndTime.toLocaleDateString("en-US", option);





let blogArray = [];

app.get("/", (req, res) => {

    posts.find({}, function (err, foundItem) {
        res.render("home", { m_message: foundItem });
    })


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

    const item = new posts({
        Title: req.body.blog_title,
        Description: req.body.blog_description,
        ImageLink: req.body.blog_image,
        Date: day
    })

    item.save()
    res.redirect("/");
});


app.get("/clear", (req, res) => {
    posts.deleteMany({}, function (err) {

    })
    res.redirect("/")
})


app.get("/posts/:postNo", function (req, res) {
    const requestedNo = req.params.postNo;
    posts.findById(requestedNo, function (err, resultItem) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("post", ({ m_message: resultItem }))
        }

    });


})



app.listen(process.env.PORT || 3000, () => {
    console.log("Server Started Listening at PORT 3000. http://localhost:3000");
});

