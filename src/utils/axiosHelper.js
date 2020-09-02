import axios from "axios";
import { history } from '../utils/history';

import property from '../configs/property.json';
const server = property.designerServerHost;

const axiosClient = axios.create({
  baseURL: `${server}`,
  headers: {
    "Content-Type": "application/json"
  },
  responseType: "json"
})

/**
 * Token이 있는 경우 Bearer token을 Header에 설정
 */
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  Promise.reject(error);
})

/**
 * 401 Error와 함꼐 Response가 Fail하는 경우 Token refresh
 * _retry flag를 사용하여 1회에 한해서만 Token refresh 발급 후 재시도 합니다.
 */
axiosClient.interceptors.response.use((response) => {
  return response
}, function (error) {
  const originalRequest = error.config;
  if (error.response.status === 401 && (originalRequest.url === `/oauth/login` || originalRequest.url === `/oauth/token`)) {
    if(originalRequest.url === `/oauth/token`) resetUserInfo();
    return Promise.reject(error);
  }

  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const refreshToken = localStorage.getItem('refreshToken');
    return axios.post(`${server}/oauth/token`,
      {
        "refreshToken": refreshToken
      })
      .then(res => {
        if (res.status === 201) {
          const data = res.data;
          localStorage.setItem('token', data.token);
          localStorage.setItem('refreshToken', data.refreshToken);
          originalRequest.headers['Authorization'] = 'Bearer ' + data.token;
          return axios(originalRequest);
        }
      })
      .catch(error => {
        console.error(error);
        resetUserInfo();
        return Promise.reject(error);
      })
  }
  return Promise.reject(error);
});

function resetUserInfo() {
  localStorage.clear();
  history.push('/login');
}

export default axiosClient;