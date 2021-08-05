import { getUserInfo } from '../localStorage';

const Header = {
	after_render:()=>{},
	render:()=>{
		const {name} =getUserInfo();
		console.log(getUserInfo()	);
		return ` <div class="brand">
				<a href="/#/">jsamazona</a>
			</div>
			<div>
				${ name ? `<a href="/#/profile">Profile</a>`:`<a href="/#/signin">Sign-In</a>`}
				<a href="/#/cart">Cart</a>
			</div>`
	}
}
 
export default Header;