import { createSlice } from '@reduxjs/toolkit';

const loadUserFromLocalStorage = () => {
  try {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return {
      user: user ? JSON.parse(user) : null,
      token: token || null,
    };
  } catch (err) {
    console.error('Error deserializing user from localStorage:', err);
    return { user: null, token: null };
  }
};

const initialState = loadUserFromLocalStorage();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      if (action.payload.token) {
        state.token = action.payload.token; 
        localStorage.setItem('token', action.payload.token);
      }
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;