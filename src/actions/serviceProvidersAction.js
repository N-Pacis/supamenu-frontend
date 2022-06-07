import axios from 'axios';
import authHeader from '../services/auth-header';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

// Create Redux action types
export const GET_SERVICE_PROVIDERS = "GET_SERVICE_PROVIDERS";
export const GET_SERVICE_PROVIDERS_SUCCESS = "GET_SERVICE_PROVIDERS_SUCCESS";
export const GET_SERVICE_PROVIDERS_FAILURE = "GET_SERVICE_PROVIDERS_FAILURE";

const ENDPOINT = import.meta.env.VITE_REACT_APP_BASE_API_URL;


// Create Redux action creators that return an action
export const getServiceProviders = () => ({
    type: GET_SERVICE_PROVIDERS,
});

export const getServiceProvidersSuccess = (serviceProviders) => ({
    type: GET_SERVICE_PROVIDERS_SUCCESS,
    payload: serviceProviders,
});

export const getServiceProvidersFailure = () => ({
    type: GET_SERVICE_PROVIDERS_FAILURE,
});


export function fetchServiceProviders() {
    return async (dispatch, getState) => {
        dispatch(getServiceProviders());
        let page = 0;
        let size = 6;
        try {
            const url = `/service-providers?page=${page}&size=${size}`;

            let serviceProvidersFromBackend = await axios.get(`${ENDPOINT}${url}`, {
                headers: authHeader(),
            });
            serviceProvidersFromBackend = serviceProvidersFromBackend.data.data;
            dispatch(getServiceProvidersSuccess(serviceProvidersFromBackend));
        } catch (error) {
            dispatch(getServiceProvidersFailure());
        }
    };
}
