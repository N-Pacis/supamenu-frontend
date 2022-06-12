import React, { useEffect} from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { finalizeCardPayment } from "../../actions/paymentAction";

const FlutterwaveRedirect = ({}) => {
    var history = useHistory();
    const search = useLocation().search;

    useEffect(() => {
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
            history.push("/payment-done")
        }
    }, [])

    return (
        <>
        </>
    );
};
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(FlutterwaveRedirect);