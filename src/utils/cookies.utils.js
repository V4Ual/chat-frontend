import { deleteCookie, getCookie, getCookies, hasCookie, setCookie } from 'cookies-next';

export const handleSetCookie = (name, value, options = {}) => {
    return setCookie(name, value, options);
};

export const handleGetCookie = (name, options = {}) => {
    return getCookie(name, options);
};

export const checkHasCookie = (name, options = {}) => {
    return hasCookie(name, options);
};

export const handleRemoveCookie = (name, options = {}) => {
    deleteCookie(name, options);
};