import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../api";


export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await instance.get('/posts');

  return data;
})

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
  const { data } = await instance.get('/tags');

  return data;
})

export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id) => {
  const { data } = await instance.delete('/posts/' + id);

  return data;
})

const initialState = {
  posts: {
    items: [],
    status: 'loading',
  },
  tags: {
    items: [],
    status: 'loading',
  }
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPosts.pending]: (state, action) => {
      state.posts.items = [];
      state.posts.status = 'loading';
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = 'loaded';
    },
    [fetchPosts.rejected]: (state, action) => {
      state.posts.items = [];
      state.posts.status = 'error';
    },
    [fetchTags.pending]: (state, action) => {
      state.tags.items = [];
      state.tags.status = 'loading';
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = 'loaded';
    },
    [fetchTags.rejected]: (state, action) => {
      state.tags.items = [];
      state.tags.status = 'error';
    },
    [fetchRemovePost.pending]: (state, action) => {
      console.log('action', action)
      console.log('state.posts.items', state.posts.items)
      state.posts.items = state.posts.items.filter((obj) => action.meta.arg !== obj._id);
    }
  }
});

export const postsReducer = postsSlice.reducer;