import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from '../features/Category/CategorySlice'
import mainReducer from '../features/Main/MainSlice'

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    main: mainReducer,
  },
});