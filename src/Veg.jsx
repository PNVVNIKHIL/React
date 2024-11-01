// Veg.js

import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from './store';

function Veg() {
    // Retrieve the `Veg` array from the `products` slice in the Redux store
    const vegProducts = useSelector((state) => state.products.Veg);
    const dispatch = useDispatch();
    const items = vegProducts.map((product, index) => (
        <li key={index}>
            {product.name} - ${product.price.toFixed(2)}
            <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
        </li>
    ));

    return (
        <>
            <h1>Veg Products</h1>
            <ul>{items}</ul>
        </>
    );
}

export default Veg;
