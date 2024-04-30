import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from '../features/Category/CategorySlice'
import mainReducer from '../features/Main/MainSlice'
import imageReducer from '../features/Image/ImageSlice'

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    main: mainReducer,
    image: imageReducer,
  },
});