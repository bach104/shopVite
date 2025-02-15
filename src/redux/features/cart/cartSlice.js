import { createSlice } from "@reduxjs/toolkit";

const storedCart = JSON.parse(localStorage.getItem("cart"));
const initialState = storedCart && storedCart.products ? storedCart : {
  products: [],
  selectedItems: 0,
  totalPrice: 0,
  tax: 0,
  grandTotal: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, name, price, image, size, color } = action.payload;
      const existingItem = state.products.find((item) => item.id === id && item.size === size && item.color === color);

      if (!existingItem) {
        state.products.push({ id, name, price, image, size, color, quantity: 1 });
        state.selectedItems = state.products.length;
        state.totalPrice = state.products.reduce((sum, item) => sum + item.price * item.quantity, 0);
        state.tax = state.totalPrice * 0.05;
        state.grandTotal = state.totalPrice + state.tax;
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },

    updateQuantity: (state, action) => {
      const { id, type } = action.payload;
      const item = state.products.find((item) => item.id === id);

      if (item) {
        if (type === "increment") {
          item.quantity += 1;
        } else if (type === "decrement" && item.quantity > 1) {
          item.quantity -= 1;
        }
      }

      state.selectedItems = state.products.reduce((sum, item) => sum + item.quantity, 0);
      state.totalPrice = state.products.reduce((sum, item) => sum + item.price * item.quantity, 0);
      state.tax = state.totalPrice * 0.05;
      state.grandTotal = state.totalPrice + state.tax;

      localStorage.setItem("cart", JSON.stringify(state));
    },

    removeFromCart: (state, action) => {
      const { id } = action.payload;
      state.products = state.products.filter((item) => item.id !== id);

      state.selectedItems = state.products.reduce((sum, item) => sum + item.quantity, 0);
      state.totalPrice = state.products.reduce((sum, item) => sum + item.price * item.quantity, 0);
      state.tax = state.totalPrice * 0.05;
      state.grandTotal = state.totalPrice + state.tax;

      localStorage.setItem("cart", JSON.stringify(state));
    },

    clearCart: (state) => {
      state.products = [];
      state.selectedItems = 0;
      state.totalPrice = 0;
      state.tax = 0;
      state.grandTotal = 0;

      localStorage.removeItem("cart");
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
