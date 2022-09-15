import { createSlice } from "@reduxjs/toolkit";




const productsSlice = createSlice({
  name: "products",

  initialState: [],

  reducers: {

    setProducts: (state, action) => {
      // state.push(action.payload)  
      state = action.payload
      console.log('action.payload from product reducer',action.payload)
      console.log('state from product reducer',state)
    },
    clearProducts:(state)=>{
      state=[]
    },



  },

});




export const { setProducts, clearProducts } = productsSlice.actions;
export default productsSlice.reducer;



