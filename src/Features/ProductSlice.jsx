import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: { value: [] },
  reducers: {
    fetchData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { fetchData } = productSlice.actions;

export default productSlice.reducer;
