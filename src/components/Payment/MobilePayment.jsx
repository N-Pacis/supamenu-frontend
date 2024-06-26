import React, { useEffect, useState } from "react";
import '../../styles/checkout.css'
import AirtelMoney from "../../assets/payment/airtel.png"
import Momo from "../../assets/payment/momo.png"
import Cash from "../../assets/payment/cash.png"
import MomoAirtelPayment from "./MomoAirtelPayment";
import CashPayment from "./CashPayment";

const MobilePayment = ({order}) => {
    const [activeTab,SetActiveTab] = useState('payment-methods')
    
    const toggleActiveTab = (tab) => {
        SetActiveTab(tab)
    }

    return (
        <>
            {
                activeTab == 'payment-methods' &&
                <div className="payment-methods-images">
                    <div className="payment-method-item" onClick={()=>toggleActiveTab('momo')}>
                        <img 
                            src={Momo}
                            className="payment-method-item__image"
                        />
                        <p className="payment-method-item__text">MTN Mobile Money</p>
                    </div>
                    <div className="payment-method-item" onClick={()=>toggleActiveTab('airtel')}>
                        <img 
                            src={AirtelMoney}
                            className="payment-method-item__image"
                        />
                        <p className="payment-method-item__text">Airtel Money</p>
                    </div>
                    <div className="payment-method-item" onClick={()=>toggleActiveTab('cash')}>
                        <img 
                            src={Cash}
                            className="payment-method-item__image"
                        />
                        <p className="payment-method-item__text">Cash</p>
                    </div>
                </div>
            }
            {
                (activeTab == 'momo' || activeTab == 'airtel') && 
                <MomoAirtelPayment 
                    paymentMethod={activeTab}
                    orderInfo={order}
                />
            }
            {
                (activeTab == 'cash') && 
                <CashPayment 
                    orderInfo={order}
                />
            }
        </>
    );
};

export default MobilePayment;
