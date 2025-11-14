import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItem: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      // payload = newItem
      state.cartItem.push(action.payload);
    },
    removeItem(state, action) {
      // payload = itemId
      state.cartItem = state.cartItem.filter(
        (item) => item.pizzaId !== action.payload
      );
    },
    increaseItemQuantity(state, action) {
      // payload = itemId
      const item = state.cartItem.find(
        (item) => item.pizzaId === action.payload
      );

      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      const item = state.cartItem.find(
        (item) => item.pizzaId === action.payload
      );
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;

      if (item.quantity === 0) cartSlice.caseReducers.removeItem(state, action);
    },
    clearCart(state) {
      state.cartItem = [];
    },
  },
});
export const {
  addItem,
  removeItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCartItems = (state) => state.cart.cartItem;

export const getCartTotalQuantity = (state) =>
  state.cart.cartItem.reduce((acc, cur) => acc + cur.quantity, 0);

export const getCartTotalPrice = (state) =>
  state.cart.cartItem.reduce((acc, cur) => acc + cur.totalPrice, 0);

export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cartItem.find((item) => item.pizzaId === id)?.quantity ?? 0;
