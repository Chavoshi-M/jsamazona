import Error404Screen from './screens/Error404Screen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import { parseRequestUrl } from './utils';

const routes = {
    '/': HomeScreen,
    '/product/:id': ProductScreen,
};
const router = async () => {
    const request = parseRequestUrl();
    const parseurl = (request.resource ? `/${request.resource}` : '/') + (request.id ? '/:id' : '') + '' + (request.verb ? `/${request.verb}` : '');
    const screen = routes[parseurl] ? routes[parseurl] : Error404Screen;
    const mainContainer = document.getElementById('main_container');
    mainContainer.innerHTML = await screen.render();
};

window.addEventListener('load', router);
window.addEventListener('hashchange', router);
