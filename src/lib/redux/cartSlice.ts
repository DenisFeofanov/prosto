import { OrderedBouquet } from "@/interfaces/Order";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface CartState {
  bouquets: OrderedBouquet[];
}

const initialState: CartState = {
  bouquets: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<OrderedBouquet>) => {
      state.bouquets.push(action.payload);
    },
    changeAmount: (state, action: PayloadAction<OrderedBouquet>) => {
      const index = state.bouquets.findIndex(
        orderedBouquet => orderedBouquet.id === action.payload.id
      );

      if (index === -1) {
        console.warn("changeAmount: Bouquet not found in cart");
        return;
      }

      state.bouquets[index].amountOrdered = action.payload.amountOrdered;
    },
  },
});

export const { addToCart, changeAmount } = cartSlice.actions;
export const selectCart = (state: RootState) => state.cart;
export const selectBouquets = (state: RootState) => state.cart.bouquets;
export default cartSlice.reducer;
