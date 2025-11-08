import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlices'; // ✅ correct for your structure

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
