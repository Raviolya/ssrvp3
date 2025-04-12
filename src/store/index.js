import { configureStore } from '@reduxjs/toolkit';
import feedbackReducer from '../actions/Requests';
import counterReducer from './counterSlice';

const store = configureStore({
  reducer: {
    feedback: feedbackReducer,
    counter: counterReducer,
  },
  
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(), 
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;