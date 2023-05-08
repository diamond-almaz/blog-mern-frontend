import axios from 'axios';


const devURL = 'http://localhost:4444';

const prodURL = 'https://mern-blog-kosmonaf.onrender.com';

export const baseURL = prodURL;

const instance = axios.create({
  baseURL,
})


instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token');
  return config;
})

export default instance;