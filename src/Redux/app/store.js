import { configureStore } from '@reduxjs/toolkit'
import fetch from '../features/fetchAPI/fetchSlice'
export const store = configureStore({
  reducer: {
    fetch_API: fetch
  },
})
 