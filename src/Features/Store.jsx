import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./ProductSlice";
import cartReducer from "./CartSlice";
import UserReducer from "./UserSlice";

export const store = configureStore({
  reducer: {
    productStore: productReducer,
    cartStore: cartReducer,
    userStore: UserReducer,
  },
});
