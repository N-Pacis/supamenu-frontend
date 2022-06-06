import React, { useState } from "react";
import "../../styles/landing.css";
import "../../styles/register.css"
const CreditCardPayment = ({ }) => {
    const [loading,setLoading] = useState(false)

    return (
        <>
            <form noValidate>
                <div className="input-group">
                    <label>Card Number</label>
                    <input
                        name="card_number"
                        type="text"
                        placeholder="5261 4141 0151 8472"
                        className="payment-input"
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Card Holder Name</label>
                    <input
                        name="card_holder"
                        type="text"
                        placeholder="John Doe"
                        className="payment-input"
                        required
                    />
                </div>
                <div className="input-group-div">
                    <div className="input-group">
                        <label>Expiry Date</label>
                        <input
                            name="card_number"
                            type="text"
                            placeholder="06/2024"
                            className="payment-input"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>CVV / CVC</label>
                        <input
                            name="card_holder"
                            type="text"
                            placeholder="915"
                            className="payment-input"
                            required
                        />
                    </div>
                </div>
                <div className="mt-8 text-center">
                    <button
                        className="pay-btn"
                        disabled={loading}
                    >
                        {loading ? <span>Wait ...</span> : <span>Proceed</span>}
                    </button>
                </div>
            </form>
        </>
    );
};

export default CreditCardPayment;
