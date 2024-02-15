import { CartItem, OrderedBouquet } from "@/interfaces/Order";
import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface CartState {
  isOpen: boolean;
  bouquets: CartItem[];
}

const initialState: CartState = {
  isOpen: false,
  bouquets: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: {
      reducer(state, action: PayloadAction<CartItem[]>) {
        state.bouquets = [...state.bouquets, ...action.payload];
      },
      prepare(orderedBouquet: OrderedBouquet[]) {
        const bouquetsWithId = orderedBouquet.map(orderedBouquet => {
          return {
            ...orderedBouquet,
            cartId: nanoid(),
          };
        });
        return {
          payload: bouquetsWithId,
        };
      },
    },
    clearCart(state) {
      state.bouquets = [];
    },
    updateCartItem(state, action: PayloadAction<CartItem>) {
      const { cartId, note } = action.payload;
      const index = state.bouquets.findIndex(item => item.cartId === cartId);
      if (index !== -1) {
        state.bouquets[index].note = note;
      }
    },
    toggleCart(state) {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { addToCart, updateCartItem, clearCart, toggleCart } =
  cartSlice.actions;
export const selectCart = (state: RootState) => state.cart;
export const selectBouquets = (state: RootState) => state.cart.bouquets;
export default cartSlice.reducer;
