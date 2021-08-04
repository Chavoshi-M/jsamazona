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