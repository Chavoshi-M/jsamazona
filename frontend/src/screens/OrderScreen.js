import { getOrder } from '../api';
import {parseRequestUrl } from '../utils';
 
const OrderScreen = {
	after_render:async () => {},
	render:async()=>{
		const req = parseRequestUrl(); 
		const {updatedAt,isDelivered,isPaid,itemsPrice,_id,shipping,payment,taxPrice,totalPrice,orderItems,shippingPrice} =await getOrder(req.id);
 		return `
			<div > 
			<h1>Order ${_id}</h1>
			<div class="order">
				<div class="order-info">
					<div >
						<h2>Shipping</h2>
						<div >
							${shipping.address},${shipping.country},${shipping.city},${shipping.postalCode}
						</div>
						
						${isDelivered ? `<div class="success">Delivered at ${updatedAt}</div>`:`<div class="error">Not Delivered</div>`}
					</div>
					<div >
						<h2>Payment</h2>
						<div >
							Payment Method : ${payment.method}
						</div>
						${isPaid ? `<div class="success">Paid at ${updatedAt}</div>`:`<div class="error">Not Paid</div>`}
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
					</ul>
				</div>
			</div>
		</div>
		`
	}
}
export default OrderScreen;