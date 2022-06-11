import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { sendMomoPayment } from "../../actions/paymentAction";
import "../../styles/landing.css";
import "../../styles/register.css"
const MomoAirtelPayment = ({paymentMethod,orderInfo}) => {
    const [loading,setLoading] = useState(false)
    const [phoneNumber,setPhoneNumber] = useState('')
    const [telecom,setTelecom] = useState('MTN')
    const history = useHistory();
    useEffect(() =>{
        if(paymentMethod == 'momo'){
            setTelecom('MTN')
        }
        else if(paymentMethod == 'airtel'){
            setTelecom('AIRTEL')
        }

    },[paymentMethod])
    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault();
        let formData = {
            msisdn:phoneNumber,
            orderInfo,  
            telecom
        }
        sendMomoPayment(formData)
            .then((res) => {
                setLoading(false)
                history.push("/search")
            })
            .catch((err) => {
                setLoading(false)
            });
    }

    const inputHandler = (e) => {
        setPhoneNumber(e.target.value);
    };

    return (
        <>
            <form onSubmit={handleSubmit} noValidate>
                <div className="input-group">
                    <label>Mobile Number</label>
                    <input
                        name="msisdn"
                        type="text"
                        placeholder="0780754952"
                        className="payment-input"
                        onChange={inputHandler}
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
