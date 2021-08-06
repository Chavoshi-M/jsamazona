/* eslint-disable no-underscore-dangle */
import express  from 'express';
import expressAsyncHandler  from 'express-async-handler';
import User from '../model/userModel';
import { generateToken, isAuth } from '../util';

const userRouter = express.Router();

userRouter.get('/createadmin',expressAsyncHandler(async(req,res)=>{
	try {
		const user = new User({
			name:'admin',
			email:'ch@gmail.com',
			password:'123456',
			isAdmin:true
		});
		const createdUser = await user.save();
		res.send(createdUser);
	} catch (error) {
		res.status(500).send({message:error.message})
	}
}));
userRouter.post('/signin',expressAsyncHandler(async(req,res)=>{

	const singinUser = await User.findOne({
		email:req.body.email,
		password:req.body.password,
	})
	console.log(singinUser);
	if (!singinUser) {
		res.status(401).send({message:'Invalid Email Or Password'})
	}else{
		res.send({
			_id:singinUser._id,
			name:singinUser.name,
			email:singinUser.email,
			isAdmin:singinUser.isAdmin,
			token:generateToken(singinUser)
		})
	}
}));
userRouter.post('/register',expressAsyncHandler(async(req,res)=>{
	const user = new User({
		name:req.body.name,
		email:req.body.email,
		password:req.body.password,
	})
	const createdUser = await user.save();
 
	if (!createdUser) {
		res.status(401).send({message:'Invalid User Data'})
	}else{
		res.send({
			_id:createdUser._id,
			name:createdUser.name,
			email:createdUser.email,
			isAdmin:createdUser.isAdmin,
			token:generateToken(createdUser)
		})
	}
}));
userRouter.put('/:id',isAuth,expressAsyncHandler(async(req,res)=>{ 
	const user = await User.findById(req.params.id) 
	if (!user) {
		res.status(404).send({message:'User Not Found'})
	}else{
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		user.password = req.body.password || user.password;
		const updatedUser = await user.save();
		res.send({
			_id:updatedUser._id,
			name:updatedUser.name,
			email:updatedUser.email,
			isAdmin:updatedUser.isAdmin,
			token:generateToken(updatedUser)
		})
	} 
}));
export default userRouter;