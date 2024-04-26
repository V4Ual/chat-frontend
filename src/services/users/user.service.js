import axiosApi from "../axios"


export const searchUserApi = async (search) => {
    try {
        const responsesData = await axiosApi.get(`/users?search=${search}`)
        return responsesData?.data || {}
    } catch (error) {
        throw error.response?.error
    }
}