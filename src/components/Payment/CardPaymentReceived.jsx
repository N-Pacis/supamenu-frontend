import React from "react";
import "../../styles/checkout.css";
import Navbar from "../../components/Navbar/Navbar";
import { connect } from "react-redux";
import CheckIcon from "../../assets/icons/check.png"
import { Link } from "react-router-dom";

const CardPaymentReceived = ({
}) => {

    return (
        <>
            <div className="app-top-banner-payment">
                <Navbar />
            </div>
            <div className="app-low-banner">
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
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(CardPaymentReceived);