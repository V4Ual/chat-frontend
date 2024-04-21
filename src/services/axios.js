import { config } from '@/constants'
import { checkHasCookie, handleGetCookie, handleRemoveCookie } from '@/utils';
import axios from 'axios'

const axiosApi = axios.create({ baseURL: config.apiDomain })



axiosApi.interceptors.request.use(
    (config) => {

        console.log(!config.headers['authorization']);
        // set header with access token if not available

        if (!config.headers['authorization']) {
            const token = handleGetCookie("_token")
            config.headers['authorization'] = token ? `Bearer ${token}` : ""
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosApi.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle response errors here
        if (error?.response?.status === 404) {
            console.log(" ERROR => 404 => API not available");
        } else if (error?.response?.status === 500) {
            console.log(" ERROR => 500 => Server Error");
        } else if (error?.response?.status === 401 || error?.response?.status === 498) {
            if (checkHasCookie("_token")) {
                handleRemoveCookie("_token")
                window.location('/login')
            }
        } else {
            console.log("/other-errors.");
        }

        return Promise.reject(error);
    }
);


export default axiosApi