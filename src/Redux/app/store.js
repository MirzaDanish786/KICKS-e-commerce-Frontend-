import { configureStore } from '@reduxjs/toolkit'
import fetch from '../features/fetchAPI/fetchSlice'
import userReducer from '../features/users/userSlice'
import categoryReducer from '../features/category/categorySlice'
import productReducer from '../features/product/productSlice'

export const store = configureStore({
  reducer: {
    fetch_API: fetch,
    user: userReducer,
    category: categoryReducer,
    product: productReducer,

  },
})
 