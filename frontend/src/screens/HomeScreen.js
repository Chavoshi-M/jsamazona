import data from '../data.js'
const HomeScreen = {
    render:()=> {
        const {products} = data;
        return `
            <ul class="products">
            ${products.map(itm=>`
                <li>
                    <div class="product">
                        <a href="/#/product/${itm._id}">
                        <img src="${itm.image}" alt="${itm.name}"/></a>
                        <div class="product-name">
                            <a href="/#/product/${itm._id}">
                            ${itm.name}</a>
                        </div>
                        <div class="product-brand">
                            ${itm.brand}
                        </div>
                        <div class="product-price">
                            $${itm.price}
                        </div> 
                    </div>
                </li>
            `).join(' ')}
            </ul>
        `
    }
}
export default HomeScreen;