import {  getUserInfo, setPayment } from '../localStorage';
import CheckoutSteps from '../components/CheckoutSteps'
const PaymentScreen = {
	after_render:()=>{
		document.getElementById('payment-form').addEventListener('submit',async (e)=>{
			e.preventDefault();
			const method = document.querySelector('input[name="method"]:checked').value;
			setPayment({
				method
			});
			document.location.hash = '/payment'
		}) 
	},
	render:()=>{ 
		const {name} = getUserInfo()
		if (!name) {
			document.location.hash = '/';
		} 
		return `
		${CheckoutSteps.render({step1:true,step2:true,step3:true})}
		<div class="form-container">
			<form id="payment-form">
				<ul class="form-items">
					<li>
						<h1>Payment</h1>
					</li>
					<li>
						<div>
							<input type="radio" name="method" id="method" value="paypal" checked/>
							<label for="method">paypal</label>
						</div> 
					</li>  
					<li>
						<div>
							<input type="radio" name="stripe" id="stripe" value="paypal" />
							<label for="stripe">stripe</label>
						</div> 
					</li>  
					<li>
						<button type="submit" class="primary">Continue</button>
					</li>  
				</ul>
			</form>
		</div>`;
	}
}
export default PaymentScreen;