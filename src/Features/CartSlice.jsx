import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { value: [] },
  reducers: {
    addToCart: (state, action) => {
      if (state.value.length === 0) {
        state.value.push({ ...action.payload, qty: 1 });
      } else if (state.value.length > 0) {
        const existingProduct = state.value.find(
          (item) => item._id === action.payload._id
        );

        console.log("existingProduct", existingProduct);
        if (existingProduct) {
          state.value.map((item) => {
            if (item._id === existingProduct._id) item.qty++;
          });
        } else {
          state.value.push({ ...action.payload, qty: 1 });
        }
      }
    },

    removeFromCart: (state, action) => {
      state.value.map((item) => {
        if (item._id === action.payload._id) {
          if (item.qty === 1) {
            state.value = state.value.filter(
              (Fitem) => Fitem._id !== action.payload._id
            );
          } else if (item.qty > 1) {
            item.qty--;
          }
        }
      });
    },
   
    emptyCart:(state, action) => {  state.value.length = 0}
  },
});

export const { addToCart, removeFromCart,emptyCart } = cartSlice.actions;
export default cartSlice.reducer;
