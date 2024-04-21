import { addMessage, chatData } from "@/redux/userSlice/chatMessage.slice"
import { userListApi } from "@/services/room"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"



export const userListHook = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [userList, setUserList] = useState()
    const [chatItemData, setChatItemData] = useState(null);
    const [message, setMessage] = useState()



    const dispatch = useDispatch()
    const chatList = useSelector((state) => state.chat)
    const userId = useSelector((state) => state.user)
    const [image, setImage] = useState()

    useEffect(() => {
        handleResponse()
    }, [])

    useEffect(() => {
        if (chatItemData) {
            dispatch(chatData(chatItemData._id))
            dispatch(userData())
        }
    }, [chatItemData])

    const handleResponse = async () => {
        setIsLoading(true)
        const responseApi = await userListApi()
        setUserList(responseApi?.data)
        toast.success(responseApi?.responseMessage)
    }

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    const handleChatList = async (index) => {
        if (userList && userList.length > index) {
            const data = userList[index];
            setChatItemData(data);
        }
    }

    const handleMessage = (e) => {
        setMessage(e.target.value)
    }

    const sendMessage = () => {
        dispatch(addMessage({ senderId: userId?.data?._id, message: message, image: image }))
        setMessage('')
    };

    return {
        handleResponse,
        userList,
        sendMessage, handleImage, handleChatList,
        chatList,
        chatItemData,
        message,
        image,
        handleMessage
    }
}