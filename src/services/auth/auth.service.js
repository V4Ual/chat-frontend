import axiosApi from "../axios"


export const loginApi = async (loginParameter = {}) => {
    try {
        const responsesData = await axiosApi.post('/users/login', loginParameter)
        return responsesData?.data || {}
    } catch (error) {
        throw error.response?.data
    }
}


export const registrationApi = async (registrationParameter = {}) => {
    try {
        const responsesData = await axiosApi.post('users/create', registrationParameter)
        return responsesData?.data || {}
    } catch (error) {
        throw error.response?.data
    }
}

export const getProfileApi = async (registrationParameter = {}) => {
    try {
        const responsesData = await axiosApi.get('users/get-profile', registrationParameter)
        return responsesData?.data || {}
    } catch (error) {
        throw error.response?.data
    }
}