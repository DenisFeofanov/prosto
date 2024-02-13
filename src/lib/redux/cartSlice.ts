import { OrderedBouquet } from "@/interfaces/Order";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface CartState {
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
  },
});

export const { addToCart } = cartSlice.actions;
export const selectCart = (state: RootState) => state.cart;
export default cartSlice.reducer;
