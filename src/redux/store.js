import { configureStore } from "@reduxjs/toolkit";

import productsReducer from './productsSlice';


const store = configureStore({
  products: productsReducer,
});

export default store;