import React, { useState } from "react";
import { initiateCardPayment } from "../../actions/paymentAction";
import "../../styles/landing.css";
import "../../styles/register.css"
const CreditCardPayment = ({order}) => {
    const [loading,setLoading] = useState(false)
    
    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault();
        let formData = {
            orderInfo: order,  
        }
        initiateCardPayment(formData)
            .then((res) => {
                setLoading(false)
                window.location.href = res.data.link
            })
            .catch((err) => {
                setLoading(false)
            });
    }

    return (
        <>
            <form onSubmit={handleSubmit} noValidate>
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
