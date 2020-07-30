import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { Post, PostResponse, PostState } from './../../types/index';
import { extractValues } from '../../utils';
import { IDBService } from 'initCache';

const initialState: PostState = {
  data: [],
  loading: false,
  error: '',
};

export const postSlice = createSlice({
  name: 'postsDB',
  initialState,
  reducers: {
    fetchPosts(state) {
      state.loading = true;
      state.error = '';
      state.data = [];
    },
    fetchSuccess(state, action: PayloadAction<PostResponse>) {
      const data = action.payload.data;
      state.data = extractValues<Post>(
        ['id', 'created', 'preview', 'url', 'subreddit', 'title', 'downs', 'ups', 'thumbnail'],
        data.children,
      );
      state.loading = false;
    },
    fetchFailure(state, action: PayloadAction<PostResponse>) {
      state.error = action.payload.error.toString();
      state.loading = false;
    },
  },
});

export const { fetchFailure, fetchPosts, fetchSuccess } = postSlice.actions;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const makeFetchPosts = () => async (dispatch: Dispatch) => {
  dispatch(fetchPosts);
  const readItLastFetched = Number(localStorage.getItem('readItLastFetched'));
  const validityPeriod = Number(localStorage.getItem('readItValidtyTime'));
  const idb = await IDBService();
  const posts = await idb.get('posts');
  const time = Date.now();
  const isCacheValid = time <= readItLastFetched + validityPeriod;

  try {
    if (posts) {
      dispatch(fetchSuccess(posts));
    }

    if (readItLastFetched === null || !isCacheValid) {
      localStorage.setItem('readItLastFetched', time.toString());
      const response = await fetch(process.env.REACT_APP_SERVER_URI as string);
      if (response.status === 200) {
        const results = await response.json();
        dispatch(fetchSuccess(results));
        idb.put(results);
      }
    }
  } catch (error) {
    if (error.includes('networkError')) {
      posts && fetchSuccess(posts);
    } else {
      dispatch(fetchFailure(error));
    }
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const selectPosts = (state: RootState) => state.postsDB;

export default postSlice.reducer;
