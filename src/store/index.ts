// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./modal/modal.slice";

const store = configureStore({
    reducer: {
        modalSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
