var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost/kappa_aesop');
mongoose.model("People", new Schema({"name" : String, "realname" : String}));
var Person = mongoose.model("People");

app.set("port", (process.env.PORT || 5000));

app.get("/data", function(req,res){
    Person.find({}, function(err, data){
        if(err){
            console.log(err);
        }

        res.send(data);
    });
});

app.post("/data", function(req,res){
    console.log(req.body);

    var addedPerson = new Person({"name" : req.body.name, "realname" : req.body.realName});
    addedPerson.save(function(err, data){
        if(err){
          console.log(err);
        }

        res.send(data);
    });

    // res.send("Hello");
});

app.get("/*", function(req,res){
    var file = req.params[0] || "/views/index.html";
    res.sendFile(path.join(__dirname, "/public/", file));
});

app.listen(app.get("port"), function(){
  console.log("Listening on port: ", app.get("port"));
});

module.exports = app;
