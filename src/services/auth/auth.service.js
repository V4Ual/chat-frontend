import axiosApi from "../axios"


export const loginApi = async (loginParameter = {}) => {
    try {
        const responsesData = await axiosApi.post('http://localhost:3001/api/v1/users/login', loginParameter)
        return responsesData?.data || {}
    } catch (error) {
        throw error.response?.data
    }
}


export const registrationApi = async (registrationParameter = {}) => {
    try {
        console.log("regitsta", registrationParameter);
        const responsesData = await axiosApi.post('http://localhost:3001/api/v1/users/create', registrationParameter)
        return responsesData?.data || {}
    } catch (error) {
        throw error.response?.data
    }
}