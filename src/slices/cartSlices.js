import { createSlice } from "@reduxjs/toolkit";

// ✅ Load cart from localStorage (if it exists)
const savedCart = JSON.parse(localStorage.getItem("cart")) || {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: savedCart,
  reducers: {
  addToCart: (state, action) => {
  const item = action.payload;
  const existingItem = state.items.find(i => i.id === item.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    state.items.push({ ...item, quantity: 1 });
  }

  state.totalQuantity += 1;
  state.totalAmount += item.price;

      // ✅ Save to localStorage
      localStorage.setItem("cart", JSON.stringify(state));
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      const item = state.items.find((i) => i.id === id);

      if (item) {
        state.totalQuantity -= item.quantity;
        state.totalAmount -= item.price * item.quantity;
        state.items = state.items.filter((i) => i.id !== id);
      }

      // ✅ Save to localStorage
      localStorage.setItem("cart", JSON.stringify(state));
    },

    increaseQuantity: (state, action) => {
      const id = action.payload;
      const item = state.items.find((i) => i.id === id);

      if (item) {
        item.quantity += 1;
        state.totalQuantity += 1;
        state.totalAmount += item.price;
      }

      // ✅ Save to localStorage
      localStorage.setItem("cart", JSON.stringify(state));
    },

    decreaseQuantity: (state, action) => {
      const id = action.payload;
      const item = state.items.find((i) => i.id === id);

      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.totalQuantity -= 1;
        state.totalAmount -= item.price;
      } else if (item && item.quantity === 1) {
        state.items = state.items.filter((i) => i.id !== id);
        state.totalQuantity -= 1;
        state.totalAmount -= item.price;
      }

      // ✅ Save to localStorage
      localStorage.setItem("cart", JSON.stringify(state));
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;

      // ✅ Remove from localStorage on logout or manual clear
      localStorage.removeItem("cart");
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
