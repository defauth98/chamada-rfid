import axios from 'axios';

const api = axios.create({
  baseURL: 'http://3.134.97.232:1717/',
});

export default api;
