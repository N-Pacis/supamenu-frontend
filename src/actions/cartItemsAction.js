
// Create Redux action types
export const SAVE_CART_ITEMS = "SAVE_CART_ITEMS";
export const SAVE_ORDER_INFO = "SAVE_ORDER_INFO"
export const SAVE_RESTAURANT_INFO = "SAVE_RESTAURANT_INFO"

// Create Redux action creators that return an action
export const saveCartItemsSuccess = (cartItems) => ({
    type: SAVE_CART_ITEMS,
    payload: cartItems
});

export const saveOrderInfoSuccess = (orderInfo) => ({
    type: SAVE_ORDER_INFO,
    payload: orderInfo
});

export const saveRestaurantInfoSuccess = (restaurantInfo) => ({
    type: SAVE_RESTAURANT_INFO,
    payload: restaurantInfo
});

export function saveCartItemsFn(cartItems) {
    return (dispatch) => dispatch(saveCartItemsSuccess(cartItems));
}

export function saveOrderInfoFn(orderInfo) {
    return (dispatch) => dispatch(saveOrderInfoSuccess(orderInfo));
}

export function saveRestaurantInfoFn(restaurantInfo) {
    return (dispatch) => dispatch(saveRestaurantInfoSuccess(restaurantInfo));
}


