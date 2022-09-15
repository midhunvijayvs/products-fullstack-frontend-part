import { createSlice } from "@reduxjs/toolkit";




const productsSlice = createSlice({
  name: "products",

  initialState: {},

  reducers: {

    setProductsGlobal: (state, action) => state = action.payload,

    clearProducts: (state) => {
      state = {}
    },



  },

});




export const { setProductsGlobal, clearProducts } = productsSlice.actions;
export default productsSlice.reducer;



