/* eslint-disable arrow-body-style */
export const getCartItems = () => {
	const cartItems  = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []; 
	return cartItems;
}
export const setCartItems = cartItems => {
	localStorage.setItem('cartItems',JSON.stringify(cartItems));
}
export const setUserInfo = ({_id='',name='',email='',password='',token='',isAdmin=false}) => {
	localStorage.setItem('userInfo',JSON.stringify({
		_id,name,email,password,isAdmin,token
	})
	);
}
export const clearUserLocalStorage = () => {
	localStorage.removeItem('userInfo');
}
export const clearCart = () => {
	localStorage.removeItem('cartItems');
}
export const getUserInfo = () => {
	return localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {_id:'',name:'',email:'',password:'',token:'',isAdmin:''};
}
export const getShipping = () => {
	return localStorage.getItem('shipping') ? JSON.parse(localStorage.getItem('shipping')) : {country:'',city:'',address:'',postalCode:''};
}
export const setShipping = ({country='',city='',address='',postalCode=''}) => {
	localStorage.setItem('shipping',JSON.stringify({
		country,city,address,postalCode
	})
	);
}
export const getPayment = () => {
	return localStorage.getItem('payment') ? JSON.parse(localStorage.getItem('payment')) : {method:'paypal'};
}
export const setPayment = ({method='paypal'}) => {
	localStorage.setItem('payment',JSON.stringify({
		method
	})
	);
}