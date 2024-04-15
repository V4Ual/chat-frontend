export const loginValidatorCheck = () => {
    const loginValidator = (loginData = {}) => {
        const { email, password } = loginData;

        let errors = {};
        if (!email) {
            errors.email = "Plz Enter the mail";
        } else {
            delete errors.email;
        }

        if (!password) {
            errors.password = "plz Enter the password";
        } else {
            delete errors.password;
        }

        return errors;
    };
    const onChangeLoginData = (name, value, preserveError) => {
        let errors = { ...preserveError };

        switch (name) {
            case "email":
                if (!value) errors.email = "plz enter the email on";
                else delete errors.email;
                break;

            case "password":
                if (!value) {
                    errors.password = "plz enter the password on";
                } else {
                    delete errors.password;
                }

            default:
                break;
        }
        return errors;
    };

    return {
        onChangeLoginData,
        loginValidator,
    };
};

export const registrationValidatorCheck = () => {
    const registrationValidator = (registrationData = {}) => {
        console.log(registrationData);
        const { firstName, email, password, phoneNumber, confirmPassword } = registrationData;
        console.log({ firstName, email, password, phoneNumber, confirmPassword });
        const errors = {};
        if (!firstName) {
            errors.firstName = "plz enter the name firstName";
        } else {
            delete errors.firstName;
        }
        if (!email) {
            errors.email = "plz enter the email re";
        } else {
            delete errors.email;
        }
        if (!password) {
            errors.password = "plz enter the password re";
        } else {
            delete errors.password;
        }
        if (!phoneNumber) {
            errors.phoneNumber = "plz enter the phoneNumber re";
        } else {
            delete errors.phoneNumber;
        }
        if (!confirmPassword && password != confirmPassword) {
            errors.confirmPassword = "plz enter the confirmPassword ";
        } else {
            delete errors.confirmPassword;
        }
        return errors;
    };

    const onChangeRegistrationData = (name, value, errorMessage) => {
        const errors = { ...errorMessage };

        console.log(name, value, errorMessage);
        switch (name) {
            case "firstName":
                if (!value) {
                    errors.firstName = "plz enter the name";
                } else {
                    delete errors.firstName;
                }
                break;
            case "email":
                if (!value) {
                    errors.email = "plz enter the email";
                } else {
                    delete errors.email;
                }
                break;
            case "password":
                if (!value) {
                    errors.password = "plz enter the password";
                } else {
                    delete errors.password;
                }
                break;
            case "phoneNumber":
                if (!value) {
                    errors.phoneNumber = "plz enter the phoneNumber";
                } else {
                    delete errors.phoneNumber;
                }
                break;
            case "confirmPassword":
                if (!value) {
                    errors.confirmPassword = "previous password does not match";
                } else {
                    delete errors.confirmPassword;
                }
                break;

            default:
                break;
        }

        return errors;
    };

    return {
        onChangeRegistrationData,
        registrationValidator,
    };
};
