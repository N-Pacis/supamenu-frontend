import * as actions from "../actions/cartItemsAction";

export const initialState = {
  cartItems: [],
  order_id: '',
  restaurant: {}
};

export default function cartItemsReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SAVE_CART_ITEMS:
      return {
        ...state,
        cartItems: action.payload
      };
    case actions.SAVE_ORDER_INFO:
      return {
        ...state,
        order_id: action.payload
      };
    case actions.SAVE_RESTAURANT_INFO:
        return {
          ...state,
          restaurant: action.payload
        };
    default:
      return state;
  }
}
