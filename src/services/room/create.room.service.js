import axiosApi from "../axios"

export const userListApi = async () => {
    try {
        const responsesData = await axiosApi.get('http://localhost:3001/api/v1/room/user-list')
        return responsesData?.data || {}
    } catch (error) {
        throw error.response?.data
    }
}

export const chatListing = async (chatId) => {
    try {
        const responsesData = await axiosApi.get(`http://localhost:3001/api/v1/chat/${chatId}`)
        return responsesData?.data || {}
    } catch (error) {
        throw error.response?.data
    }
}