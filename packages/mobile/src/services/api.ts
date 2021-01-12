import axios from 'axios';

const nodeEnv = String(process.env.NODE_ENV);

const baseURL =
  nodeEnv === 'development'
    ? String(process.env.APP_API_URL_DEVELOPMENT)
    : String(process.env.APP_API_URL_PRODUCTION);

const api = axios.create({
  baseURL,
});

export default api;
