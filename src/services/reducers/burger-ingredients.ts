import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
} from "../actions";

type IInitialState = {
  ingredients: [];
  ingredientsRequest: boolean;
  getIngredientsFailed: boolean;
};

const initialState: IInitialState = {
  ingredients: [],
  ingredientsRequest: false,
  getIngredientsFailed: false,
};

// Необходимо исправить: Рекомендую указать типизацию
export const burgerIngredients = (
  state = initialState,
  action: any
): IInitialState => {
  switch (action.type) {
    case GET_INGREDIENTS: {
      state.ingredientsRequest = true;
      state.getIngredientsFailed = false;

      return state;
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredients: action.payload,
        ingredientsRequest: false,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      state.getIngredientsFailed = true;
      state.ingredientsRequest = false;

      return state;
    }
    default: {
      return state;
    }
  }
};
