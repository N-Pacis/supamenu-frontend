import * as actions from "../actions/cartItemsAction";

export const initialState = {
  cartItems: []
};

export default function cartItemsReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SAVE_CART_ITEMS:
      return {
        cartItems: action.payload
      };
    default:
      return state;
  }
}
