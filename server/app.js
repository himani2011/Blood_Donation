const express=require('express');
const app=express();

app.get('/',(req,res)=>{
    res.send("from server");
});

app.listen(8080,()=>{
    console.log("Server is running on port 8080");
})