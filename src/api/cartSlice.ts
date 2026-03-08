import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CartItem {
  productId: string;
  shopId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

export interface CartState {
  shopId: string | null;
  items: CartItem[];
}

// ─── Initial State ────────────────────────────────────────────────────────────

const initialState: CartState = {
  shopId: null,
  items: [],
};

// ─── Slice ────────────────────────────────────────────────────────────────────

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;

      // Enforce single-shop rule
      if (state.shopId && state.shopId !== item.shopId) {
        console.warn(
          `Cart already has items from shop "${state.shopId}". ` +
          `Cannot add item from shop "${item.shopId}". Clear your cart first.`
        );
        return;
      }

      // Set the shop if this is the first item
      if (!state.shopId) {
        state.shopId = item.shopId;
      }

      const existing = state.items.find((i) => i.productId === item.productId);
      if (existing) {
        existing.quantity += item.quantity;
      } else {
        state.items.push(item);
      }
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find((i) => i.productId === productId);
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter((i) => i.productId !== productId);
          if (state.items.length === 0) state.shopId = null;
        } else {
          item.quantity = quantity;
        }
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i.productId !== action.payload);
      if (state.items.length === 0) {
        state.shopId = null;
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.shopId = null;
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
