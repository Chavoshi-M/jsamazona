
import Rating from '../components/rating';

const HomeScreen = {
    render: async () => {
        const res = await fetch(
             'http://localhost:5000/api/products',{
            method:'GET',
            headers:{
                'Content-type':'application/json'
            }
        });
        if (res.statusText === 'OK') {
            
            return res.json().then(data=>{
                console.log('data',data);
                const products = data;
                return `
                    <ul class="products">
                    ${products.map(itm => `
                        <li>
                            <div class="product">
                                <a href="/#/product/${itm._id}">
                                <img src="${itm.image}" alt="${itm.name}"/></a>
                                <div class="product-name">
                                    <a href="/#/product/${itm._id}">
                                    ${itm.name}</a>
                                </div>
                                <div class="product-rating">
                                    ${Rating.render({
                                        value:itm.rating,
                                        text:itm.numReviews + ' reviews'}
                                    )}
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
                `;
            }).catch(error => `<div>Error in Getting Data:${error}</div>`
            );
        }
        
    },
};
export default HomeScreen;