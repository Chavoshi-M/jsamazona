import { signin } from '../api';
import { getUserInfo, setUserInfo } from '../localStorage';
import { hideLoading, redirectUser, showLoading, showMessage } from '../utils';

const SigninScreen = {
	after_render:()=>{
		document.getElementById('signin-form').addEventListener('submit',async (e)=>{
			e.preventDefault();
			showLoading();
			const data = await signin({
				email:document.getElementById('email').value,
				password:document.getElementById('password').value,
			})
			if(data.error){
				showMessage(data.error)
			}else{
				setUserInfo(data);
				redirectUser();
			}
			hideLoading();
		})
	},
	render:()=>{ 
		if (getUserInfo().name) {
			redirectUser();
		}
		return `<div class="form-container">
			<form id="signin-form">
				<ul class="form-items">
					<li>
						<h1>Sign-In</h1>
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
						<button type="submit" class="primary">Sign In</button>
					</li>
					<li>
						<div>New User?
						<a href="/#/register">Create Your Acount</a></div>
					</li>
				</ul>
			</form>
		</div>`;
	}
}
export default SigninScreen;