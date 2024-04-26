import axiosApi from "../axios"

export const userListApi = async (search) => {
    try {
        const responsesData = await axiosApi.get(`room/user-list?search=${search}`)
        return responsesData?.data || {}
    } catch (error) {
        throw error.response?.data
    }
}

export const chatListing = async (chatId) => {
    try {
        const responsesData = await axiosApi.get(`chat/${chatId}`)
        return responsesData?.data || {}
    } catch (error) {
        throw error.response?.data
    }
}