import { createSlice } from "@reduxjs/toolkit";

const getInitialCart = () => {
    if (typeof window !== "undefined") {
        return JSON.parse(localStorage.getItem("cart") || "[]");
    }
    return [];
};

const initialState = {
    cart: getInitialCart(),
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.cart.push({ ...action.payload, qty: 1 });
            if (typeof window !== "undefined") {
                localStorage.setItem("cart", JSON.stringify(state.cart));
            }
        },
        increase: (state, action) => {
            state.cart = state.cart.map((el) =>
                el.id === action.payload ? { ...el, qty: el.qty + 1 } : el
            );
            if (typeof window !== "undefined") {
                localStorage.setItem("cart", JSON.stringify(state.cart));
            }
        },
        decrease: (state, action) => {
            const item = state.cart.find((el) => el.id === action.payload);
            if (item.qty > 1) {
                state.cart = state.cart.map((el) =>
                    el.id === action.payload ? { ...el, qty: el.qty - 1 } : el
                );
            } else {
                state.cart = state.cart.filter((el) => el.id !== action.payload);
            }
            if (typeof window !== "undefined") {
                localStorage.setItem("cart", JSON.stringify(state.cart));
            }
        },
        deleteProduct: (state, action) => {
            state.cart = state.cart.filter((el) => el.id !== action.payload);
            if (typeof window !== "undefined") {
                localStorage.setItem("cart", JSON.stringify(state.cart));
            }
        },
    },
});

export const { addToCart, increase, decrease, deleteProduct } = cartSlice.actions;
export default cartSlice.reducer;
