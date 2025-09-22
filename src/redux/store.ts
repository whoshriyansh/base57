import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/user/AuthSlice';
import taskReducer from './slice/task/TaskSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    task: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
