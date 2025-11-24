import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from '../features/authSlice';
import productReducer from '../features/productSlice'
import cartReducer from '../features/cartSlice'
import checkoutReducer from '../features/checkoutSlice'

export const store = configureStore({
    reducer:{
        auth:authSliceReducer,
        products:productReducer,
        cart:cartReducer,
        checkout:checkoutReducer
    }
})