import { addMessage, chatData } from "@/redux/userSlice/chatMessage.slice"
import { userData } from "@/redux/userSlice/user.slice"
import { userListApi } from "@/services/room"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"



export const userListHook = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [userList, setUserList] = useState()
    const [chatItemData, setChatItemData] = useState(null);
    const [message, setMessage] = useState()
    const [thumbnail, setThumbnail] = useState(null);
    const [inputSearch, setInputSearch] = useState("")




    const dispatch = useDispatch()
    const chatList = useSelector((state) => state.chat)
    const userId = useSelector((state) => state.user)
    const [image, setImage] = useState()

    useEffect(() => {
        handleResponse()
    }, [inputSearch])

    useEffect(() => {
        if (chatItemData) {
            dispatch(chatData(chatItemData._id))
            dispatch(userData())
        }
    }, [chatItemData])


    const inputSearchHandle = (e) => {
        setInputSearch(e.target.value)
    }

    const handleResponse = async () => {
        setIsLoading(true)
        const responseApi = await userListApi(inputSearch)
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
        setThumbnail('')
    };


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            setThumbnail(e.target.result);
        };

        reader.readAsDataURL(file);
    };

    return {
        handleResponse,
        userList,
        sendMessage, handleImage, handleChatList,
        chatList,
        chatItemData,
        message,
        image,
        handleMessage,
        handleFileChange,
        thumbnail,
        inputSearchHandle
    }
}