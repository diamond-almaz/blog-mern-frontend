import axios from 'axios';


const isProd = process.env.NODE_ENV !== 'production';

const devURL = 'http://localhost:4444';

const prodURL = 'https://mern-blog-kosmonaf.onrender.com';

export const baseURL = isProd ? prodURL : devURL;

const instance = axios.create({
  baseURL,
})


instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token');
  return config;
})

export default instance;