// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./modal/modal.slice";
import cartSlice from "./cart/cartSlice";

const store = configureStore({
    reducer: {
        modalSlice,
        cartSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
