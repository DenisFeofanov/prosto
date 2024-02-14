import { CartItem, OrderedBouquet } from "@/interfaces/Order";
import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface CartState {
  bouquets: CartItem[];
}

const initialState: CartState = {
  bouquets: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: {
      reducer(
        state,
        action: PayloadAction<OrderedBouquet & { cartId: string }>
      ) {
        const { amountOrdered, ...cartItem } = action.payload;
        for (let i = 0; i < action.payload.amountOrdered; i++) {
          state.bouquets.push(cartItem);
        }
      },
      prepare(orderedBouquet: OrderedBouquet) {
        return {
          payload: {
            ...orderedBouquet,
            cartId: nanoid(),
          },
        };
      },
    },
  },
});

export const { addToCart } = cartSlice.actions;
export const selectCart = (state: RootState) => state.cart;
export const selectBouquets = (state: RootState) => state.cart.bouquets;
export default cartSlice.reducer;
