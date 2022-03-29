import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  REORDER_INGREDIENTS,
  RESET_INGREDIENTS,
} from "../actions/constructor-ingredients";

type IInitialState = {
  constructorIngredients: any[]; // Необходимо исправить: Рекомендую указать типизацию
};

const initialState: IInitialState = {
  constructorIngredients: [],
};

// Необходимо исправить: Рекомендую указать типизацию
export const constructorIngredients = (
  state = initialState,
  action: any
): IInitialState => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      if (action.payload.type === "bun") {
        const filtered = [...state.constructorIngredients].filter(
          (item) => item.type !== "bun"
        );
        return {
          ...state,
          constructorIngredients: [...filtered, action.payload],
        };
      }
      return {
        ...state,
        constructorIngredients: [
          ...state.constructorIngredients,
          action.payload,
        ],
      };
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        constructorIngredients: [...state.constructorIngredients].filter(
          (item) => item._id !== action.payload
        ),
      };
    }
    case REORDER_INGREDIENTS: {
      const filtered = [...state.constructorIngredients].filter(
        (item) => item.type === "bun"
      );
      const reordered = filtered.concat(action.payload);
      return {
        ...state,
        constructorIngredients: reordered,
      };
    }
    case RESET_INGREDIENTS: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
