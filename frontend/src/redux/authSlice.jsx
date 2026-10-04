import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload.user;
            state.isAuthenticated = true;
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            localStorage.setItem("isAuthenticated", "true"); // Store as a string
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem("user");
            localStorage.removeItem("isAuthenticated");
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
