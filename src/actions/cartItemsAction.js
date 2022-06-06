
// Create Redux action types
export const SAVE_CART_ITEMS = "SAVE_CART_ITEMS";

// Create Redux action creators that return an action
export const saveCartItemsSuccess = (cartItems) => ({
    type: SAVE_CART_ITEMS,
    payload: cartItems
});


export function saveCartItemsFn(cartItems) {
    console.log(cartItems)
    return (dispatch) => dispatch(saveCartItemsSuccess(cartItems));
}

