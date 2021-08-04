import { getProduct } from '../api';
import { getCartItems, setCartItems } from '../localStorage';
import { parseRequestUrl } from '../utils';

const addToCart = (item,forceUpdate=false)=>{
	let cartItems = getCartItems();
	const existItem = cartItems.find(x => x.product === item.product);
	if (existItem) {
		cartItems = cartItems.map(x => x.product === existItem.product ? item : x)
	}else{
		cartItems = [...cartItems,item];
	}
	setCartItems(cartItems);

}
const CartScreen = {
	after_render:()=>{

	},
	render:async ()=>{
		const req = parseRequestUrl();
		if (req.id) {
			const product = await getProduct(req.id);
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
										Qty: <select class="qty-select" id="qty-select">
										<option>1</option>
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