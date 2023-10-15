import axios from 'axios'
const URL = 'http://localhost:3000'
const axiosInstance = axios.create({
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=UTF-8',
  },
  baseURL: URL,
})

axios.defaults.baseURL = URL

export default axiosInstance
