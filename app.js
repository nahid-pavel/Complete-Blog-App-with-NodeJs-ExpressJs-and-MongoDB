require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const setRoutes = require("./routes/routes");
const setMiddleWares = require('./middlewares/middlewares');

const app = express();

const MONGODB_URI = `mongodb://${process.env.DB_ADMIN}:${process.env.DB_PASSWORD}@ds159036.mlab.com:59036/blogdb`;
setMiddleWares(app);

app.set("view engine", "ejs");
app.set("views", "views");
console.log(app.get("env"));

setRoutes(app);

app.use((req,res,next)=>{
  let error = new Error('404 Page Not Found');
  error.status = 404;
  next(error);

})

app.use((error,req,res,next)=>{
   if(error.status === 404){
      return res.render('pages/error/404',{flashMessage:{}})
   }

   res.render('pages/error/500',{flashMessage:{}})
   console.log(error)
   

})


PORT = process.env.PORT || 5000;

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`port is running at ${PORT} and connection established`);
    });
  })
  .catch(err => {
    console.log("error occured");
  });
