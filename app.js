const express=require("express");
const fs=require('fs');
const app=express();
const port=8000;
const path=require('path');
//Express specific files
app.use('/static',express.static('static'))//serving express 

//Pug specific stuff
app.set('view engine','pug');//set template
app.set('views',path.join(__dirname,'views'))//Set the views Directory

//End points
app.get('/',(req,res)=>{
    const params={};
    res.status(200).render('index.pug',params)
})
//START THE SERVER
app.listen(port,()=>{ // '()=>' this is an callback function
    console.log(`The application started sucessfully on port ${port}`);
})
