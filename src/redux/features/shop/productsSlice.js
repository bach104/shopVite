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
        state.products = action.payload.products;
      })
      .addMatcher(productApi.endpoints.getProducts.matchRejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Lỗi không xác định';
      })
      .addMatcher(productApi.endpoints.getTopFeaturedProducts.matchFulfilled, (state, action) => {
        state.topProducts = action.payload.products;
      })
      .addMatcher(productApi.endpoints.addProduct.matchFulfilled, (state, action) => {
        state.products.push(action.payload.product);
      })
      .addMatcher(productApi.endpoints.editProduct.matchFulfilled, (state, action) => {
        const updatedProduct = action.payload.updatedProduct;
        const index = state.products.findIndex(product => product._id === updatedProduct._id);
        if (index !== -1) {
          state.products[index] = updatedProduct;
        }
      });
  },
});

export default productsSlice.reducer;