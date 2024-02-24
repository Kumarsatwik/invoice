import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AuthSlice } from "./auth/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import { ProductSlice } from "./products/productSlice";

export const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    products: ProductSlice.reducer,
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
export type RootState = ReturnType<typeof store.getState>;
