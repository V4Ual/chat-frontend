import { getProfileApi } from '@/services'
import { userListApi } from '@/services/room'
import { createSlice, configureStore, createAsyncThunk } from '@reduxjs/toolkit'

export const userData = createAsyncThunk("getUser", async () => {
    const data = await getProfileApi()
    return data?.data
})

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: null,
        loading: false,
        error: false
    },
    extraReducers: (builder) => {
        builder.addCase(userData.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(userData.rejected, (state, action) => {
            state.error = true
        })
        builder.addCase(userData.fulfilled, (state, action) => {
            state.data = action.payload
            state.loading = false
        })
    }
})

export default userSlice.reducer