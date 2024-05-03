import { addMessage, chatData } from "@/redux/userSlice/chatMessage.slice"
import { userData } from "@/redux/userSlice/user.slice"
import { userListApi } from "@/services/room"
import { socket } from "@/socket"
import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"



export const userListHook = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [userList, setUserList] = useState()
    const [chatItemData, setChatItemData] = useState(null);
    const [message, setMessage] = useState()
    const [thumbnail, setThumbnail] = useState(null);
    const [receiverId, setReceiverId] = useState()
    const [inputSearch, setInputSearch] = useState("")
    const [activeUserId, setActiveUserId] = useState()




    const dispatch = useDispatch()
    const chatList = useSelector((state) => state.chat)
    const userId = useSelector((state) => state.user)
    const [image, setImage] = useState()
    const [file, setFile] = useState()

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

        console.log(file);
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    const handleChatList = async (index) => {
        console.log(index);
        if (userList && userList.length > index) {
            const data = userList[index];
            setChatItemData(data);
            setReceiverId(data)
            setActiveUserId(index)
        }
    }

    const handleMessage = (e) => {
        setMessage(e.target.value)
    }

    const sendMessage = () => {
        dispatch(addMessage({ senderId: userId?.data?._id, message: message, image: thumbnail }))
        console.log({ "socket:::id": socket.id });
        socket.emit('send::message', { senderId: userId?.data?._id, receiveId: receiverId?.userDetails?._id, message: message, image: thumbnail })
        setMessage('')
        setThumbnail('')
    };

    const convert = async () => {
        const semiTransparentRedPng = await sharp({
            create: {
                width: 48,
                height: 48,
                channels: 4,
                background: { r: 255, g: 0, b: 0, alpha: 0.5 }
            }
        }).png().toBuffer()
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        setFile(file)
        reader.onload = (e) => {
            setThumbnail(e.target.result);
        };

        reader.readAsDataURL(file);
        // console.log(reader.readAsDataURL(file));
    };


    const dateWiseFilter = (messages) => {
        if (messages) {

            const messageGroup = {};
            messages.forEach((message) => {
                const dateKey = moment(message?.createdAt).format("YYYY-MM-DD");
                if (moment().format('YYYY-MM-DD') === dateKey) {
                    if (!messageGroup['Today']) {
                        messageGroup['Today'] = [];
                    }
                    messageGroup['Today'].push(message)

                }

                if (moment().subtract(1, 'day').format('YYYY-MM-DD') == dateKey) {
                    if (!messageGroup['Yesterday']) {
                        messageGroup['Yesterday'] = [];
                    }
                    messageGroup['Yesterday'].push(message)
                }

                if (moment().format('YYYY-MM-DD') != dateKey && moment().subtract(1, 'day').format('YYYY-MM-DD') != dateKey) {
                    if (!messageGroup[dateKey]) {
                        messageGroup[dateKey] = [];
                    }
                    messageGroup[dateKey].push(message);
                }
            });
            return messageGroup;
        }
    };

    const getMessage = dateWiseFilter(chatList?.data);

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
        inputSearchHandle,
        activeUserId,
        getMessage
    }
}