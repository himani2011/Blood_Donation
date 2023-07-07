const express=require('express');
const dotenv = require('dotenv');
const app=express();

dotenv.config({path:'./config.env'});
require('./db/conn');
const PORT = process.env.PORT;


app.get('/',(req,res)=>{
    res.send("from server");
});

app.listen(8080,()=>{
    console.log(`Server is running on port ${PORT}`);
})