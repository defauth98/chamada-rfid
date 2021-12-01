import axios from 'axios';

const api = axios.create({
  baseURL: 'http://52.14.185.186:1717/',
});

export default api;
