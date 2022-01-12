import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface AuthState {
    isAuthenticated: boolean
}

// Define the initial state using that type
const initialState: AuthState = {
    isAuthenticated: false,
}

type LoginValues = {
    username: string;
    password: string
};

export const authSlice = createSlice({
    name: 'auth',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        login: (state, action: PayloadAction<LoginValues>) => {
            state.isAuthenticated = true
        }
    }
})

export const { login } = authSlice.actions;
export default authSlice.reducer