import { chatListing, } from '@/services/room'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const chatData = createAsyncThunk("chatList", async (chatId) => {
    const data = await chatListing(chatId)
    return data?.data
})

export const chatSlice = createSlice({
    name: 'chatList',
    initialState: {
        data: null,
        loading: false,
        error: false
    },
    reducers: {
        addMessage(state, action) {
            console.log(action.payload);
            state.data = [...state.data, action.payload]
        }
    },
    extraReducers: (builder) => {
        builder.addCase(chatData.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(chatData.rejected, (state, action) => {
            state.error = true
        })
        builder.addCase(chatData.fulfilled, (state, action) => {
            state.data = action.payload
            state.loading = false
        })
    }
})

export const { addMessage } = chatSlice.actions

export default chatSlice.reducer