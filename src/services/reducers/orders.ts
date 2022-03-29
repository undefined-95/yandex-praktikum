import {
  GET_ORDERS,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAILED,
} from '../actions/orders';

const initialState = {
  orders: [],
  ordersRequest: false,
  getOrdersFailed: false,
};

export const orders = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_ORDERS: {
      return {
        ...state,
        ordersRequest: true,
        getOrdersFailed: false,
      };
    }
    case GET_ORDERS_SUCCESS: {
      return {
        ...state,
        orders: action.payload,
        ordersRequest: false,
      };
    }
    case GET_ORDERS_FAILED: {
      return {
        ...state,
        getOrdersFailed: true,
        ordersRequest: false,
      };
    }
    default: {
      return state;
    }
  }
};
