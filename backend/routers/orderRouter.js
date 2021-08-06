/* eslint-disable no-underscore-dangle */
import express  from 'express';
import expressAsyncHandler  from 'express-async-handler';
import Order from '../model/orderModel';

import { isAuth } from '../util';

const orderRouter = express.Router(); 
orderRouter.post('/',isAuth,expressAsyncHandler(async(req,res)=>{
	const order = new Order({
		orderItems:req.body.orderItems,
		user:req.user._id,
		shipping:req.body.shipping,
		payment:req.body.payment,
		shippingPrice:req.body.shippingPrice,
		taxPrice:req.body.taxPrice,
		totalPrice:req.body.totalPrice,
		itemsPrice:req.body.itemsPrice,
	})
	const createdOrder = await order.save();
 
	if (!createdOrder) {
		res.status(401).send({message:'Invalid Order Data'})
	}else{
		res.status(201).send({message:'New Order Created',order:createdOrder})
	}
})); 
export default orderRouter;