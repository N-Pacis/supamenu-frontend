import { combineReducers } from "redux";
import message from "./messageReducer";
import authReducer from "./authReducer";
import cartItemsReducer from "./cartItemsReducer";


const rootReducer = combineReducers({
  auth: authReducer,
  message,
  cart: cartItemsReducer
});

export default rootReducer;
