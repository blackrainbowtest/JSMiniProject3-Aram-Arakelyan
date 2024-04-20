import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from '../features/Category/CategorySlice'

export const store = configureStore({
  reducer: {
    category: categoryReducer,
  },
});