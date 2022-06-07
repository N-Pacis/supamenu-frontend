import React from "react";
import "../../styles/menu.css";
import {Link} from "react-router-dom"
const CartItems = ({ cartItems, onUpdateCart }) => {
    let totalAmount = cartItems.map(item => item.unitPrice * item.quantity).reduce((a, b) => a + b, 0);
    return (
        <>
            {cartItems.map(item => (
                <>
                    <div key={item.id} className="cart-item">
                        <img src={item.imageUrl} className="cart-item-image" />
                        <div className="cart-item__desc">
                            <h3 className="cart-item__name">{item.name}</h3>
                            <p className="cart-item__price">{item.unitPrice} RWF</p>
                        </div>
                        <div className="cart-buttons">
                            <button className="cart-item__btn" onClick={() => onUpdateCart(item, item.quantity - 1)}>-</button>
                            <p className="cart-item__quantity">{item.quantity}</p>
                            <button className="cart-item__btn" onClick={() => onUpdateCart(item, item.quantity + 1)}>+</button>
                        </div>
                    </div>
                </>

            ))}
            {
                cartItems.length > 0 && (
                    <>
                        <p className="total-amount">{totalAmount} RWF</p>
                        <Link className="checkout-btn" to="/checkout">Checkout</Link>
                    </>
                )
                    
            }

        </>
    );
};

export default CartItems