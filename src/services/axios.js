import { config } from '@/constants'
import axios from 'axios'

console.log(process.apiDomain)
const axiosApi = axios.create({ baseURL: config.apiDomain })


export default axiosApi