import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { Post, IPosts } from '../../types/Post'

export interface PostsState {
  posts: Post[]
}

const initialState: IPosts = {
  posts: [],
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    fetchPosts: (state, action) => {
      state.posts = action.payload
    },
    deleteOnePost: (state, action) => {
      
      state.posts = state.posts.filter(post => post._id !== action.payload._id);
    },
    likeOnePost: (state, action) => {
      state.posts.map(post => {
        if (post._id === action.payload.postId) {
          post.likes.push({user: action.payload.user})
        }
      })
    },
    unLikeOnePost: (state, action) => {
      state.posts.map(post => {
        if (post._id === action.payload.postId) {
          const index = post.likes.findIndex(like => like.user._id === action.payload.userId);
          post.likes.splice(index, 1);
        }
      })
    },
    showComments: (state, action) => {
      console.log(action);
      
      state.posts.map(post => {
        if (post._id === action.payload.postId) {
          post.comments.unshift({content: action.payload.content, owner: action.payload.user, _id: action.payload.id, date: action.payload.date});
        }
      })
    },
    deleteComment: (state, action) => {
      state.posts.map(post => {
        if (post._id === action.payload.postId) {
          const index = post.comments.findIndex(comment => comment._id === action.payload.commentId);
          post.comments.splice(index, 1);
        }
      })
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      state.posts = action.payload.posts.posts
    },
  },
})

export const { fetchPosts, deleteOnePost, likeOnePost, unLikeOnePost, showComments, deleteComment } = postsSlice.actions
export default postsSlice.reducer
