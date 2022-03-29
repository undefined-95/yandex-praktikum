import { getIngredients } from "../../utils/api";

export const GET_INGREDIENTS = "GET_INGREDIENTS";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

//Можно лучше: Рекомендую использовать switch case
export function getMenuIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS,
    });
    // Необходимо исправить: Рекомендую указать типизацию
    getIngredients()
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            payload: res.data.map((item) => ({
              ...item,
              qty: 0,
            })),
          });
        } else {
          dispatch({
            type: GET_INGREDIENTS_FAILED,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        });
      });
  };
}
