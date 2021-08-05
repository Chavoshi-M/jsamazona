/* eslint-disable import/prefer-default-export */

import { apiUrl } from './config';

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