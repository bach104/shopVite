import { createSlice } from '@reduxjs/toolkit';

const loadUserFromLocalStorage = () => {
  try {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return {
      user: user ? JSON.parse(user) : null,
      token: token || null,
      error: null, // Thêm trạng thái lỗi
    };
  } catch (err) {
    console.error('Error deserializing user from localStorage:', err);
    return { user: null, token: null, error: null };
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
      state.error = null;
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null; 
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
    updateUserInfo: (state, action) => {
      if (action.payload.user) {
        state.user = action.payload.user;
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      }
      if (action.payload.token) {
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      }
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload; 
    },
    clearError: (state) => {
      state.error = null; 
    },
  },
});

export const { setUser, logout, updateUserInfo, setError, clearError } = authSlice.actions;
export default authSlice.reducer;