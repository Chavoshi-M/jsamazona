import {  getUserInfo,getShipping, setShipping } from '../localStorage';
import CheckoutSteps from '../components/CheckoutSteps'
const ShippingScreen = {
	after_render:()=>{
		document.getElementById('Shipping-form').addEventListener('submit',async (e)=>{
			e.preventDefault();
			setShipping({
				address:document.getElementById('address').value,
				city:document.getElementById('city').value,
				country:document.getElementById('country').value,
				postalCode:document.getElementById('postalCode').value,
			});
			document.location.hash = '/payment'
		}) 
	},
	render:()=>{ 
		const {name} = getUserInfo()
		if (!name) {
			document.location.hash = '/';
		}
		const {address,postalCode,city,country} = getShipping();

		return `
		${CheckoutSteps.render({step1:true,step2:true,})}
		<div class="form-container">
			<form id="Shipping-form">
				<ul class="form-items">
					<li>
						<h1>Shipping</h1>
					</li>
					<li>
						<label for="city">city</label>
						<input name="city" id="city" type="text" value="${city}"/>
					</li> 
					<li>
						<label for="postalCode">postalCode</label>
						<input name="postalCode" id="postalCode" type="text" value="${postalCode}"/>
					</li>  
					<li>
						<label for="address">address</label>
						<input name="address" id="address" type="text" value="${address}"/>
					</li>  
					<li>
						<label for="country">country</label>
						<input name="country" id="country" type="text" value="${country}"/>
					</li>  
					<li>
						<button type="submit" class="primary">Continue</button>
					</li>  
				</ul>
			</form>
		</div>`;
	}
}
export default ShippingScreen;