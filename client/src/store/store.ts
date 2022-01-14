import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import authReducer from './features/AuthSlice'
import messageReducer from './features/MessagesSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        messages: messageReducer
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch// Infer the `RootState` and `AppDispatch` types from the store itself
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
