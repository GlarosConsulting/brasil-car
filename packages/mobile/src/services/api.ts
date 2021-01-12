import {
  NODE_ENV,
  APP_API_URL_DEVELOPMENT,
  APP_API_URL_PRODUCTION,
} from '@env';
import axios from 'axios';

const baseURL =
  NODE_ENV === 'development' ? APP_API_URL_DEVELOPMENT : APP_API_URL_PRODUCTION;

const api = axios.create({
  baseURL,
});

export default api;
