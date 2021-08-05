/* eslint-disable no-underscore-dangle */
import express  from 'express';
import expressAsyncHandler  from 'express-async-handler';
import User from '../model/userModel';
import { generateToken } from '../util';

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
export default userRouter;