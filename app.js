const bodyParser = require("body-parser");
const express = require("express");
const date = require(__dirname + "/date.js");

const app = express();
const items =["Wake up", "Love", "God"];
const workItems =[];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function (req, res) {
    const day = date.getDay();
  res.render("list", { listTitle: day, newListItems: items });
});

app.post("/", function(req, res){
    const item = req.body.newItem;

    if (req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work");
    }
    else{
        items.push(item);
        res.redirect("/");
    }
});

app.get("/work", function(req,res){
    res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req,res){
    res.render("about");
});

app.post("/work", function(req,res){
    const item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
})

app.listen(3000, function () {
  console.log("Server is listening at port 3000");
});
