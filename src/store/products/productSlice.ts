// productSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  name: string;
  quantity: number;
  rate: number;
  total: number;
}

interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: [],
};

export const ProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<Product>) {
      state.products.push(action.payload);
    },
  },
});

export const { addProduct } = ProductSlice.actions;
export default ProductSlice.reducer;
