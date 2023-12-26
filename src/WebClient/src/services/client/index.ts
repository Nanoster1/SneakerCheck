import axios from 'axios'

export const serverUrl = ''
export const workingLocalServerUrl = 'http://localhost:5000/'

function getToken() {
  return localStorage.getItem('token')
}

const apiClient = axios.create({
  baseURL: serverUrl,
  responseType: 'json'
})

export const workingApiClient = axios.create({
  baseURL: workingLocalServerUrl,
  responseType: 'json',
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
})

workingApiClient.interceptors.request.use(config => {
  // Получаем токен перед каждым запросом
  const token = getToken();
  if (token) {
    // Если токен есть, добавляем его в заголовки
    // @ts-ignore
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default apiClient
