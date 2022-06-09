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

export async function sendCardPayment(dataToPost) {
  try {
    dataToPost.regChannel = "WEB"
    const url = `/payments/card`;
    let response = await axios.post(`${ENDPOINT}${url}`, dataToPost);
    toast.success("Payment Initiated Successfully");
    return { success: true, data: response?.data }

  } catch (err) {
    toast.error(err?.response?.data?.apierror.message || "Payment Initiation Failed")
    return { sucess: false, err };
  }
}
