import axios from 'axios';
import property from '../configs/property.json';
const server = property.designerServerHost;

export const userService = {
    login
};

async function login(username, password) {
  return new Promise(async function(resolve, reject) {
    const requestOptions = {
      method: 'POST',
      mode: 'cors',
      url: `${server}/oauth/login`,
      headers: { 'Content-Type': 'application/json' },
      data: {
        username: username,
        password: password
      }
    };
    try {
      const response = await axios(requestOptions);
      const user = response.data;
      localStorage.setItem('users', user);
      localStorage.setItem('token', user.token);
      localStorage.setItem('refreshToken', user.refreshToken);
      resolve(user);
    } catch (err) {
      console.error(err);
      if(err.response) {
        reject(err.response.data.message);
      } else {
        reject(err.message);
      } 
    }
  })
}