import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    name: '',
    id: '',
    email: '',
    phone: '',
    // image:'',
    token: ''

}
const staffSlice = createSlice({
    name: 'staffz',
    initialState,
    reducers: {
        setStaffDetails: (state, action) => {
            state.id = action.payload._id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.phone = action.payload.phone;
            // state.image=action.payload.image;
            // state.token=action.payload.token;
        },
        staffLogin: (state, action) => {
            state.value = {
                ...action.payload,
                isStaffAuth: true
            }
        },
        staffLogout: (state) => {
            state.value = {
                isStaffAuth: false,
                staff: null,
            }
        }

    }
})
export const { setStaffDetails, staffLogin, staffLogout } = staffSlice.actions;
export default staffSlice.reducer;