import { combineReducers } from "redux";
import message from "./messageReducer";
import authReducer from "./authReducer";


const rootReducer = combineReducers({
  auth: authReducer,
  message,
});

export default rootReducer;
