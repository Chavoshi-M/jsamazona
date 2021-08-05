import { register } from '../api';
import { getUserInfo, setUserInfo } from '../localStorage';
import { hideLoading, showLoading, showMessage } from '../utils';

const RegisterScreen = {
	after_render:()=>{
		document.getElementById('register-form').addEventListener('submit',async (e)=>{
			e.preventDefault();
			showLoading();
			const data = await register({
				name:document.getElementById('name').value,
				email:document.getElementById('email').value,
				password:document.getElementById('password').value,
			})
			if(data.error){
				showMessage(data.error)
			}else{
				setUserInfo(data);
				document.location.hash = '/';
			}
			hideLoading();
		})
	},
	render:()=>{ 
		if (getUserInfo().name) {
			document.location.hash = '/';
		}
		return `<div class="form-container">
			<form id="register-form">
				<ul class="form-items">
					<li>
						<h1>Create Account</h1>
					</li>
					<li>
						<label for="name">Name</label>
						<input name="name" id="name" type="text"/>
					</li>
					<li>
						<label for="email">Email</label>
						<input name="email" id="email" type="email"/>
					</li>
					<li>
						<label for="password">Password</label>
						<input name="password" id="password" type="password"/>
					</li>
					<li>
						<label for="repassword">Re-Enter Password</label>
						<input name="repassword" id="repassword" type="password"/>
					</li>
					<li>
						<button type="submit" class="primary">Sign In</button>
					</li>
					<li>
						<div>Already have An Account
						<a href="/#/signin">Sign In</a></div>
					</li>
				</ul>
			</form>
		</div>`;
	}
}
export default RegisterScreen;