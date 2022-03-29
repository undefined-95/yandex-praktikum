import {
  RESET_USER,
  SET_USER,
  SET_USER_FAILED,
  GET_USER_FAILED,
  UPDATE_USER_FAILED,
  REFRESH_TOKEN_FAILED,
  LOGIN_USER_SUCCESS,
  REFRESH_TOKEN_SUCCESS,
  SET_LOGIN_USER_ERROR,
  RESET_LOGIN_USER_ERROR,
} from '../actions/user';

const initialState = {
  email: '',
  name: '',
  isTokenWasRequested: false,
  getUserFailed: false,
  registerUserError: '',
  updateUserError: '',
  loginUserError: '',
};

export const user = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        email: action.payload.email,
        name: action.payload.name,
        registerUserRequest: false,
        isTokenWasRequested: false,
      };
    }
    case SET_LOGIN_USER_ERROR: {
      return {
        ...state,
        loginUserError: action.payload,
      };
    }
    case RESET_LOGIN_USER_ERROR: {
      return {
        ...state,
        loginUserError: '',
      };
    }
    case LOGIN_USER_SUCCESS: {
      return {
        ...state,
        email: action.payload.email,
        name: action.payload.name,
      };
    }
    case SET_USER_FAILED: {
      return {
        ...state,
        setUserFailed: true,
      };
    }
    case GET_USER_FAILED: {
      return {
        ...state,
        getUserFailed: true,
      };
    }
    case REFRESH_TOKEN_FAILED: {
      return {
        ...state,
        refreshTokenFailed: true,
      };
    }
    case REFRESH_TOKEN_SUCCESS: {
      return {
        ...state,
        isTokenWasRequested: true,
      };
    }
    case RESET_USER: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
