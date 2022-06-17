const express=require("express");
const fs=require('fs');
const app=express();
const port=8000;
const path=require('path');
const bodyparser=require('body-parser');//For getting data by post request and save it to database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactInfo',{ useNewUrlParser: true});
//Defining mongoose schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String, 
    email: String,
    address: String,
    desc: String
});
//MAking model
var info = mongoose.model('info', contactSchema);

//Express specific files
app.use('/static',express.static('static'))//serving express 

//Pug specific stuff
app.set('view engine','pug');//set template
app.set('views',path.join(__dirname,'views'))//Set the views Directory

//End points
app.get('/',(req,res)=>{
    const params = {};
    res.status(200).render('home.pug',params)
})
app.get('/contact',(req,res)=>{
    const params = {};
    res.status(200).render('contact.pug',params)
})
app.post('/contact', (req, res)=>{
    var myData = new info(req.body);
    myData.save().then(()=>{
    res.send("This item has been saved to the database")
    }).catch(()=>{
    res.status(400).send("item was not saved to the databse")
})
    // res.status(200).render('contact.pug');
})
//START THE SERVER
app.listen(port,()=>{ // '()=>' this is an callback function
    console.log(`The application started sucessfully on port ${port}`);
})
