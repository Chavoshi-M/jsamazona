/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import Rating from '../components/rating';

const HomeScreen = {
    render: async () => {
        const res = await axios({
            url: 'http://localhost:5000/api/products',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!res || res.statusText !== 'OK') {
            return `<div>Error in Getting Data</div>`;
        }
        console.log(res.data);
        const products = res.data;
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
    },
};
export default HomeScreen;