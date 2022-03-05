import { configureStore, ThunkAction } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import { Action } from 'redux'
import authReducer from './reducers/authSlice'
import postsSlice from './reducers/postsSlice'
// import postSlice from './reducers/postSlice'

const makeStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
      posts: postsSlice
    },
    devTools: true,
  })

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>
export const wrapper = createWrapper<AppStore>(makeStore)
