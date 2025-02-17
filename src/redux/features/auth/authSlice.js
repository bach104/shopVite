import { createSlice } from '@reduxjs/toolkit';

const loadUserFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('user');
    if (!serializedState) return { user: null };
    return { user: JSON.parse(serializedState) };
  } catch (err) {
    console.error('Error deserializing user from localStorage:', err);
    return { user: null };
  }
};

const initialState = loadUserFromLocalStorage();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },
    updateUserInfo: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    },
  },
});

export const { setUser, logout, updateUserInfo } = authSlice.actions;
export default authSlice.reducer;
