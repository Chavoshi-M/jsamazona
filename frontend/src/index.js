import Header from './components/Header';
import CartScreen from './screens/CartScreen';
import Error404Screen from './screens/Error404Screen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import SigninScreen from './screens/SigninScreen';
import { hideLoading, parseRequestUrl, showLoading } from './utils';

const routes = {
    '/': HomeScreen,
    '/product/:id': ProductScreen,
    '/cart/:id': CartScreen,
    '/cart': CartScreen,
    '/profile': ProfileScreen,
    '/signin': SigninScreen,
    '/register': RegisterScreen,

};
const router = async () => {
    showLoading();
    const request = parseRequestUrl();
    const parseurl = (request.resource ? `/${request.resource}` : '/') + (request.id ? '/:id' : '') + '' + (request.verb ? `/${request.verb}`: '');
    const screen = routes[parseurl] ? routes[parseurl] : Error404Screen;
    const header = document.getElementById('header-container');
    header.innerHTML = await Header.render();
    await  Header.after_render();
    const mainContainer = document.getElementById('main_container');
    mainContainer.innerHTML = await screen.render();
    if(screen.after_render){
        await screen.after_render();
    }
    hideLoading();
};

window.addEventListener('load', router);
window.addEventListener('hashchange', router);