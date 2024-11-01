import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, removeItem } from "./store";
import { useState } from "react";

function Cart() {
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const [discount, setDiscount] = useState(0); // For manual discount percentage
    const [couponCode, setCouponCode] = useState(""); // To store the entered coupon code
    const [couponDiscount, setCouponDiscount] = useState(0); // To store the discount from the coupon code

    const applyDiscount = (percentage) => {
        setDiscount(percentage);
    };

    const handleApplyCoupon = () => {
        switch(couponCode) {
            case 'RATAN10':
                setCouponDiscount(10);
                break;
            case 'RATAN20':
                setCouponDiscount(20);
                break;
            case 'RATAN30':
                setCouponDiscount(30);
                break;
            default:
                alert('Invalid Coupon Code');
                setCouponDiscount(0);
        }
    };

    const calculateTotal = () => {
        const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const discountAmount = (total * discount) / 100;
        const discountCoupon = (total * couponDiscount) / 100;
        const finalTotal = total - discountAmount - discountCoupon;

        return {
            total: parseFloat(total.toFixed(2)),
            discountAmount: parseFloat(discountAmount.toFixed(2)),
            discountCoupon: parseFloat(discountCoupon.toFixed(2)),
            finalTotal: parseFloat(finalTotal.toFixed(2))
        };
    };

    const { total, discountAmount, discountCoupon, finalTotal } = calculateTotal();

    const items = cartItems.map((product, index) => (
        <li key={index}>
            {product.name} - ${product.price.toFixed(2)} Quantity: {product.quantity}
            <button style={{ color: "green" }} onClick={() => dispatch(increment(product))}>++</button>
            <button style={{ color: "red" }} onClick={() => dispatch(decrement(product))}>--</button>
            <button onClick={() => dispatch(removeItem(product))}>Remove</button>
        </li>
    ));

    return (
        <>
            <h1>Welcome to Cart</h1>
            {cartItems.length > 0 ? (
                <ol type="1">
                    {items}
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', marginLeft: '200px' }}>
                        <button onClick={() => applyDiscount(10)}>Apply 10% Discount</button>
                        <button onClick={() => applyDiscount(20)}>Apply 20% Discount</button>
                        <button onClick={() => applyDiscount(30)}>Apply 30% Discount</button>
                    </div>

                    <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Enter Coupon Code"
                    />
                    <button onClick={handleApplyCoupon}>Apply Coupon</button>

                    <p>Total Amount: ${total}</p>
                    <p>Discount Amount (Manual): ${discountAmount}</p>
                    <p>Coupon Discount Amount: ${discountCoupon}</p>
                    <p>Final Amount After Discounts: ${finalTotal}</p>
                </ol>
            ) : (
                <ul>Cart is Empty</ul>
            )}
        </>
    );
}

export default Cart;
