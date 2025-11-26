import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [
    // {
    //   productId:"123",
    //   name:'t-shirt',
    //   price:200,
    //   quantity:0,
    //   image:'http//....'
    // }
  ],
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    }
  },
});

export const {
  setProducts,
} = productSlice.actions;
export default productSlice.reducer;