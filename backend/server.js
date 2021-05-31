const express = require('express') 
const app = express();
const data = require('./data.js')  
app.get('/api/products',(req,res)=>{
    res.send(data.products)
})


app.listen(5000,()=>{
    console.log('port http://localhost:5000');
})