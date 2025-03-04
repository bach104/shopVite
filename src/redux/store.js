import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';
import { cartApi } from './features/cart/cartApi';
import authApi from './features/auth/authApi';
import authReducer from './features/auth/authSlice';
import { productApi } from './features/shop/productsApi';
import productsReducer from './features/shop/productsSlice';

export default configureStore({
  reducer: {
    cart: cartReducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    [productApi.reducerPath]: productApi.reducer,
    products: productsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cartApi.middleware, authApi.middleware, productApi.middleware),
});
