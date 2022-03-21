import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { Post, IPost } from '../../types/Post'

export interface PostState {
  post: Post
}

const initialState: IPost = {
  post: {} as Post,
}

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        fetchPost: (state, action) => {
            console.log(action);
            state.post = action.payload
        }
    }
});

export const { fetchPost } = postSlice.actions
export default postSlice.reducer
