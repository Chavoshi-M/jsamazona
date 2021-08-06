import { update } from '../api';
import { clearUserLocalStorage, getUserInfo, setUserInfo } from '../localStorage';
import { hideLoading, showLoading, showMessage } from '../utils';

const ProfileScreen = {
	after_render:()=>{
		document.getElementById('profile-form').addEventListener('submit',async (e)=>{
			e.preventDefault();
			showLoading();
			const data = await update({
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
		document.getElementById('signout-btn').addEventListener('click', (e)=>{
			e.preventDefault();
			clearUserLocalStorage();
			document.location.hash = '/';

		})
	},
	render:()=>{ 
		const {name,email} = getUserInfo()
		if (!name) {
			document.location.hash = '/';
		}
		return `<div class="form-container">
			<form id="profile-form">
				<ul class="form-items">
					<li>
						<h1>User Profile</h1>
					</li>
					<li>
						<label for="name">Name</label>
						<input name="name" id="name" type="text" value="${name}"/>
					</li>
					<li>
						<label for="email">Email</label>
						<input name="email" id="email" type="email" value="${email}"/>
					</li>
					<li>
						<label for="password">Password</label>
						<input name="password" id="password" type="password"/>
					</li> 
					<li>
						<button type="submit" class="primary">Update</button>
					</li> 
					<li>
						<button type="button" id="signout-btn" >Sign Out</button>
					</li> 
				</ul>
			</form>
		</div>`;
	}
}
export default ProfileScreen;