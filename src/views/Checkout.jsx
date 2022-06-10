import React, { useEffect,useState } from "react";
import "../styles/checkout.css";
import Navbar from "../components/Navbar/Navbar";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import CreditCardPayment from "../components/Payment/CreditCardPayment";
import MobilePayment from "../components/Payment/MobilePayment";
const Checkout = ({
    dispatch,
    cartItemsArr,
    order_id,
    restaurant
}) => {
    const [activePaymentMethod,setActivePaymentMethod] = useState('credit-card')

    const history = useHistory()
    useEffect(() => {
        if (cartItemsArr.length === 0) {
            history.push('/')
        }
    }, [cartItemsArr])

    useEffect(()=>{
        console.warn(restaurant)
    },[])

    const toggleActivePaymentMethod = (paymentMethod) => {
        setActivePaymentMethod(paymentMethod)
    }

    let totalAmount = cartItemsArr.map(item => item.unitPrice * item.quantity).reduce((a, b) => a + b, 0);

    return (
        <>
            <div className="app-top-banner-checkout">
                <Navbar />
                <h2 className="app-title">{restaurant?.name}</h2>
                <p className="app-slogan">{restaurant?.address}</p>
            </div>
            <div className="app-low-banner">
                <div className="app-restaurant-image">
                    <img
                        src={restaurant?.defaultPic?.url}
                        className="app-restaurant-image-img"
                    />
                </div>
                <div className="payment">
                    <div className="payment-div">
                        <div className="checkout-div">
                            <div className="checkout-desc">
                                <h1 className="checkout-title">Checkout</h1>
                                <div className="checkout-amount-desc">
                                    <p className="checkout-amount">{totalAmount} Frw</p>
                                    <p className="checkout-vat">Including VAT (18%)</p>
                                </div>
                            </div>
                            <div className="buttons-div">
                                <button className={`payment-method-btn ${activePaymentMethod == 'credit-card' && 'active-payment-method'}`} onClick={()=>toggleActivePaymentMethod('credit-card')}>Credit Card</button>
                                <button className={`payment-method-btn ${activePaymentMethod == 'mobile' && 'active-payment-method'}`} onClick={()=>toggleActivePaymentMethod('mobile')}>Mobile & Cash</button>
                            </div>
                        </div>
                        <div className="payment-forms">
                            {
                                activePaymentMethod == 'credit-card' ? 
                                    <CreditCardPayment />
                                :
                                <MobilePayment 
                                    order={order_id}
                                />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
const mapStateToProps = (state) => ({
    cartItemsArr: state.cart.cartItems,
    order_id: state.cart.order_id,
    restaurant: state.cart.restaurant
});

export default connect(mapStateToProps)(Checkout);