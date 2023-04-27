const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const path = require('path')



const app = express();

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));


app.use(bodyParser.urlencoded({
  extended: true
}));


mongoose.connect("mongodb://localhost:27017/CompanyData",{useNewUrlParser:true});
const investeeSchema=new mongoose.Schema({
  firstName :String,
  lastName :String,
  organizationName :String,
  about :String,
  number :String,
  email:String,
  country :String,
  city:String,  
  password:String
});




const Investee = new mongoose.model("investee",investeeSchema);
const Investor = new mongoose.model("investor",investeeSchema);


app.get("/",function(req,res){
    res.render("index");
});

app.get("/about",function(req,res){
    res.render("about");
});
app.get("/index",function(req,res){
    res.render("index");
});
app.get("/contact",function(req,res){
    res.render("contact");
});

app.get("/add_company",function(req,res){
    res.render("add_company");
});

app.get("/investee",function(req,res){
    
    res.render("investee");
});

app.get("/investeedash",function(req,res){
    res.render("investeedash");
});

app.get("/investeelogin",function(req,res){
    res.render("investeelogin");
});

app.get("/investordash",function(req,res){
    res.render("investordash");
});

app.get("/investorlogin",function(req,res){
    res.render("investorlogin");
});


app.get("/managerdash",function(req,res){
    res.render("managerdash");
});
app.get("/investor",function(req,res){
    res.render("investor");
});

app.get("/managerlogin",function(req,res){
    res.render("managerlogin");
});
app.get("/marketplace",function(req,res){
    res.render("marketplace");
});


app.post("/investee",function(req,res){
    const fName=req.body.fName;
    const lName=req.body.lName;
    const oName =req.body.oName;
    const about=req.body.about;
    const num=req.body.num;
    const mail =req.body.mail;
    const country=req.body.country;
    const city=req.body.city;
    const password =req.body.password;
    async function fun1(){
        try{
            await Investee.create({
                firstName :fName,
                lastName :lName,
                organizationName :oName,
                about :about,
                number :num,
                email:mail,
                country :country,
                city:city,  
                password:password
            });
            console.log("DATA ADDED");
            res.redirect("investeelogin");
            
        }
        catch(err){
            console.log(err.message);
        }
    }
    fun1();
});

app.post("/investeelogin",function(req,res){
    const mail=req.body.email;
    const password=req.body.password;

  async function fun2(){
      try{

          const data = await Investee.findOne({email:mail});
          console.log(data);
          if(data.password === password){
            console.log("Found");
            res.render("investeedash");
          }
      }
      catch(err){
          console.log(err.message);
      }
  }
  fun2();
});

app.post("/investor",function(req,res){
    const fName=req.body.fName;
    const lName=req.body.lName;
    const oName =req.body.oName;
    const about=req.body.about;
    const num=req.body.num;
    const mail =req.body.mail;
    const country=req.body.country;
    const city=req.body.city;
    const password =req.body.password;
    async function fun3(){
        try{
            await Investor.create({
                firstName :fName,
                lastName :lName,
                organizationName :oName,
                about :about,
                number :num,
                email:mail,
                country :country,
                city:city,  
                password:password
            });
            console.log("DATA ADDED");
            res.redirect("investorlogin");
            
        }
        catch(err){
            console.log(err.message);
        }
    }
    fun3();
});

app.post("/investorlogin",function(req,res){
    const mail=req.body.email;
    const password=req.body.password;

  async function fun4(){
      try{

          const data = await Investor.findOne({email:mail});
          console.log(data);
          if(data.password === password){
            console.log("Found");
            res.render("investordash");
          }
      }
      catch(err){
          console.log(err.message);
      }
  }
  fun4();
});

app.listen(3000,function(req,res){
    console.log("Server is online on Port:3000");
});