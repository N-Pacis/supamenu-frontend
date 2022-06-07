import * as actions from "../actions/serviceProvidersAction";

export const initialState = {
  serviceProdiders: [],
  loading: false
};
export default function serviceProvidersReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_SERVICE_PROVIDERS:
      return { ...state, loading: true };
    case actions.GET_SERVICE_PROVIDERS_SUCCESS:
      return {
        serviceProdiders: action.payload,
        loading: false
      };
    case actions.GET_SERVICE_PROVIDERS_FAILURE:
      return { ...state, loading: false};
    
    default:
      return state;
  }
}
