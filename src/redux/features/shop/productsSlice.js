import { createSlice } from '@reduxjs/toolkit';
import { productApi } from './productsApi';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    topProducts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(productApi.endpoints.getProducts.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(productApi.endpoints.getProducts.matchFulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addMatcher(productApi.endpoints.getProducts.matchRejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Lỗi không xác định'; 
      })
      .addMatcher(productApi.endpoints.getTopFeaturedProducts.matchFulfilled, (state, action) => {
        state.topProducts = action.payload.products;
      });
  },
});

export default productsSlice.reducer;
