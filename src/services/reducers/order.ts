import {
  CREATE_ORDER,
  GET_ORDER_NUMBER_FAILED,
  GET_ORDER_NUMBER_SUCCESS,
  GET_ORDER_NUMBER,
  RESET_ORDER,
} from '../actions/order';

type IInitialState = {
  ingredients: [],
  number: string,
  getOrderNumberFailed: boolean,
  orderNumberRequest: boolean,
}

const initialState: IInitialState = {
  ingredients: [],
  number: '',
  getOrderNumberFailed: false,
  orderNumberRequest: false,
};

export const order = (state = initialState, action: any): IInitialState => {
  switch (action.type) {
    case CREATE_ORDER: {
      state.ingredients = action.payload;

      return state;
    }
    case GET_ORDER_NUMBER: {
      state.orderNumberRequest = true;
      state.getOrderNumberFailed = false;

      return state;
    }
    case GET_ORDER_NUMBER_SUCCESS: {
      state.ingredients = [];
      state.number = action.payload;
      state.orderNumberRequest = false;

      return state;
    }
    case GET_ORDER_NUMBER_FAILED: {
      state.getOrderNumberFailed = true;
      state.orderNumberRequest = false;

      return state;
    }
    case RESET_ORDER: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
