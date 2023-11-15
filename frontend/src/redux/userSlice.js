import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    id: null,
    name: null,
    email: null,
    phone: null,
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserDetails: (state, action) => {
            state.id = action.payload._id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.phone = action.payload.phone;
        },
        userlogin: (state, action) => {
            state.value = {
                ...action.payload,
                userAuth: true
            }
        },
        userlogout: (state) => {
            state.value = {
                userAuth: false,
                user: null
            }
        }
    }
})
export const { setUserDetails, userlogin, userlogout } = userSlice.actions
export default userSlice.reducer;
