import { registrationApi } from "@/services"
import { registrationValidatorCheck } from "@/validatiors"
import { useState } from "react"
import { toast } from "react-toastify"

export const registrationHook = () => {

    const { onChangeRegistrationData, registrationValidator } = registrationValidatorCheck()
    const [registrationData, setRegistrationData] = useState({
        firstName: "",
        email: "",
        password: "",
        phoneNumber: "",
        confirmPassword: ""
    })
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target || {}
        const error = onChangeRegistrationData(name, value, errorMessage)
        setErrorMessage(error)
        setRegistrationData({ ...registrationData, [name]: value })
    }

    const handlePayload = async () => {
        try {

            setIsLoading(true)
            const error = registrationValidator(registrationData)
            setErrorMessage(error)
            if (Object.keys(error).length > 0) {
                return
            }
            const responsesData = await registrationApi(registrationData)
            toast.success(responsesData?.responseMessage)
            setIsLoading(false)

        } catch (error) {
            console.log(error);
            toast.error(error?.responseMessage || error?.errorMessage || 'api site error')
        } finally {
            setIsLoading(false)
        }
    }


    return {
        handleChange,
        handlePayload,
        isLoading,
        errorMessage,
        registrationData
    }

}