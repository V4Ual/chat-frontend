import { searchUserApi } from "@/services"
import { useEffect, useState } from "react"



export const searchHook = () => {
    const [searchUser, setSearchUser] = useState("")
    const [searchList, setSearchList] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [isShowSearchBox, setIsShowSearchBox] = useState(false)

    const inputSearchOnChange = (e) => {
        setSearchUser(e.target.value)
    }

    useEffect(() => {
        handleSearch()
    }, [searchUser])


    const handleSearchBoxToggle = () => {
        console.log({ "call togle": true });
        isShowSearchBox ? setIsShowSearchBox(false) : setIsShowSearchBox(true)
    }

    const handleSearch = async () => {
        setIsLoading(true)
        const response = await searchUserApi(searchUser)
        setSearchList(response?.data)
        setIsLoading(false)
    }

    return {
        searchList,
        inputSearchOnChange,
        setIsLoading,
        handleSearch,
        handleSearchBoxToggle,
        isShowSearchBox
    }


}