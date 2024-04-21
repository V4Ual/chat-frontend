import { loginApi } from "@/services"
import { handleSetCookie } from "@/utils"
import { loginValidatorCheck } from "@/validatiors"
// import { loginValidator, onChangeLoginData } from "@/validatiors"
import { useRouter } from "next/router"
import { useState } from "react"
import { toast } from "react-toastify"

export const loginHook = () => {
    const { loginValidator, onChangeLoginData } = loginValidatorCheck()
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState({})

    const route = useRouter()

    const handleLoginChange = (e) => {
        const { name, value } = e.target || {}
        const error = onChangeLoginData(name, value, errorMessage)

        setErrorMessage(error)
        setLoginData({ ...loginData, [name]: value })
    }

    const handleLoginPayload = async () => {
        try {
            setIsLoading(true)
            const errors = loginValidator(loginData);
            setErrorMessage(errors)
            if (Object.keys(errors).length > 0) {
                return;
            }

            const apiResponseLogin = await loginApi(loginData)
            toast.success(apiResponseLogin?.responseMessage)
            route.push('/chat')
            handleSetCookie("_token", apiResponseLogin?.data?.token)
            setIsLoading(false)

        } catch (error) {
            toast.error(error?.responseMessage || error?.message || "api site error");
        } finally {
            setIsLoading(false);
        }

    }

    return {
        handleLoginChange,
        handleLoginPayload,
        isLoading,
        loginData,
        errorMessage

    }
}