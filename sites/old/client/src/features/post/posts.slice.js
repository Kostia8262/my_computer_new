import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get('/api/posts');
    return response.data;
});

export const addPost = createAsyncThunk('posts/addPost', async (newPost) => {
    const response = await axios.post('/api/posts', newPost);
    return response.data;
});

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        // Add reducers here if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addPost.fulfilled, (state, action) => {
                state.items.push(action.payload);
            });
    },
});

export default postsSlice.reducer;