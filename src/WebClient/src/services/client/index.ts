import axios from 'axios'

export const serverUrl = ''
export const workingLocalServerUrl = 'http://localhost:5000/'

const token = localStorage.getItem('token')

const apiClient = axios.create({
  baseURL: serverUrl,
  responseType: 'json'
})

export const workingApiClient = axios.create({
  baseURL: workingLocalServerUrl,
  responseType: 'json',
  headers: {
    Authorization: `Bearer ${token}`
  }
})

export default apiClient
