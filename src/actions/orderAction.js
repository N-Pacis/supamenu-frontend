import axios from 'axios';
import authHeader from '../services/auth-header';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
toast.configure();


const ENDPOINT = import.meta.env.VITE_REACT_APP_BASE_API_URL;

export const SEND_ORDER = "SEND_ORDER";
export const SEND_ORDER_SUCCESS = "SEND_ORDER_SUCCESS";
export const SEND_ORDER_FAILURE = "SEND_ORDER_FAILURE";

export async function fetchSeats(id) {
    try {
        const url = `/seats/list/free-seats/service-provider/${id}`;

        let seatsFromBackend = await axios.get(`${ENDPOINT}${url}`, {
            headers: authHeader(),
        });
        seatsFromBackend = seatsFromBackend?.data;
        return seatsFromBackend
    }
    catch (error) {
        toast.error("Getting seats Failed");
    }
}

export async function fetchOrders(page = 0,id) {
    let limit = 5
    try {
        const url = `/orders/customer-id/${id}?page=${page}&size=${limit}`;

        let seatsFromBackend = await axios.get(`${ENDPOINT}${url}`, {
            headers: authHeader(),
        });
        seatsFromBackend = seatsFromBackend?.data;
        return seatsFromBackend
    }
    catch (error) {
        toast.error("Getting seats Failed");
    }
}

export async function postOrder(dataToPost) {
    try {
        if(dataToPost.seat == undefined) delete dataToPost.seat;

        const url = `/orders`;
        let response = await axios.post(`${ENDPOINT}${url}`, dataToPost, {
            headers: authHeader(),
        });
        toast.success("Order created successfully");
        return { success: true, data: response.data }
    } catch (err) {
        toast.error(err?.response?.data?.apierror.message || "Creating order failed")
        return { sucess: false, err }
    }

}