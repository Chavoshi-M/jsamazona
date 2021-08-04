import {parseRequestUrl} from '../utils';
import {getProduct} from '../api';
import Rating from '../components/rating';
const ProductScreen = {
    after_render:()=>{
        const req = parseRequestUrl();
        document.getElementById('add-button').addEventListener('click',()=>{
            document.location.hash = `/cart/${req.id}`;
        })
    },
    render: async () => {
        const req = parseRequestUrl();
        const product = await getProduct(req.id);
        console.log('product',product);

        if(product.error){
            return `<div>${product.error}</div>`
        }
        return `<div class="content">
            <div class="back-to-result">
                <a href="/#/">back to result</a>
            </div>
            <div class="details">
                <div class="details-img">
                    <img src="${product.image}"/>
                </div>
                <div class="details-info">
                    <ul>
                        <li>
                            <h1>${product.name}</li>
                        </li>
                        <li>
                            ${Rating.render({value:product.rating,text:product.numReviews})} Reviwes
                        </li>
                        <li>
                            Price:<strong>$${product.price}</strong>
                        </li>
                        <li>
                            Description:<div>${product.description}</div>
                        </li>
                    </ul>
                </div>
                <div class="details-action">
                    <ul>
                        <li>
                            Price:<strong>$${product.price}</strong>
                        </li>
                        <li>
                            Status:
                            ${product.countInStock > 0 ? `<span class="success">In Stock</span>` : `<span class="error">Unavailable</span>`}
                        </li> 
                        <li>
                            <button class="primary" id="add-button">Add To Cart</button>
                        </li>
                    </ul>
                </div>

            </div>
        </div>`
    }
};
export default ProductScreen;
