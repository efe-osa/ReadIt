import { configureStore, Action, ThunkAction } from '@reduxjs/toolkit';
import postsReducer from './components/Posts/posts.reducer';

export const store = configureStore({
  reducer: {
    postsDB: postsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
