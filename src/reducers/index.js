import { combineReducers } from "redux";
import message from "./messageReducer";
import authReducer from "./authReducer";
import cartItemsReducer from "./cartItemsReducer";
import serviceProvidersReducer from "./serviceProvidersReducer";


const rootReducer = combineReducers({
  auth: authReducer,
  message,
  cart: cartItemsReducer,
  serviceProv: serviceProvidersReducer
});

export default rootReducer;
