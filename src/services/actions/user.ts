import { getUserApi, loginUserApi } from "../../utils/api";
import { setCookie } from "../../utils/utils";

export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const SET_LOGIN_USER_ERROR = "SET_LOGIN_USER_ERROR";
export const RESET_LOGIN_USER_ERROR = "RESET_LOGIN_USER_ERROR";
export const RESET_USER = "RESET_USER";
export const SET_USER = "SET_USER";
export const SET_USER_FAILED = "SET_USER_FAILED";
export const UPDATE_USER_FAILED = "UPDATE_USER_FAILED";
export const GET_USER_FAILED = "GET_USER_FAILED";
export const REFRESH_TOKEN_FAILED = "REFRESH_TOKEN_FAILED";
export const REFRESH_TOKEN_SUCCESS = "REFRESH_TOKEN_SUCCESS";

//Можно лучше: Рекомендую писать Switch Case вместо if
export function loginUser(email: string, password: string) {
  return function (dispatch: any) {
    // Необходимо исправить: Рекомендую указать типизацию
    dispatch({
      type: RESET_LOGIN_USER_ERROR,
    });
    loginUserApi(email, password) // Необходимо исправить: Рекомендую указать типизацию
      .then((res) => {
        if (res && res.success) {
          setCookie("token", res.accessToken.split("Bearer ")[1]);
          localStorage.setItem("token", res.refreshToken);
          localStorage.setItem("userName", res.user.name);
          dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: res.user,
          });
        } else {
          throw new Error("User registration failed");
        }
      })
      .catch((err) => {
        dispatch({
          type: SET_LOGIN_USER_ERROR,
          payload: err.message,
        });
      });
  };
}

export const getUser = () => (dispatch: any) => {
  getUserApi() // Необходимо исправить: Рекомендую указать типизацию
    .then((res) => {
      localStorage.setItem("userName", res.user.name);
      dispatch({
        type: SET_USER,
        payload: res.user,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_USER_FAILED,
      });
    });
};
