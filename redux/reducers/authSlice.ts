import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { Followres } from '../../types/Followers'
import { User } from '../../types/User'

export interface AuthState {
  user: User
  userFollowStats: Followres
}

const initialState: AuthState = {
  user: {
    name: '',
    email: '',
    username: '',
    avatar: '',
    newMessagePopUp: false,
    unreadMessage: false,
    unreadNotification: false,
    role: {
      type: '',
    },
  },
  userFollowStats: {
    owner: '',
    followres: [
      {
        user: '',
      },
    ],
    following: [
      {
        user: '',
      },
    ],
  },
}

export const authSlice = createSlice({
  name: 'auth', // the user who is login
  initialState,
  reducers: {
    addMe: (state, action) => {
      console.log(action);
      
      state.user = action.payload
      state.userFollowStats = action.payload
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      state.user = action.payload.auth.user.user
      state.userFollowStats = action.payload.auth.user.userFollowStats
    },
  },
})

export const { addMe } = authSlice.actions
export default authSlice.reducer
