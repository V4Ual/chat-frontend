import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice/user.slice'
import chatSlice from './userSlice/chatMessage.slice'

export const store = configureStore({
    reducer: {
        user: userSlice,
        chat: chatSlice
    },

})