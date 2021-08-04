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
		}else{

		}
		return `<div>cart</div>
		<div>${getCartItems().length}</div>`;
	}
}
export default CartScreen;