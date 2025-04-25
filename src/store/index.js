import { configureStore } from '@reduxjs/toolkit';
import { feedbackApi, userApi } from '../actions/Requests'; 
import requsetsReducer from '../actions/Requests';
import counterReducer from './counterSlice';

const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [feedbackApi.reducerPath]: feedbackApi.reducer,
    requests: requsetsReducer,
    counter: counterReducer,
  },
  
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware()
    .concat(feedbackApi.middleware)
    .concat(userApi.middleware),
});

export default store;