import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../types/types';

// Define a type for the slice state
interface AuthState {
    status: 'loading' | 'idle',
    error: string | null
    user: User | undefined
}

// Define the initial state using that type
const initialState: AuthState = {
    status: 'idle',
    error: null,
    user: undefined
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
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.status = 'loading';
            state.error = null
        });

        builder.addCase(login.fulfilled, (state, action) => {
            state.user = action.payload
            state.status = 'idle'
        });

        builder.addCase(login.rejected, (state, action) => {
            if (action.payload) {
                state.error = action.payload.message;
            }
            state.status = 'idle';
        })
    }
})

type LoginError = {
    message: string;
};

export const login = createAsyncThunk<User, LoginValues, { rejectValue: LoginError }>(
    "login",
    async (loginValues, thunkApi) => {
        const response = await fetch('http://localhost:9000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: loginValues.username, password: loginValues.password })
        });
        if (response.status !== 201) {
            return thunkApi.rejectWithValue({
                message: await response.json() as string
            })
        }
        const data = await response.json() as User;
        return data;
    }
);

export default authSlice.reducer
