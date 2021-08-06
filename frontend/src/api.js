/* eslint-disable import/prefer-default-export */

import { apiUrl } from './config';
import { getUserInfo } from './localStorage';

export  const getProduct = async id => {
	console.log(`${apiUrl}/api/products/${id}`);
	try {
		const res = await fetch(
			`${apiUrl}/api/products/${id}`,{
			method:'GET',
			headers:{
				'Content-type':'application/json'
			}
		});   
		if (res.statusText !== 'OK'){
			const response = await res.json().then(data=>data); 
			throw new Error(response.message)
		}
		return res.json().then(data => data) 
	} catch (error) {  
		return {error: error.message}
	}
}
export  const signin = async postData => { 
	try {
		const dataPost = { email: postData.email,password:postData.password }; 
		console.log(dataPost);
		const res = await fetch(
			`${apiUrl}/api/users/signin`,{
			method: 'POST', // or 'PUT'
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(dataPost),
		});   
		if (res.statusText !== 'OK'){
			const response = await res.json().then(data=>data); 
			throw new Error(response.message)
		}
		return res.json().then(data => data) 
	} catch (error) {  
		console.log(error);
		return {error: error.message}
	}
}
export  const register = async postData => { 
	try {
		const dataPost = { name: postData.name, email: postData.email,password:postData.password }; 
		console.log(dataPost);
		const res = await fetch(
			`${apiUrl}/api/users/register`,{
			method: 'POST', // or 'PUT'
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(dataPost),
		});   
		if (res.statusText !== 'OK'){
			const response = await res.json().then(data=>data); 
			throw new Error(response.message)
		}
		return res.json().then(data => data) 
	} catch (error) {  
		console.log(error);
		return {error: error.message}
	}
}
export  const createOrder = async orders => { 
	try { 
		console.log(orders);
		const {token} = getUserInfo();
		const res = await fetch(
			`${apiUrl}/api/orders`,{
			method: 'POST', // or 'PUT'
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify(orders),
		});   
		if (res.statusText !== 'Created'){
			const response = await res.json().then(data=>data); 
			throw new Error(response.message)
		}
		return res.json().then(data => data) 
	} catch (error) {
		return {error: error.message}
	}
}
export  const update = async postData => { 
	try {
		const {_id,token} = getUserInfo();
		const dataPost = { name: postData.name, email: postData.email,password:postData.password }; 
		console.log(dataPost);
		const res = await fetch(
			`${apiUrl}/api/users/${_id}`,{
			method: 'PUT', // or 'PUT'
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify(dataPost),
		});   
		if (res.statusText !== 'OK'){
			const response = await res.json().then(data=>data); 
			throw new Error(response.message)
		}
		return res.json().then(data => data) 
	} catch (error) {  
		console.log(error);
		return {error: error.message}
	}
}