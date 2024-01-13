


const saveTokenLocalStorage = (data) =>{
    return  localStorage.setItem('token',data)
}

const getTokenForLocalStorage = (data) =>{
    return localStorage.getItem(data)
}