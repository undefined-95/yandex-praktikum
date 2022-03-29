import { URL } from './constant';
import { getCookie, setCookie } from './utils';

const checkResponse = (res: Response) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const getIngredients = () => {
  return fetch(`${URL}/ingredients`, {}).then(checkResponse);
};

export const getOrderNumber = (orderData: string[]) => {
  return fetch(`${URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token'),
    },
    body: JSON.stringify(orderData),
  }).then(checkResponse);
};

export const getOrder = (orderNumber: string) => {
  return fetch(`${URL}/orders/${orderNumber}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(checkResponse);
};

export const loginUserApi = (email: string, password: string) => {
  return fetch(`${URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: email, password: password }),
  }).then(checkResponse);
};

export const getUserApi = () => {
  return fetch(`${URL}/auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token'),
    },
  })
    .then(checkResponse)
    .catch((err) => {
      if (err.message === 'jwt expired') {
        refreshTokenApi().then((res) => {
          setCookie('token', res.accessToken);
          localStorage.setItem('token', res.refreshToken);
          fetch(`${URL}/auth/user`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + getCookie('token'),
            },
          }).then(checkResponse);
        });
      } else {
        return Promise.reject(err);
      }
    });
};

export const refreshTokenApi = () => {
  return fetch(`${URL}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token') || '',
    },
    body: JSON.stringify({
      token: localStorage.getItem('token'),
    }),
  }).then(checkResponse);
};
