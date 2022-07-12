/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
import axios from 'axios';
import { TEAMS, SIGN_UPS, SIGN_UP_RESULT } from './constants';

const BASE_API_URL = 'https://child-camp-signup.herokuapp.com/';
// const BASE_API_URL = 'http://localhost:3005/';

async function requestWrapper(requestType, url, params) {
  try {
    const { data, status, statusText } = await axios[requestType](url, params);
    if (status === 200) {
      return data;
    }
    throw new Error({ type: status, message: statusText });
  } catch (error) {
    alert(`Ошибка: ${error.message}`);
    return [];
  }
}

export async function getSignUps() {
  // return SIGN_UPS;
  return requestWrapper('get', `${BASE_API_URL}signups`);
}

export async function getTeams(id) {
  // return TEAMS;
  return requestWrapper('get', `${BASE_API_URL}teams/${id}`);
}

export async function addChild(data) {
  // return SIGN_UP_RESULT;
  return requestWrapper('post', `${BASE_API_URL}addchild`, { data });
}

export async function dropChildren() {
  return requestWrapper('post', `${BASE_API_URL}dropchildren`);
}
