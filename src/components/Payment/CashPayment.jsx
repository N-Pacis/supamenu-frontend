import React, {  useState } from "react";
import { useHistory } from "react-router-dom";
import {sendPaymentByCash } from "../../actions/paymentAction";
import "../../styles/landing.css";
import "../../styles/register.css"
const CashPayment = ({orderInfo}) => {
    const [loading,setLoading] = useState(false)
    const history = useHistory();
    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault();
        let formData = {
            orderInfo,  
        }
        sendPaymentByCash(formData)
            .then((res) => {
                setLoading(false)
                history.push("/search")
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

export default CashPayment;
