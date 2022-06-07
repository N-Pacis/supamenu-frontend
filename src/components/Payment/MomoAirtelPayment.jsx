import React, { useState } from "react";
import "../../styles/landing.css";
import "../../styles/register.css"
const MomoAirtelPayment = ({paymentMethod}) => {
    const [loading,setLoading] = useState(false)

    return (
        <>
            <form noValidate>
                <div className="input-group">
                    <label>Mobile Number</label>
                    <input
                        name="msisdn"
                        type="text"
                        placeholder="0780754952"
                        className="payment-input"
                        required
                    />
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

export default MomoAirtelPayment;
