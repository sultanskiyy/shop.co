import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../app/cartSlice";

export const cartStore = configureStore({
    reducer: cartReducer
})