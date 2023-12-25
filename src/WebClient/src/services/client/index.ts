import axios from 'axios'

export const serverUrl = ''
export const workingLocalServerUrl = 'http://192.168.126.193:80'

const apiClient = axios.create({
  baseURL: serverUrl,
  responseType: 'json'
})

export const workingApiClient = axios.create({
  baseURL: workingLocalServerUrl,
  responseType: 'json'
})

export default apiClient
