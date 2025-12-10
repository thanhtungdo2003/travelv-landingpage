import axios from 'axios';
import api from '../cores/axios';

export const sendVerifyEmail = async (email) => {
  try {
    const response = await api.post(`/v1/email/send-verify-mail/${email}`);
    return response.data;
  } catch (err) {
    console.log(err);
    throw Error(err)
  }
}
export const verifyEmail = async (token) => {
  try {
    const response = await api.post(`/v1/email/verify-mail/${token}`);
    return response.data;
  } catch (err) {
    console.log(err);
    throw Error(err)
  }
}

export const createOrder = async (method, pack) => {
  try {
    const res = await api.post(`/v1/payment/${method}/create`, { pack }, {
      headers: {
        Authorization: `Bearer ${getTokenCookie()}`
      }
    });
    return res.data;
  } catch (err) {
    return err
  }
}

export const update = async (data) => {
  try {
    const res = await api.patch(`/v1/user/update`, data, {
      headers: {
        Authorization: `Bearer ${getTokenCookie()}`
      }
    });
    return res.data;
  } catch (err) {
    return err
  }
}
export const login = async (email, password) => {
  try {
    const res = await api.post(`/v1/user/login`, { email: email, password: password });
    return res.data;
  } catch (err) {
    return err
  }
}

export const getByEmail = async (email) => {
  try {
    const res = await api.get(`/v1/user/get-by-email/${email}`);
    return res.data;
  } catch (err) {
    return err
  }
}
export const isEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
export const logout = () => {
  deleteTokenCookie();
  window.localStorage.removeItem('account_email');
  window.localStorage.removeItem('account_username');
  window.localStorage.removeItem('account_id');
  setTimeout(() => {
    window.open('/travelv-landingpage/', '_parent')
  }, 200);
}


export function setTokenCookie(token, days = 1) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = `access_token=${token}; ${expires}; path=/; Secure; SameSite=Strict`;
}

export function deleteTokenCookie() {
  document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure; SameSite=Strict";
}

export function getTokenCookie() {
  const name = "access_token=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookies = decodedCookie.split(';');
  for (let c of cookies) {
    c = c.trim();
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return null;
}
