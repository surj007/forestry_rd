const axios = require('axios');

function login () {
  return axios.post('http://127.0.0.1/auth/login', {
    username: 's',
    password: 's'
  });
}

module.exports = {
  login
}