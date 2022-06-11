import React, { useEffect,useState } from "react";
import "../../styles/checkout.css";
import Navbar from "../../components/Navbar/Navbar";
import { connect } from "react-redux";
import CheckIcon from "../../assets/icons/check.png"
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { finalizeCardPayment } from "../../actions/paymentAction";

const CardPaymentReceived = ({
    dispatch,
    cartItemsArr,
    order_id,
    restaurant
}) => {
    var history = useHistory();
    const search = useLocation().search;

    useEffect(() => {
        console.warn(restaurant)
        const status = new URLSearchParams(search).get('status')
        const transaction_id = new URLSearchParams(search).get('transaction_id')
        const tx_ref = new URLSearchParams(search).get('tx_ref')
        let obj = {
            status,
            tx_ref,
            transaction_id
        }
        if(!status || !transaction_id || !tx_ref || status == null || status == undefined || tx_ref == null || tx_ref == undefined){
            history.push("/search")
        }
        else{
            finalizeCardPayment(obj)
        }
    }, [])

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
                <div className="payment-received-container">
                    <div className="payment-received">
                        <div className="payment-received-icon">
                            <img src={CheckIcon} className="payment-received-icon__image" draggable={false}/>
                        </div>
                        <h2 className="payment-received-text success-text">ORDER CONFIRMED</h2>
                        <Link to={"/"} className="go-back-btn">
                            Go back to homepage
                        </Link>
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

export default connect(mapStateToProps)(CardPaymentReceived);