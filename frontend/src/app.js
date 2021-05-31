import Error404Screen from "./screens/Error404Screen.js";
import HomeScreen from "./screens/HomeScreen.js";
import ProductScreen from "./screens/ProductScreen.js";
import { parseRequestUrl } from "./utils.js";
const routes = {
    "/":HomeScreen,
    "/product/:id":ProductScreen,
}
const router = ()=>{
    const request = parseRequestUrl();
    const parseurl =(request.resource?`/${request.resource}`:'/')+(request.id?'/:id':'')+''+(request.verb?`/${request.verb}`:'');
    console.log(parseurl,'parseurl');
    const screen = routes[parseurl]?routes[parseurl]:Error404Screen
    console.log(screen,'screen');
    const main_container = document.getElementById('main_container');
    main_container.innerHTML = screen.render();
}

window.addEventListener('load',router)
window.addEventListener('hashchange',router)