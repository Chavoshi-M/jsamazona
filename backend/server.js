import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import config from './config';
import data from './data';
import userRouter from './routers/userRouter';
import orderRouter from './routers/orderRouter';

mongoose.connect(config.MONGODB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>{
    console.log('connect to mongo db');
}).catch(err=>{
    console.log(err.reason);
})

const app = express();
app.use(bodyParser.json());
app.use('/api/users',userRouter);
app.use('/api/orders',orderRouter);
app.get('/api/products', (req, res) => {
    res.send(data.products);
});
app.get('/api/products/:id', (req, res) => { 
    const product = data.products.find((x)=>x._id === req.params.id);
    if(product){
        res.send(product);
    }else{
        res.status(404).send({message:'Product Not Found'});
    }
});
app.use((err,req,res,next)=>{
    const status = err.name && err.name === 'ValidationError'?400:500;
    res.status(status).send({message:err.message})
})
app.listen(5000, () => {
    console.log('port http://localhost:5000');
});
