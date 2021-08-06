import CheckoutSteps from "../components/CheckoutSteps";
import { getCartItems, getPayment, getShipping } from "../localStorage"

const convertCartToOrder =() =>{
	const orderItems = getCartItems();
	if(orderItems.length  === 0 ){
		document.location.hash = '/cart';
	}
	const shipping = getShipping();
	if (!shipping.address) {
		document.location.hash = '/shipping';
	}
	const payment = getPayment();
	if (!payment.method) {
		document.location.hash = '/payment';
	}
	const itemsPrice  = orderItems.reduce((a,c)=>a+c.price*c.qty , 0);
	const shippingPrice = itemsPrice > 100 ? 0:10;
	const taxPrice = Math.round(0.15*itemsPrice*100)/100;
	const totalPrice = itemsPrice+shippingPrice+taxPrice;
	return{orderItems,shipping,payment,itemsPrice,shippingPrice,taxPrice,totalPrice};

}
const PlaceOrderScreen = {
	after_render:()=>{},
	render:()=>{
		const {orderItems,shipping,payment,itemsPrice,shippingPrice,taxPrice,totalPrice}  = convertCartToOrder();
		return `
			<div >
			${CheckoutSteps.render({step1:true,step2:true,step3:true,step4:true,})}
			<div class="order">
				<div class="order-info">
					<div >
						<h2>Shipping</h2>
						<div >
							${shipping.address},${shipping.country},${shipping.city},${shipping.postalCode}
						</div>
					</div>
					<div >
						<h2>Payment</h2>
						<div >
							Payment Method : ${payment.method}
						</div>
					</div>
					<div >
						<ul class="cart-list-container">
							<li>
								<h2>Shopping Cart</h2>
								<div>Price</div>
							</li>
							${
								orderItems.map(itm=>`
									<li>
										<div class="cart-image">
											<img src="${itm.image}"/>
										</div>
										<div class="cart-name">
											<div> 
												<a href="/#/product/${itm.product}">${itm.name}</a>
											</div>
											<div> 
												Qty : ${itm.qty}
											</div>
										</div>
										<div class="cart-price">
											${itm.price}
										</div>
									</li>
								`)
							}
						</ul>
					</div>
				</div>
				<div class="order-action">
					<ul>
						<li>
							<h2>
								Order Summery
							</h2>
						</li>
						<li>
							<div>Items</div><div>$${itemsPrice}</div>
						</li>
						<li>
							<div>Shipping</div><div>$${shippingPrice}</div>
						</li>
						<li>
							<div>Tax</div><div>$${taxPrice}</div>
						</li>
						<li class="total">
							<div >Order Toatal</div><div>$${totalPrice}</div>
						</li>
						<li>
							<button  class="primary">Place Order </button>
						</li>
				</div>
			</div>
		</div>
		`
	}
}
export default PlaceOrderScreen;