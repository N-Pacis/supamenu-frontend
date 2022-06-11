import axios from "axios";
import authHeader from "../services/auth-header";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const ENDPOINT = import.meta.env.VITE_REACT_APP_BASE_API_URL;

export async function sendMomoPayment(dataToPost) {
  try {
    dataToPost.regChannel = "WEB"
    const url = `/payments/momo`;
    let response = await axios.post(`${ENDPOINT}${url}`, dataToPost,{
      headers: authHeader(),
  });
    toast.success("Payment Initiated Successfully");
    return { success: true, data: response?.data }

  } catch (err) {
    toast.error(err?.response?.data?.apierror.message || "Payment Initiation Failed")
    return { sucess: false, err };
  }
}

export async function sendPaymentByCash(dataToPost) {
  try {
    dataToPost.regChannel = "WEB"
    const url = `/payments/cash`;
    let response = await axios.post(`${ENDPOINT}${url}`, dataToPost,{
      headers: authHeader(),
  });
    toast.success("Successfull");
    return {   success: true, data: response?.data }

  } catch (err) {
    toast.error(err?.response?.data?.apierror.message || "Failure")
    return { sucess: false, err };
  }
}

export async function initiateCardPayment(dataToPost) {
  try {
    dataToPost.regChannel = "WEB"
    const url = `/payments/card`;
    let response = await axios.post(`${ENDPOINT}${url}`, dataToPost,{
      headers: authHeader()
    });
    toast.success("Payment Initiated Successfully");
    return { success: true, data: response?.data }

  } catch (err) {
    toast.error(err?.response?.data?.apierror.message || "Payment Initiation Failed")
    return { sucess: false, err };
  }
}

export async function finalizeCardPayment(data) {
  try {
    const url = `/flutterwave/initiated?status=${data.status}&transaction_id=${data.transaction_id}&tx_ref=${data.tx_ref}`;
    let response = await axios.get(`${ENDPOINT}${url}`,{
      headers: authHeader()
    });
    toast.success("Success");
    return { success: true, data: response?.data }

  } catch (err) {
    toast.error(err?.response?.data?.apierror.message || "Failure")
    return { sucess: false, err };
  }
}
