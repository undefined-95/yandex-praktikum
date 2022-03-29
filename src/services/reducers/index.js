import { combineReducers } from "redux";
import { burgerIngredients } from "./burger-ingredients";
import { constructorIngredients } from "./constructor-ingredients";
import { order } from "./order";
import { orders } from "./orders";
import { user } from "./user";
import { ws } from "./ws";

export const rootReducer = combineReducers({
  burgerIngredients,
  constructorIngredients,
  order,
  orders,
  user,
  ws,
});
