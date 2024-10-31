const fs = require("fs")
const multer = require("multer")

const upload = multer({})

const path = require('path');

const express = require('express');

// const db = require('./data/database');
// const demoRoutes = require('./routes/demo');

const app = express();

app.use(express.static("public"));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.urlencoded({ extended: false }));



// app.use(function(error, req, res, next) {
//   res.render('500');
// })

app.get("/", function(req, res){

})

app.get("/addNew", function(req, res){
  res.render("index")
})


app.post("/addNew", upload.single("product-image"), function(req, res){
  const productInfo = req.body;
  const filePath = path.join(__dirname, "data", "products.json")
  const productImage = req.file;

  const fileData = fs.readFileSync(filePath)
  const storedInfo = JSON.parse(fileData)

  storedInfo.push(productInfo)

  fs.writeFileSync(filePath, JSON.stringify(storedInfo))

  //image upload


  res.redirect("/report");
})

app.get("/manage", function(req, res){
  res.render("manage")
})

app.get("/report", function(req, res){
  res.render("reports")
})

app.get("/overviews", function(req, res){
  res.render("overview")
})


app.listen(3000);

// db.connectToDatabase().then(function () {
  
// });
