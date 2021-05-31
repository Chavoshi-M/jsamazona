
const HomeScreen = {
    render:async()=> {
        const res = await fetch('http://localhost:5000/api/products',{
            headers:{
                'Content-Type':'application/json'
            }
        });
        if (!res || !res.ok) {
            return `<div>Error in Getting Data</div>`;
        }
        const products = await res.json();
        console.log(products,'ressss');
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