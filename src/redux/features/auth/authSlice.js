import { createSlice } from '@reduxjs/toolkit';

const loadUserFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('user'); 
        if (!serializedState) return null;
        return JSON.parse(serializedState); 
    } catch (err) {
        console.error("Lỗi khi parse JSON:", err);
        return null;
    }
};

const initialState = {
    user: loadUserFromLocalStorage(),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload; 
            localStorage.setItem('user', JSON.stringify(state.user));
        },
        logout: (state) => {
            state.user = null;
            localStorage.removeItem('user');
        }
    }
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;