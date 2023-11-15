
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: "",
    token: "",
};

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setAdminDetails: (state, action) => {
            state.email = action.payload.email;

        },
        adminlogin: (state, action) => {

            state.value = {
                ...action.payload,
                isAdminAuth: true
            }


        },
        adminlogout: (state) => {
            state.value = {
                isAdminAuth: false,
                admin: null
            }
        }
    },
});

export const { setAdminDetails, adminlogin, adminlogout } = adminSlice.actions;
export default adminSlice.reducer;