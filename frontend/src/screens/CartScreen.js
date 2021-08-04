/* eslint-disable no-use-before-define */
import { getProduct } from '../api';
import { getCartItems, setCartItems } from '../localStorage';
import { parseRequestUrl, rerender } from '../utils';

const addToCart = (item,forceUpdate=false)=>{
	let cartItems = getCartItems();
	const existItem = cartItems.find(x => x.product === item.product);
	if (existItem) {
		if (forceUpdate) {
			cartItems = cartItems.map(x => x.product === existItem.product ? item : x)
		} 
	}else{
		cartItems = [...cartItems,item];
	}
	setCartItems(cartItems);
	if (forceUpdate) {
		rerender(CartScreen);
	}

}
const removeFromCart = id => {
	const cartItems = getCartItems();
	const filteredItems = cartItems.filter(x => x.product !== id);
	setCartItems(filteredItems);
	if(id  === parseRequestUrl().id){
		document.location.hash = '/cart';
	}else{
		rerender(CartScreen);
	}
}
const CartScreen = {
	after_render:()=>{
		const qty = document.getElementsByClassName('qty-select');
		Array.from(qty).forEach(qtySelect => {
			qtySelect.addEventListener('change', e =>{
				const item = getCartItems().find(x=>x.product === qtySelect.id);
				addToCart({...item,qty:Number(e.target.value)},true)
			})
		});
		const deleteBtn = document.getElementsByClassName('delete-btn');
		Array.from(deleteBtn).forEach(btn => { 
			btn.addEventListener('click', e =>{ 
				removeFromCart(btn.id)
			})
		});
		document.getElementById('checkout-btn').addEventListener('click',e=>{
			document.location.hash = '/signin';
		})
	},
	render:async ()=>{
		const req = parseRequestUrl();
		if (req.id) {
			const product = await getProduct(req.id);
			console.log(product);
			addToCart({
				product:product._id,
				name:product.name,
				image:product.image,
				price:product.price,
				qty:1,
				countInStock:product.countInStock
			})
		}  
		const cartItems = getCartItems();  
		return `<div class="content cart">
			<div class="cart-list">
				<ul class="cart-list-container">
					<li>
						<h3>Shopping Cart</h3>
						<div>Price</div>
					</li>
					${
						cartItems.length === 0 ?
						`<div>cart Is Empty</div>`:
						cartItems.map(itm=>`
							<li>
								<div class="cart-img">
									<img src="${itm.image}"/>
								</div>
								<div class="cart-name">
									<div>
										<a href="/#/product/${itm.product}">
										${itm.name}
										</a>
									</div>
									<div>
										Qty:  
										<select class="qty-select" id="${itm.product}">
										${[...Array(itm.countInStock).keys()].map(x =>
										  itm.qty === x + 1
											? `<option selected value="${x + 1}">${x + 1}</option>`
											: `<option  value="${x + 1}">${x + 1}</option>`
										)}  
										</select>
										<button  class="delete-btn" id="${itm.product}">Delete</button>
									</div>
								</div>
								<div class="cart-price">
									$${itm.price}
								</div>
							</li>
						`).join('\n')
					}
				</ul>
			</div>
			<div class="cart-action">
				<h3>SubTotal(${cartItems.reduce((a,c)=>a+c.qty , 0)} items):
				$${cartItems.reduce((a,c)=>a+c.qty*c.price , 0)}
				</h3>
				<button id="checkout-btn" class="primary">Procced to Checkout</button>
			</div>
		</div>`;
	}
}
export default CartScreen;