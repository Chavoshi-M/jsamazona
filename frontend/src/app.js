import HomeScreen from "./screens/HomeScreen.js";
console.log('router');
const router = ()=>{
    const main_container = document.getElementById('main_container');
    main_container.innerHTML = HomeScreen.render();
}

window.addEventListener('load',router)